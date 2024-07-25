import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { RootState } from '@/redux/store';
import { useStateContext } from '@/contexts/ContextProvider';
import { formatChatMessageTimestamp, getOtherUserDetail } from '@/utils/functions/function';
import { Chat, ChatMessage, User } from '@/interfaces';
import { fetchMessages, sendMessage, setChatsSlice, setCurrentChatMessagesSlice, setCurrentChatSlice } from '@/redux/reducers/chatSlice';

export const ChatBox = () => {
  ///////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const { pathname } = useLocation()
  const scrollRef = useRef(null);
  const { selectedChat, setSelectedChat, } = useStateContext();
  const { users, loggedUser } = useSelector((state: RootState) => state.user);
  const { chats, currentChatMessages } = useSelector((state: RootState) => state.chat);
  const currentUserId = loggedUser?._id!
  const lastChatId = localStorage.getItem('lastChat') ? String(localStorage.getItem('lastChat')) : null;

  ///////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////
  const [loadingMessages, setLoadingMessages] = useState(false)
  const [inputMessage, setInputMessage] = useState('')

  ///////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////
  useEffect(() => {
    setTimeout(() => { scrollToBottom(); }, 100);
  }, [selectedChat]);
  useEffect(() => {
    if ((lastChatId && !selectedChat) || !selectedChat?.otherUser) {
      const finded = chats?.find((c: Chat) => c?.id == lastChatId);
      if (!finded) return;
      const otherUser: User = finded?.participants?.find(p => p?._id != currentUserId) as User
      setSelectedChat({ ...finded, otherUser });
      dispatch(setCurrentChatSlice({ ...finded, otherUser }))
    }
  }, [lastChatId, selectedChat, chats, users, currentUserId]);

  useEffect(() => {
    if (selectedChat) {
      setLoadingMessages(true)
      dispatch<any>(fetchMessages({ chatId: selectedChat?.id! })).then(() => setLoadingMessages(false))
    }
    else if (lastChatId) {
      setLoadingMessages(true)
      dispatch<any>(fetchMessages({ chatId: lastChatId })).then(() => setLoadingMessages(false))
    }
  }, [selectedChat, dispatch, pathname]);
  useEffect(() => {
    scrollToBottom();
  }, [currentChatMessages]);

  ///////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////
  const onSendMessage = () => {

    if (inputMessage.trim() == '') return;

    const newMessage: ChatMessage = {
      senderId: currentUserId,
      text: inputMessage,
      readBy: [currentUserId],
      receiverId: selectedChat?.otherUser?._id!,
      receiverInfo: { username: selectedChat?.otherUser?.username!, photoUrl: selectedChat?.otherUser?.profilePicture! },
      senderInfo: { username: loggedUser?.firstName!, photoUrl: loggedUser?.profilePicture! },
      updatedAt: new Date(),
      createdAt: new Date()
    };

    dispatch(setCurrentChatMessagesSlice({ messages: [...currentChatMessages, newMessage], chatId: selectedChat?.id }));

    // Update last message of chat
    dispatch(setChatsSlice(chats.map((c) => (c = c.id == selectedChat?.id ? { ...c, lastMessage: inputMessage, lastMessageTimestamp: new Date() } : c))));

    // Create message in db
    dispatch<any>(sendMessage({ chatId: selectedChat?.id!, messageData: newMessage }))
      .then(({ payload }: { payload: any }) => {
        dispatch<any>(fetchMessages({ chatId: selectedChat?.id! }));
      });

    setInputMessage('');
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      setTimeout(() => {
        // @ts-ignore
        scrollContainer.scroll({ top: scrollContainer.scrollHeight - scrollContainer.clientHeight, behavior: 'smooth', });
      }, 20);
    }
  };

  const onKeyUp = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent the default Enter key behavior (form submission or new line)
      onSendMessage(); // Call the sendMessageHandler when Enter is pressed
    }
  };


  ///////////////////////////////////////////////////// COMPONENTS ////////////////////////////////////////////////////
  const MessageComponent = ({ message }: { message: ChatMessage }) => {
    const msg = message?.text
    const time = formatChatMessageTimestamp(message?.createdAt?.seconds ? message?.createdAt?.toDate() : new Date(message?.createdAt))
    const isMe = message?.senderId == currentUserId
    const selectedUser = users.find((u) => u?._id == message?.senderId) || selectedChat?.otherUser
    const name = selectedUser?.firstName?.length == 0 && selectedUser?.lastName?.length == 0 ? `@${selectedUser?.username}` : `${selectedUser?.firstName} ${selectedUser?.lastName}`
    return (
      <div className={`w-fit ${isMe ? 'ml-auto max-w-125' : 'max-w-125'}`}>
        <div
          className={`mb-2.5 rounded-2xl px-5 py-1.5 dark:bg-boxdark-2 ${isMe
            ? 'rounded-br-none bg-teal-blue text-white'
            : 'rounded-tl-none bg-warm-gray text-black '
            } `}
        >
          <p>{msg}</p>
          <p className={`text-[10px] mt-1 ${isMe ? 'text-end text-white' : 'text-start text-black'}`}>{time}</p>
        </div>
      </div>
    );
  };
  MessageComponent.Skeleton = () => {
    return (
      <div className={'w-125'}>
        <div className={`mb-2.5 h-[48px] rounded-2xl px-5 py-3 dark:bg-boxdark-2 rounded-tl-none bg-whiten`} />
      </div >
    );
  };

  if (!currentChatMessages) {
    return <div>Loading messages...</div>;
  }

  return (
    <>

      {!selectedChat?.id ? (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-3xl font-semibold ">Select a conversation</p>
        </div>
      ) : chats.length == 0 ? (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-3xl font-semibold ">No current conversation</p>
        </div>
      ) : (
        <div className="flex h-full flex-col border-l border-stroke w-full ">

          {/* <!-- ====== Chat Box Start --> */}
          <div className="sticky bg-gray-100 flex items-center justify-between gap-2 border-b border-stroke px-4 py-2 ">
            <div className="flex items-center gap-1">
              <div className="h-13 w-13 overflow-hidden rounded-full cursor-pointer">
                {(selectedChat?.otherUser?.profilePicture) ? (
                  <img
                    src={selectedChat?.otherUser?.profilePicture}
                    alt="avatar"
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black capitalize text-white ">
                    {selectedChat?.otherUser?.username?.charAt(0)}
                  </span>
                )}
              </div>
              <div>
                <h5 className="w-max font-medium text-black dark:text-white ">
                  <span className='cursor-pointer capitalize '>
                    {selectedChat?.otherUser?.firstName?.length == 0 && selectedChat?.otherUser?.lastName?.length == 0 && `@${selectedChat?.otherUser?.username}`} {selectedChat?.otherUser?.firstName} {selectedChat?.otherUser?.lastName}
                  </span>
                </h5>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="n-scrollbar h-full max-h-full space-y-3.5 overflow-y-auto px-3 py-2 "   >
            {
              loadingMessages
                ?
                Array(5).fill('')?.map((_, index) => (
                  <MessageComponent.Skeleton key={index} />
                ))
                :
                currentChatMessages?.map((msg, index) => (
                  <MessageComponent key={index} message={msg} />
                ))
            }
          </div>

          <div className="sticky flex bottom-0 border-t bg-gray-100 border-stroke px-3 py-2 dark:bg-boxdark">
            <div className="relative w-full h-12 ">
              <input
                type="text"
                placeholder={'Type your message'}
                className="w-full h-full px-2 bg-white rounded-md border border-stroke bg-gray text-black placeholder-body outline-none focus:border-teal-blue dark:bg-boxdark-2 dark:text-white"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value as string)}
                onKeyUp={onKeyUp}
              />
              <button
                type="button"
                title="Send Message"
                onClick={(e) => { onSendMessage(); }}
                className="absolute right-1 top-1/2 h-10 transform -translate-y-1/2 px-2 flex w-fit items-center justify-center rounded-md bg-teal-blue text-white hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-teal-blue/75"
              >
                <Send />
              </button>
            </div>
          </div>

          {/* <!-- ====== Chat Box End --> */}
        </div>
      )}

    </>
  );
};