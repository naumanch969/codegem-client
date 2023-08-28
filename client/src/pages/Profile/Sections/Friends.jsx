import React from 'react';
import FriendCard from '../../Friends/FriendCard';
import { image1 } from '../../../assets';

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
  ];


  return (
    <div className="p-6 flex flex-col gap-[1rem] w-full ">

      <h1 className="text-3xl font-bold text-dark-slate-blue " >Friends</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sampleFriends.map((friend, index) => (
          <FriendCard key={index} friend={friend} />
        ))}
      </div>

    </div>
  );
};

export default FriendsPage;
