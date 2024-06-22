/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatBox } from './ChatBox';
import { ChatList } from './ChatList';
import { getChats, setChatSlice, setChatsSlice } from '@/redux/reducers/chatSlice';
import { RootState } from '@/redux/store';
import { useStateContext } from '@/contexts/ContextProvider';
import { User, Chat as TChat } from '@/interfaces';
import { connectToSocketIO } from '@/utils/functions/function';

const Chat = () => {

  /////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
  const dispatch = useDispatch()
  const { chats: fetchedChats, currentChat } = useSelector((state: RootState) => state.chat);
  const { loggedUser } = useSelector((state: RootState) => state.user)
  const { setLiveUsers, isConnectedToSocket, setIsConnectedToSocket, arrivalMessage, setArrivalMessage } = useStateContext()

  /////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
  const [chats, setChats] = useState(fetchedChats)

  /////////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////
  useEffect(() => {
    if (!isConnectedToSocket && loggedUser) {
      connectToSocketIO(setIsConnectedToSocket, loggedUser as User, setLiveUsers, setArrivalMessage);
    }
  }, [loggedUser]);
  useEffect(() => {

    if (!arrivalMessage) return

    const newChats = chats.map((c: TChat) => {
      const pIds = c.participants.map(p => String((p as User)?._id));
      const isPidsIncludes = pIds.findIndex(p => p == arrivalMessage?.sender) !== -1;
      if (isPidsIncludes) {
        const updatedChat = {
          ...c,
          messages: [...(c.messages || []), arrivalMessage],
          lastMessage: arrivalMessage.text,
          lastMessageTimestamp: arrivalMessage.timestamp
        };

        if (c._id === currentChat?._id) {
          dispatch<any>(setChatSlice({
            ...currentChat,
            messages: [...(currentChat?.messages || []), arrivalMessage]
          }));
        }
        return updatedChat;
      }
      return c;
    });

    dispatch(setChatsSlice(newChats))

  }, [arrivalMessage])

  useEffect(() => {
    dispatch<any>(getChats())
  }, []);
  useEffect(() => {
    setChats(fetchedChats)
  }, [fetchedChats])


  ///////////////////////////////////////////////////////// RENDER ///////////////////////////////////////////////////////
  return (
    <div className="flex flex-col">
      <div className="h-[calc(110vh-186px)] overflow-hidden sm:h-[calc(110vh-174px)]">
        <div className="grid grid-cols-4 w-full h-full rounded-sm border border-stroke bg-white shadow-default">
          <ChatList chats={chats} setChats={setChats} />
          <ChatBox chats={chats} setChats={setChats} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
