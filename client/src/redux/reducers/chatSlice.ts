import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Chat, Message } from '@/interfaces';
import * as api from '../api'


interface ChatState {
    currentChat: Chat | null;
    chats: Chat[];
    allChats: Chat[];
    isLoading: boolean;
    error: { message: string; code: string } | null;
}

export const getChats = createAsyncThunk<Chat[]>('getChats', async () => {
    const { data } = await api.getChats()
    return data as Chat[]
})
export const getMessages = createAsyncThunk<Chat, string>('getMessages', async (chatId) => {
    const { data } = await api.getMessages(chatId)
    return data
})
export const getUnreadMessageCount = createAsyncThunk<Chat, string>('getUnreadMessageCount', async (chatId) => {
    const { data } = await api.getUnreadMessageCount(chatId)
    return data
})
export const getChat = createAsyncThunk<Chat, string>('getChat', async (chatId) => {
    const { data } = await api.getChat(chatId)
    return data
})
export const createChat = createAsyncThunk<Chat, Chat>('createChat', async (chat) => {
    const { data } = await api.createChat(chat)
    return data
})
export const updateChat = createAsyncThunk<Chat, { chatId: string, chat: Chat }>('updateChat', async ({ chatId, chat }) => {
    const { data } = await api.updateChat(chatId, chat)
    return data
})
export const sendMessage = createAsyncThunk<Chat, { chatId: string, message: Message }>('sendMessage', async ({ chatId, message }) => {
    const { data } = await api.sendMessage(chatId, message)
    return data
})
export const markMessageAsRead = createAsyncThunk<Chat, { chatId: string, messageId: string }>('markMessageAsRead', async ({ chatId, messageId }) => {
    const { data } = await api.markMessageAsRead(chatId, messageId)
    return data
})
export const markAllMessagesAsRead = createAsyncThunk<Chat, string>('markAllMessagesAsRead', async (chatId) => {
    const { data } = await api.markAllMessagesAsRead(chatId)
    return data
})


const initialState: ChatState = { currentChat: null, chats: [], allChats: [], isLoading: false, error: null, };

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        resetState: () => initialState,
        setChatSlice: (state, action) => { state.currentChat = action.payload },
        setChatsSlice: (state, action) => { state.chats = action.payload },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChats.fulfilled, (state, action) => {
                state.chats = action.payload
                state.currentChat = action.payload.find(chat => String(chat._id) == String(localStorage.getItem('lastChat'))) || null
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.currentChat = action.payload
            })
            .addCase(getUnreadMessageCount.fulfilled, (state, action) => {
                state.currentChat = action.payload
            })
            .addCase(getChat.fulfilled, (state, action) => {
                state.currentChat = action.payload
            })
            .addCase(createChat.fulfilled, (state, action) => {
                state.currentChat = action.payload
            })
            .addCase(updateChat.fulfilled, (state, action) => {
                state.currentChat = action.payload
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.currentChat = action.payload
            })
            .addCase(markMessageAsRead.fulfilled, (state, action) => {
                state.currentChat = action.payload
            })
            .addCase(markAllMessagesAsRead.fulfilled, (state, action) => {
                state.currentChat = action.payload
            })

    },
});

export default chatSlice.reducer;
export const selectChat = (state: RootState) => state.auth;
export const { resetState: resetChatState, setChatSlice, setChatsSlice } = chatSlice.actions;
