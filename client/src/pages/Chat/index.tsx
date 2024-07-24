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
  const currentUserId = String(localStorage.getItem('userId'));

  /////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'userApplications' | 'groups' | 'candidates'>('all');
  const [userChats, setUserChats] = useState(chats);

  /////////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////
  useEffect(() => {
    if (chats?.length > 0) return
    setIsLoading(true);
    dispatch<any>(fetchChats(currentUserId)).then(() => setIsLoading(false));
  }, []);
  useEffect(() => {
    dispatch<any>(getUsers(''));
  }, []);
  useEffect(() => {
    setUserChats(chats);
  }, [chats]);

  return (
    <div className="flex flex-col">

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">

        <div className="col-span-12 xl:col-span-12">
          <div className="h-[calc(110vh-186px)] overflow-hidden sm:h-[calc(110vh-174px)]">
            {isLoading ? (
              <div className="flex h-full w-full items-center justify-center">
                <Loader />
              </div>
            ) : (
              <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex">
                <ChatList
                  chats={userChats}
                  setChats={setUserChats}
                />
                <ChatBox />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;