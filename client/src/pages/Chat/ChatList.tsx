import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'lucide-react';
import { RootState } from '@/redux/store';
import { Chat, User } from '@/interfaces';
import { useStateContext } from '@/contexts/ContextProvider';
import { getOtherUserDetail } from '@/utils/functions/function';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { markAllMessagesAsRead, setCurrentChatSlice } from '@/redux/reducers/chatSlice';

export const ChatList = ({ chats, setChats }: { chats: Chat[]; setChats: any }) => {

  //////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.user);
  const { chats: fetchedChats } = useSelector((state: RootState) => state.chat);
  const { selectedChat, setSelectedChat } = useStateContext();
  const currentUserId = String(localStorage.getItem('userId'));

  //////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////
  const [searchQuery, setSearchQuery] = useState('');

  //////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////////////

  //////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////////
  const onChatClick = (chat: Chat, otherUser: User) => {
    localStorage.setItem('lastChat', chat?.id as string);
    setSelectedChat({ ...chat, otherUser });
    dispatch(setCurrentChatSlice({ ...chat, otherUser }))
    dispatch<any>(markAllMessagesAsRead({ chatId: chat?.id as string, userId: currentUserId }));
  };
  const onSearch = () => {

    if (searchQuery?.trim() === '') { setChats(fetchedChats); return; }

    const lowercasedQuery = searchQuery?.toLowerCase();

    const filteredChats = fetchedChats?.filter((chat: Chat) => {
      const otherUser: User = getOtherUserDetail(chat?.participantIds, users, currentUserId) as User
      return otherUser?.username?.toLowerCase()?.includes(lowercasedQuery);
    });

    setChats(filteredChats);
  };

  //////////////////////////////////////////////// COMPONENTS //////////////////////////////////////////////////////////
  const ChatItem = ({ chat }: { chat: any }) => {

    let lastMessage = chat?.lastMessage?.slice(0, 30) || 'No messages yet';

    const [otherUser, setOtherUser] = useState(getOtherUserDetail(chat?.participants, users, currentUserId));

    useEffect(() => {
      if (users?.length > 0) setOtherUser(getOtherUserDetail(chat?.participants, users, currentUserId));
    }, [users]);

    return (
      <div
        onClick={() => onChatClick(chat, otherUser as User)}
        className={`${selectedChat?.id == chat?.id ? 'bg-white/75' : ''} flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-white dark:hover:bg-strokedark`}
      >

        <Avatar>
          <AvatarImage src={otherUser?.profilePicture} />
          <AvatarFallback>{otherUser?.username?.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex w-fit flex-col ">
          <h5 className="text-sm font-medium text-black dark:text-white">
            {chat?.groupName || otherUser?.username}
          </h5>
          <p className="text-sm">{lastMessage}</p>
        </div>

      </div>
    );
  };

  //////////////////////////////////////////////// RENDER //////////////////////////////////////////////////////////
  return (
    <>

      <div className="hidden h-full flex-col bg-whiter/75 dark:bg-black xl:flex xl:w-1/3 ">
        <div className="flex justify-between items-center sticky border-b border-stroke px-6 py-10 dark:border-strokedark">
          <h3 className="text-lg font-medium text-black dark:text-white 2xl:text-xl">
            Chat
            <span className="rounded-md border-[.5px] border-stroke bg-gray-2 px-2 py-0.5 text-base font-medium text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-white 2xl:ml-4">
              {chats?.length}
            </span>
          </h3>
        </div>
        <div className="flex h-full flex-col gap-y-4 overflow-auto p-5 relative ">
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
                {searchQuery?.length > 0 ? 'No chat matches your search criteria.' : 'No conversation.'}
              </span>
            )}
            {chats?.map((chat, index) => (
              <ChatItem key={index} chat={chat} />
            ))}
          </div>

        </div>
      </div>
    </>
  );
};