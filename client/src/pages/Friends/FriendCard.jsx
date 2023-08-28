import React from 'react';

const FriendCard = ({ friend }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-md flex flex-col justify-between">
      <div>
        <img
          src={friend.profileImage}
          alt={friend.name}
          className="w-full h-[160px] object-cover rounded-md mb-2"
        />
        <p className="text-center text-sm font-medium text-dark-slate-blue-darken ">{friend.name}</p>
      </div>
      <div className="mt-2">
        <p className="text-cool-gray text-xs mb-1">
          {friend.mutualFriends > 0 ? `${friend.mutualFriends} Mutual Friends` : 'No Mutual Friends'}
        </p>
        {friend.isFriend ? (
          <button className="w-full py-2 bg-teal-blue hover:bg-teal-blue-lighten text-white rounded-md mb-1 text-xs">
            View Profile
          </button>
        ) : (
          <button className="w-full py-2 bg-teal-blue hover:bg-teal-blue-lighten text-white rounded-md text-xs">
            Add Friend
          </button>
        )}
      </div>
    </div>
  );
};

export default FriendCard;
