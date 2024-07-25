import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatBox } from './ChatBox';
import { ChatList } from './ChatList';
import { RootState } from '@/redux/store';
import { fetchChats } from '@/redux/reducers/chatSlice';
import { Loader } from '@/utils/Components';
import { getUsers } from '@/redux/reducers/userSlice';

const Chat = () => {

  /////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
  const dispatch = useDispatch();
  const { chats } = useSelector((state: RootState) => state.chat);
  const { loggedUser } = useSelector((state: RootState) => state.user)

  /////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
  const [isLoading, setIsLoading] = useState(false);
  const [userChats, setUserChats] = useState(chats);

  /////////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////
  useEffect(() => {
    if (chats?.length > 0) return
    setIsLoading(true);
    dispatch<any>(fetchChats(loggedUser?._id!)).then(() => setIsLoading(false));
  }, []);
  useEffect(() => {
    dispatch<any>(getUsers(''));
  }, []);
  useEffect(() => {
    setUserChats(chats);
  }, [chats]);

  return (
    <div className="flex flex-col w-full">

      <div className="h-[calc(100vh-4rem)] overflow-hidden w-full ">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="grid xl:grid-cols-10 grid-cols-6 gap-4 w-full h-full rounded-lg p-4 bg-white shadow-default ">
            <div className="xl:col-span-3 col-span-2 bg-gray-100 border-[2px] border-dark-slate-blue-darken rounded-lg overflow-hidden ">
              <ChatList chats={userChats} setChats={setUserChats} />
            </div>
            <div className="xl:col-span-7 col-span-4 bg-dark-slate-50 border-[2px] border-dark-slate-blue-darken rounded-lg overflow-hidden ">
              <ChatBox />
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Chat;