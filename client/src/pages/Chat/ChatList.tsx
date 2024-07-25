import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AlignRight, MessageCircle, Search } from 'lucide-react';
import { RootState } from '@/redux/store';
import { Chat, User } from '@/interfaces';
import { useStateContext } from '@/contexts/ContextProvider';
import { getOtherUserDetail } from '@/utils/functions/function';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { markAllMessagesAsRead, setCurrentChatSlice } from '@/redux/reducers/chatSlice';
import { IconButton } from '@mui/material';
import { getFriends } from '@/redux/reducers/friendSlice';
import InitiateChat from './InitiateChat';

export const ChatList = ({ chats, setChats }: { chats: Chat[]; setChats: any }) => {

  //////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////////
  const dispatch = useDispatch();
  const { users, loggedUser } = useSelector((state: RootState) => state.user);
  const { friends: fetchedFriends } = useSelector((state: RootState) => state.friend)
  const { chats: fetchedChats } = useSelector((state: RootState) => state.chat);
  const { selectedChat, setSelectedChat } = useStateContext();
  const currentUserId = loggedUser?._id!

  //////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState(fetchedFriends)
  const [isFetching, setIsFetching] = useState(false)
  const [openInitiateChat, setOpenInitiateChat] = useState(false)

  //////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////////////
  useEffect(() => {
    if (friends.length == 0) setIsFetching(true)
    dispatch<any>(getFriends(``)).finally(() => setIsFetching(false))
  }, [])
  useEffect(() => {
    setFriends(fetchedFriends)
  }, [fetchedFriends])

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

    const otherUser = chat?.participants?.find((p: User) => p?.username != loggedUser?.username)

    return (
      <div
        onClick={() => onChatClick(chat, otherUser as User)}
        className={`${selectedChat?.id == chat?.id ? 'bg-teal-blue' : 'bg-white/80 hover:bg-white/60'} text-black flex cursor-pointer items-center gap-2 rounded-md px-3 py-2.5 `}
      >

        <Avatar>
          <AvatarImage src={otherUser?.profilePicture} />
          <AvatarFallback className='bg-white text-dark-slate-blue-darken text-3xl font-medium flex justify-center items-center ' >{otherUser?.username?.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex w-fit flex-col ">
          <h5 className="text-sm font-medium capitalize ">
            {otherUser?.firstName?.length == 0 && otherUser?.lastName?.length == 0 ? `@${otherUser?.username}` : `${otherUser?.firstName} ${otherUser?.lastName}`}
          </h5>
          <p className={`text-sm text-black/70`}>{lastMessage}</p>
        </div>

      </div>
    );
  };

  //////////////////////////////////////////////// RENDER //////////////////////////////////////////////////////////
  return (
    <>
      <InitiateChat open={openInitiateChat} setOpen={setOpenInitiateChat} />

      <div className="h-full flex-col bg-whiter/75 dark:bg-black ">

        <div className="flex h-full flex-col overflow-auto p-4 py-3 relative ">

          <button
            title='Chat'
            className='absolute bottom-3 right-3 bg-teal-blue text-white rounded-full p-3 w-fit'
            onClick={() => setOpenInitiateChat(true)}
          >
            <MessageCircle />
          </button>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-bold text-dark-slate-blue">Chats</h3>
              <IconButton><AlignRight /></IconButton>
            </div>

            <div className="w-full ">
              <form onSubmit={(e) => { e.preventDefault(); onSearch(); }} className="sticky mb-7">
                <input
                  type="text"
                  className="w-full rounded border border-stroke bg-gray-2 py-2 px-3 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
                  placeholder="Search Chats"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyUp={(e) => { e.preventDefault(); onSearch(); }}
                />
                <button type="button" title="Search Chats" className="absolute right-4 top-1/2 -translate-y-1/2">
                  <Search />
                </button>
              </form>
            </div>
          </div>


          <div className="no-scrollbar max-h-full h-full space-y-1.5 overflow-auto">
            {chats?.length == 0 && (
              <div className="flex justify-center items-center h-full">
                <span className="block w-full text-center">
                  {searchQuery?.length > 0 ? 'No chat matches your search criteria.' : 'No conversation.'}
                </span>
              </div>
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