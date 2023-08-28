import React, { useState } from 'react';
import { Search, PersonAdd, Notifications, ArrowForward, SearchOff } from '@mui/icons-material';
import FriendCard from './FriendCard';
import Menubar from './Menubar';
import { image1 } from '../../assets';

const FriendsPage = () => {

  const sampleFriends = [
    {
      id: 1,
      name: 'John Doe',
      profileImage: image1,
      mutualFriends: 3,
      isFriend: false,
    },
    {
      id: 2,
      name: 'Jane Smith',
      profileImage: image1,
      mutualFriends: 1,
      isFriend: true,
    },
    {
      id: 1,
      name: 'John Doe',
      profileImage: image1,
      mutualFriends: 3,
      isFriend: false,
    },
    {
      id: 2,
      name: 'Jane Smith',
      profileImage: image1,
      mutualFriends: 1,
      isFriend: true,
    },
    {
      id: 1,
      name: 'John Doe',
      profileImage: image1,
      mutualFriends: 3,
      isFriend: false,
    },
    {
      id: 2,
      name: 'Jane Smith',
      profileImage: image1,
      mutualFriends: 1,
      isFriend: true,
    },
    // Add more sample friends
  ];
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenuItem, setActiveMenuItem] = useState('friends');
  const filteredFriends = sampleFriends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = () => {
    // Implement your search functionality here
  };

  return (
    <div className="p-6 flex flex-col gap-[1rem] w-full ">

      <h1 className="text-3xl font-bold text-dark-slate-blue " >Friends</h1>

      <div className="flex justify-between items-center w-full ">
        <Menubar activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} />
        <div className="relative w-fit ">
          <input
            type="text"
            placeholder="Search Friends..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-blue-dark focus:border-transparent"
          />
          <span onClick={handleSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
            <SearchOff />
          </span>
        </div>
      </div>



      {activeMenuItem === 'friends' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFriends.map((friend, index) => (
            <FriendCard key={index} friend={friend} />
          ))}
        </div>
      )}

    </div>
  );
};

export default FriendsPage;
