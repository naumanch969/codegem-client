/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Send } from 'lucide-react';
import { RootState } from '@/redux/store';
import { sendMessage, setChatSlice } from '@/redux/reducers/chatSlice';
import { Chat, Message, User } from '@/interfaces';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getRelativeTime } from '@/utils/functions/function';
import { SOCKET_URL } from '@/constant';
import { io } from 'socket.io-client';

export const ChatBox = ({ chats }: { chats: Chat[], setChats: any }) => {

  ///////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const { currentChat } = useSelector((state: RootState) => state.chat);
  const { loggedUser } = useSelector((state: RootState) => state.user);
  const lastChatId = localStorage.getItem('lastChat') ? String(localStorage.getItem('lastChat')) : null;
  const otherUser = currentChat?.participants?.filter(p => String((p as User)?._id) != String(loggedUser?._id))[0] as User

  ///////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////
  const [messageInput, setMessageInput] = useState('');

  ///////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////
  useEffect(() => {
    setTimeout(() => { scrollToBottom(); }, 100);
  }, [currentChat]);
  useEffect(() => {
    if (currentChat) {
      // Socket: Fetch messages chatId: currentChat._id
    } else if (lastChatId) {
      // Socket: Fetch messages chatId: currentChat._id
    }
  }, [currentChat, dispatch]);
  useEffect(() => {
    scrollToBottom();
  }, [currentChat]);

  ///////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////
  const onSendMessage = () => {
    if (messageInput.trim() == '') return;

    const sender = loggedUser as User
    const receiver = otherUser as User

    const newMessage: Message = {
      sender: String(sender?._id),
      receiver: String(receiver._id),
      text: messageInput,
      timestamp: new Date(),
      readBy: [String(loggedUser?._id)]
    };

    dispatch(setChatSlice({
      ...currentChat,
      lastMessage: messageInput,
      lastMessageTimestamp: new Date(),
      messages: [...(currentChat?.messages || []), { ...newMessage, sender, receiver }]
    }));

    const socket = io(SOCKET_URL);
    socket.emit('sendMessage', newMessage)

    dispatch<any>(sendMessage({ chatId: String(currentChat?._id), message: newMessage }))

    scrollToBottom();
    setMessageInput('');
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      // TODO
      const scrollContainer = scrollRef.current;
      setTimeout(() => {
        scrollContainer.scroll({ top: scrollContainer.scrollHeight - scrollContainer.clientHeight, behavior: 'smooth', });
      }, 20);
    }
  };

  ///////////////////////////////////////////////////// COMPONENTS ////////////////////////////////////////////////////
  const MessageComponent = ({ message }: { message: Message }) => {

    const msg = message.text
    const time = getRelativeTime(message.timestamp)
    const isMe = message?.sender == String(loggedUser?._id)

    return (
      <div className={isMe ? 'ml-auto max-w-[70%]' : 'max-w-[70%]'}>
        <div className={`mb-1 rounded-2xl px-5 py-3 bg-muted ${isMe ? 'rounded-br-none bg-primary text-white' : 'rounded-tl-none'} `}>
          <p>{msg}</p>
        </div>
        <p className={`text-xs ${isMe ? 'text-end' : 'text-start'}`}>{time}</p>
      </div>
    );
  };


  return (
    <>
      {
        chats.length == 0
          ?
          (
            <div className="flex h-full w-full col-span-3 items-center justify-center">
              <p className="text-3xl font-semibold text-muted-foreground ">No current conversation</p>
            </div>
          )
          :
          !currentChat?._id
            ?
            (
              <div className="flex h-full w-full col-span-3 items-center justify-center">
                <p className="text-3xl font-semibold text-muted-foreground ">Select a conversation</p>
              </div>
            )
            : (
              <div className="flex h-full flex-col border-l border-stroke dark:border-strokedark col-span-3 ">

                <div className="bg-muted sticky flex items-center justify-between border-b border-stroke h-20 px-6 py-3 dark:border-strokedark">
                  <div className="flex items-center gap-4 ">
                    <Avatar className='w-12 h-12 bg-black text-white ' >
                      <AvatarImage src={otherUser?.profilePicture} />
                      <AvatarFallback className='capitalize bg-inherit' >{otherUser?.username?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h5 className="w-max font-medium capitalize text-black ">
                      {otherUser?.username}
                    </h5>
                  </div>
                </div>

                <div ref={scrollRef} className="h-[32.2rem] flex flex-col gap-2 overflow-y-auto px-6 py-4 ">
                  {currentChat?.messages?.map((message: Message, index: number) => (
                    <MessageComponent
                      key={index}
                      message={message}
                    />
                  ))}
                </div>
                <div className="sticky bottom-0 border-t border-stroke bg-white px-6 h-24 py-4 dark:border-strokedark dark:bg-boxdark">
                  <form className="relative flex items-center justify-between gap-2 h-full ">
                    <Input
                      type="text"
                      placeholder={"Type your message"}
                      value={messageInput}
                      className='h-full focus:border-none'
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSendMessage(); } }}
                    />
                    <Button className='absolute right-1 top-1/2 transform -translate-y-1/2 h-[80%]' onClick={(e) => { e.preventDefault(); onSendMessage(); }}>
                      <Send />
                    </Button>
                  </form>
                </div>

              </div>
            )}
    </>
  );
};
