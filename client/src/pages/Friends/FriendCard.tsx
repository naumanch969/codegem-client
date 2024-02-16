import React from 'react';
import { User } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { acceptFriendRequest, rejectFriendRequest, removeFriendRequest, sendFriendRequest } from '../../redux/actions/friend';
import { useNavigate } from 'react-router-dom';

const FriendCard = ({ friend, type }: { friend: User, type: string }) => {

  // const mutualFriendsCount = user?.friends && friend?.friends
  //   ? user?.friends.filter(userFriend => friend?.friends.includes(userFriend)).length
  //   : 0;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSendFriendRequest = () => {
    dispatch<any>(sendFriendRequest(friend?._id as string))
  }
  const handleAcceptFriendRequest = () => {
    dispatch<any>(acceptFriendRequest(friend?._id as string))
  }
  const handleRemoveFriendRequest = () => {
    dispatch<any>(removeFriendRequest(friend?._id as string))
  }
  const handleRejectFriendRequest = () => {
    dispatch<any>(rejectFriendRequest(friend?._id as string))
  }

  return (
    <div className="bg-white p-4 shadow-md rounded-md flex flex-col justify-between">
      <div className='w-full ' >
        {
          friend?.profilePicture
            ?
            <img
              src={friend?.profilePicture}
              alt={friend?.username}
              className="w-full h-[160px] object-cover rounded-md mb-2"
            />
            :
            <div className='w-full h-[160px] rounded-md mb-2 capitalize flex justify-center items-center bg-black text-white font-semibold text-[5rem] '>{friend?.username?.charAt(0)}</div>
        }
        <p onClick={() => navigate(`/user/${friend._id}`)} className="cursor-pointer text-center text-sm font-medium text-dark-slate-blue-darken capitalize ">{friend?.firstName} {friend?.lastName}</p>
      </div>
      <div className="mt-2">
        <p className="text-cool-gray text-xs mb-1">
          {friend?.mutualFriends as number > 0 ? `${friend?.mutualFriends} Mutual Friends` : 'No Mutual Friends'}
        </p>
        {type == 'friend' &&
          <button onClick={() => navigate(`/user/${friend._id}`)} className="w-full py-2 bg-teal-blue hover:bg-teal-blue-lighten text-white rounded-md mb-1 text-xs">
            View Profile
          </button>
        }
        {type == 'suggestedUser' &&
          <button onClick={handleSendFriendRequest} className="w-full py-2 bg-teal-blue hover:bg-teal-blue-lighten text-white rounded-md text-xs">
            Add Friend
          </button>
        }
        {type == 'receivedRequest' &&
          <div className='flex justify-between gap-2 mt-1 ' >
            <button onClick={handleRejectFriendRequest} className="w-1/2 py-2 bg-red-500 hover:bg-red-400 text-white rounded-md text-xs">
              Reject
            </button>
            <button onClick={handleAcceptFriendRequest} className="w-1/2 py-2 bg-teal-blue hover:bg-teal-blue-lighten text-white rounded-md text-xs">
              Accept
            </button>
          </div>
        }
        {type == 'sentRequest' &&
          <button onClick={handleRemoveFriendRequest} className="w-full py-2 bg-teal-blue hover:bg-teal-blue-lighten text-white rounded-md text-xs">
            Remove
          </button>
        }
      </div>
    </div>
  );
};

export default FriendCard;

FriendCard.Skeleton = function () {
  return (
    <div className='w-full flex flex-col justify-start gap-x-2 p-[1rem] bg-light-gray text-cool-gray-dark rounded-[6px] animate-pulse mb-4 '>
      <div className="flex w-full justify-center ">
        <div className="w-full h-40 rounded-lg bg-warm-gray-dark" />
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-y-2 mt-2 ">
        <p className="w-[60%] h-5 bg-warm-gray-dark rounded" />
        <p className="w-full h-4 bg-warm-gray-dark rounded" />
      </div>
      <p className="w-full h-8 bg-warm-gray-dark rounded mt-2 " />
    </div>
  )
}