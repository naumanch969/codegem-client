/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Chat, User } from '@/interfaces';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RootState } from '@/redux/store';
import { setChatSlice } from '@/redux/reducers/chatSlice';

export const ChatList = ({ chats, setChats }: { chats: Chat[], setChats: any }) => {

  //////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////////
  const dispatch = useDispatch()
  const { chats: fetchedChats } = useSelector((state: RootState) => state.chat);
  const currentUserId = String(localStorage.getItem('userId'));
  const { loggedUser } = useSelector((state: RootState) => state.user)
  const { currentChat } = useSelector((state: RootState) => state.chat)

  //////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////
  const [searchQuery, setSearchQuery] = useState('');

  //////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////////////
  useEffect(() => {
    // Getting unread counts
  }, [currentUserId]);

  //////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////////
  const onChatClick = (chat: Chat) => {
    localStorage.setItem('lastChat', String(chat?._id));
    dispatch(setChatSlice(chat))
    // Socket: mark all messages as read
  };
  const onSearch = () => {
    const all = fetchedChats;
    const defaultChats = all
    if (searchQuery.trim() === '') { setChats(defaultChats); return; }

    const lowercasedQuery = searchQuery.toLowerCase();

    const filteredChats = defaultChats?.filter((chat: Chat) => {
      const otherUser = chat?.participants?.filter(p => String((p as User)?._id) != String(loggedUser?._id))[0] as User
      return otherUser?.username?.toLowerCase().includes(lowercasedQuery);
    });
    setChats(filteredChats);
  };

  //////////////////////////////////////////////// COMPONENTS //////////////////////////////////////////////////////////
  const ChatItem = ({ chat }: { chat: Chat }) => {

    const lastMessage = chat.lastMessage.slice(0, 30) || 'No messages yet';
    const unreadCount = 0;

    const otherUser = chat?.participants?.filter(p => String((p as User)?._id) != String(loggedUser?._id))[0] as User

    return (
      <div
        onClick={() => onChatClick(chat)}
        className={`${currentChat?._id == chat?._id ? 'bg-green' : 'bg-white'} 
        flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-green hover:text-white `}
      >
        <Avatar>
          <AvatarImage src={otherUser?.profilePicture} />
          <AvatarFallback className='text-black capitalize' >{otherUser?.username?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex w-fit flex-col ">
          <h5 className="text-sm font-medium">
            {otherUser?.username}
            {unreadCount > 0 && (
              <span className="rounded-full bg-blue-500 px-2 py-1 text-xs text-white">
                {unreadCount}
              </span>
            )}
          </h5>
          <p className="text-sm">{lastMessage}</p>
        </div>
      </div>
    );
  };

  //////////////////////////////////////////////// RENDER //////////////////////////////////////////////////////////
  return (
    <div className="col-span-1 h-full flex-col bg-muted/75 dark:bg-black rounded ">
      {/* <!-- ====== Chat List Start --> */}
      <div className="sticky border-b border-stroke px-6 py-10 dark:border-strokedark">
        <h3 className="text-lg font-medium text-black dark:text-white 2xl:text-xl">
          Messages
          <span className="rounded-md border-[.5px] border-stroke bg-gray-2 px-2 py-0.5 text-base font-medium text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-white 2xl:ml-4">
            {chats.length}
          </span>
        </h3>
      </div>
      <div className="flex max-h-full flex-col gap-y-4 overflow-auto p-5">
        <div className="w-full space-y-2 ">
          <form onSubmit={(e) => { e.preventDefault(); onSearch(); }} className="sticky mb-7">
            <input
              type="text"
              className="w-full rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={(e) => { e.preventDefault(); onSearch(); }}
            />
            <button type="button" title="Search" className="absolute right-4 top-1/2 -translate-y-1/2">
              <Search />
            </button>
          </form>
        </div>

        <div className="no-scrollbar max-h-full space-y-2.5 overflow-auto">
          {chats?.length == 0 && (
            <span className="block w-full text-center">
              {searchQuery.length > 0 ? 'No chat matches your search criteria.' : 'No conversation found.'}
            </span>
          )}
          {chats.map((chat, index) => (
            <ChatItem key={index} chat={chat} />
          ))}
        </div>
      </div>
    </div>
  );
};
