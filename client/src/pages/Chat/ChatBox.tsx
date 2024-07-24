import React, { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { RootState } from '@/redux/store';
import { useStateContext } from '@/contexts/ContextProvider';
import { formatChatTimestamp, getOtherUserDetail } from '@/utils/functions/function';
import { Chat, ChatMessage, User } from '@/interfaces';
import { fetchMessages, sendMessage, setChatsSlice, setCurrentChatMessagesSlice, setCurrentChatSlice } from '@/redux/reducers/chatSlice';

export const ChatBox = () => {
  ///////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const { pathname } = useLocation()
  const scrollRef = useRef(null);
  const { selectedChat, setSelectedChat, } = useStateContext();
  const { users } = useSelector((state: RootState) => state.user);
  const { chats, currentChatMessages } = useSelector((state: RootState) => state.chat);
  const currentUserId = String(localStorage.getItem('userId'));
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
      const otherUser: User = getOtherUserDetail(finded?.participantIds, users, currentUserId) as User
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

    const newMessage = { senderId: currentUserId, text: inputMessage, timestamp: new Date(), readBy: [currentUserId] };

    dispatch(setCurrentChatMessagesSlice({ messages: [...currentChatMessages, newMessage], chatId: selectedChat?.id }));

    // Update last message of chat
    dispatch(setChatsSlice(chats.map((c) => (c = c.id == selectedChat?.id ? { ...c, lastMessage: inputMessage, lastMessageTimestamp: new Date() } : c))));

    // Create message in db
    dispatch<any>(sendMessage({ chatId: selectedChat?.id!, messageData: newMessage }))
      .then(({ payload }: { payload: any }) => {
        dispatch<any>(fetchMessages({ chatId: selectedChat?.id! }));
      });

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
    const time = formatChatTimestamp(message?.timestamp)
    const isMe = message?.senderId == currentUserId
    const name = users.find((u) => u?._id == message?.senderId)?.username || selectedChat?.otherUser?.username;

    return (
      <div className={isMe ? 'ml-auto max-w-125' : 'max-w-125'}>
        {!isMe && <p className="mb-2.5 text-sm font-medium">{name}</p>}
        <div
          className={`mb-2.5 rounded-2xl px-5 py-3 dark:bg-boxdark-2 ${isMe
            ? 'rounded-br-none bg-primary text-white'
            : 'rounded-tl-none bg-whiten'
            } `}
        >
          <p>{msg}</p>
        </div>
        <p className={`text-xs ${isMe ? 'text-end' : 'text-start'}`}>{time}</p>
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
        <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark xl:w-3/4 ">
          {/* <!-- ====== Chat Box Start --> */}
          <div className="sticky flex items-center justify-between border-b border-stroke px-6 py-4.5 dark:border-strokedark">
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
                  <span className='cursor-pointer'>{selectedChat?.otherUser?.username}</span>
                </h5>
              </div>
            </div>
          </div>
          <div ref={scrollRef} className="n-scrollbar h-full max-h-full space-y-3.5 overflow-y-auto px-6 py-7.5 "   >
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
          <div className="sticky bottom-0 border-t border-stroke bg-white px-6 py-5 dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center justify-between space-x-4.5">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={'Type your message'}
                  className="h-13 w-full rounded-md border border-stroke bg-gray pl-5 pr-19 text-black placeholder-body outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2 dark:text-white"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value as string)}
                  onKeyUp={onKeyUp}
                />
              </div>
              <button
                type="button"
                title="Send Message"
                onClick={(e) => { onSendMessage(); }}
                className="flex h-13 w-full max-w-13 items-center justify-center rounded-md bg-primary text-white hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-primary/75"
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