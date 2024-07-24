import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, doc, getDocs, addDoc, setDoc, getDoc, query, where, updateDoc, arrayUnion, orderBy, writeBatch, onSnapshot, } from 'firebase/firestore';
import { Chat, ChatMessage } from '../../interfaces';
import { chatCollection, db } from '@/configs/firebase';
import { removeUndefinedFields } from '@/utils/functions/function';

interface ChatState {
    chats: Chat[];
    currentChat: Chat | null;
    currentChatMessages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ChatState = {
    chats: [],
    currentChat: null,
    currentChatMessages: [],
    isLoading: false,
    error: null,
};


// Utility function to format chat data
const setChatDoc = (chatRef: any): Chat | undefined => {
    if (chatRef.exists()) {
        const chatData: Chat = { ...chatRef.data(), id: chatRef.id };
        return chatData;
    }
    return undefined;
};


// Fetch all chats for a user
export const fetchChats = createAsyncThunk('chats/fetchChats', async (userId: string, { dispatch }) => {
    try {
        if (!userId) return [];

        const q = query(chatCollection, where('participants', 'array-contains', userId), orderBy('lastMessageTimestamp', 'desc'));

        // Order by lastMessageTimestamp in descending order
        const unsubscribe = onSnapshot(q, async (snapshot) => {
            const chats = snapshot.docs.map((doc) => setChatDoc(doc));
            let filteredChats = chats.filter((chat) => chat !== undefined) as Chat[];
            dispatch(setChatsSlice(filteredChats));
        });

        // Unsubscribe from the snapshot listener when no longer needed
        return () => unsubscribe();

    } catch (error) {
        console.error('chat get error ', error);
        throw error;
    }
}
);

// Fetch messages for a specific chat
export const fetchMessages = createAsyncThunk('chats/fetchMessages',
    async ({ chatId }: { chatId: string }, { dispatch }) => {
        try {

            const messagesRef = collection(db, 'chats', chatId, 'messages');
            const q = query(messagesRef, orderBy('timestamp'));

            var messages;
            onSnapshot(q, (snapshot) => {
                messages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), }));
                dispatch(setCurrentChatMessagesSlice({ chatId, messages }));
            });
        } catch (error) {
            console.error('fetch chat messages error', error);
            throw error;
        }
    }
);

export const getUnreadMessageCount = createAsyncThunk(
    'chats/getUnreadMessageCount',
    async ({ chatId, userId }: { chatId: string; userId: string }) => {
        try {
            const messagesRef = collection(db, 'chats', chatId, 'messages');

            // Query to fetch all messages
            const allMessagesQuery = query(messagesRef);

            // Query to fetch messages read by the user
            const readMessagesQuery = query(messagesRef, where('readBy', 'array-contains', userId.trim()));

            // Execute both queries
            const allMessagesSnapshot = await getDocs(allMessagesQuery);
            const readMessagesSnapshot = await getDocs(readMessagesQuery);

            // Calculate unread messages count
            const totalMessagesCount = allMessagesSnapshot.docs.length;
            const readMessagesCount = readMessagesSnapshot.docs.length;
            const unreadMessagesCount = totalMessagesCount - readMessagesCount;

            return unreadMessagesCount;
        } catch (error) {
            console.error('Error in count', error);
            throw error;
        }
    }
);

// Fetch a specific chat by ID
export const fetchChat = createAsyncThunk(
    'chats/fetchChat',
    async (chatId: string) => {
        const chatDoc = await getDoc(doc(db, 'chats', chatId));
        return setChatDoc(chatDoc);
    }
);

// Create or update a chat
export const setChat = createAsyncThunk('chats/setChat', async (chatData: Chat) => {
    try {
        chatData.id = chatData?.id || doc(chatCollection).id;

        chatData = removeUndefinedFields(chatData)

        const chatRef = doc(chatCollection, chatData?.id);
        await setDoc(chatRef, chatData, { merge: true });
        // return { id: chatRef.id };
        return chatData;
    } catch (error) {
        console.error(error)
    }
}
);

// Add a message to a chat
export const sendMessage = createAsyncThunk('chats/sendMessage', async ({ chatId, messageData }: { chatId: string; messageData: any },
) => {
    try {
        const messagesRef = collection(db, 'chats', chatId, 'messages');
        const messageRef = await addDoc(messagesRef, { ...messageData, chatId });

        if (messageRef.id) {
            // Update the chats collection with the last message info
            const chatRef = doc(db, 'chats', chatId);
            await updateDoc(chatRef, {
                lastMessage: messageData?.text, // Assuming messageData contains a 'text' field
                lastMessageTimestamp: new Date(), // Update with the timestamp of the message
            });
        }

        return { ...messageData, chatId, id: messageRef.id, timestamp: messageData?.timestamp, };
    } catch (error) {
        console.error('send message erro ', error);
    }
}
);

// Mark a single message as read
export const markMessageAsRead = createAsyncThunk('chats/markMessageAsRead',
    async ({ chatId, messageId, userId, }: { chatId: string; messageId: string; userId: string },) => {
        try {
            const messageRef = doc(db, 'chats', chatId, 'messages', messageId);
            await updateDoc(messageRef, {
                readBy: arrayUnion(userId),
            });
            return { messageId, userId };
        } catch (error) {
        }
    }
);

// Mark all messages in a single chat as read
export const markAllMessagesAsRead = createAsyncThunk('chats/markAllMessagesAsRead', async ({ chatId, userId }: { chatId: string; userId: string },) => {
    try {
        const messagesRef = collection(db, 'chats', chatId, 'messages');
        const q = query(messagesRef, where('readBy', 'not-in', [userId]));
        const querySnapshot = await getDocs(q);

        // Begin a batch write
        const batch = writeBatch(db);

        querySnapshot.forEach((doc) => {
            const messageDocRef = doc.ref;
            batch.update(messageDocRef, {
                readBy: arrayUnion(userId),
            });
        });

        // Commit the batch
        await batch.commit();

        return { chatId, userId };
    } catch (error) {
    }
}
);

const sortChats = (chats: Chat[]) => {
    return chats.sort((a, b) => {
        const aTimestamp = a?.lastMessageTimestamp?.seconds
            ? a?.lastMessageTimestamp?.toDate()
            : new Date(a?.lastMessageTimestamp);
        const bTimestamp = b?.lastMessageTimestamp?.seconds
            ? b?.lastMessageTimestamp?.toDate()
            : new Date(b?.lastMessageTimestamp);
        return bTimestamp.getTime() - aTimestamp.getTime();
    })
        .filter((c) => c !== undefined);
}


const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        resetState: () => initialState,
        setCurrentChatMessagesSlice: (state, action) => {
            if (state.currentChat?.id == action.payload?.chatId)
                state.currentChatMessages = action.payload.messages
        },
        setCurrentChatSlice: (state, action) => {
            state.currentChat = action.payload
        },
        setChatsSlice: (state, action: { payload: Chat[] }) => {
            state.chats = action.payload?.sort((a, b) => {
                const aTimestamp = a?.lastMessageTimestamp?.seconds
                    ? a?.lastMessageTimestamp?.toDate()
                    : new Date(a?.lastMessageTimestamp);
                const bTimestamp = b?.lastMessageTimestamp?.seconds
                    ? b?.lastMessageTimestamp?.toDate()
                    : new Date(b?.lastMessageTimestamp);
                return bTimestamp?.getTime() - aTimestamp?.getTime();
            })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chats = sortChats(action.payload as Chat[])
            })
            .addCase(setChat.fulfilled, (state, action) => {
                state.isLoading = false;
                const isChatAlreadyExists = state.chats.some((chat) => chat?.id === action.payload?.id);
                if (!isChatAlreadyExists)
                    state.chats = sortChats([action.payload as Chat, ...state.chats])
            })
            .addCase(fetchMessages.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(chatActions.resetState, (state) => {
                state.chats = []
                state.currentChatMessages = []
                state.isLoading = false
                state.error = null
            });
    },
});

export default chatsSlice.reducer;
export const { setCurrentChatSlice, setChatsSlice, setCurrentChatMessagesSlice } =
    chatsSlice.actions;
export const { actions: chatActions } = chatsSlice;