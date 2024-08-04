import React from 'react';
import { User } from '../../interfaces';
import { useDispatch } from 'react-redux';
import { acceptFriendRequest, rejectFriendRequest, removeFriendRequest, sendFriendRequest } from '../../redux/reducers/friendSlice';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const FriendCard = ({ friend, type }: { friend: User, type: string }) => {

  //////////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////////////
  // const mutualFriendsCount = user?.friends && friend?.friends
  //   ? user?.friends.filter(userFriend => friend?.friends.includes(userFriend)).length
  //   : 0;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////////
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

  //////////////////////////////////////////////////////// RENDER ////////////////////////////////////////////////////////////
  return (
    <div className="bg-white p-4 shadow-md rounded-md flex w-full justify-between">
      <div className='flex gap-2' >
        <Avatar>
          <AvatarImage src={friend?.profilePicture} alt="Profile" />
          <AvatarFallback className='capitalize bg-blackish text-white' >{friend?.username?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center gap-1">
          <p onClick={() => navigate(`/user/${friend._id}`)} className="cursor-pointer text-center text-base font-semibold text-blackish-darken capitalize ">
            {friend?.firstName} {friend?.lastName}
          </p>
          <p onClick={() => navigate(`/user/${friend._id}`)} className="cursor-pointer text-center text-sm font-medium text-blackish-darken/60 capitalize ">
            @{friend?.username}
          </p>
        </div>
        {/* <p className="text-cool-gray text-xs mb-1">
          {friend?.mutualFriends as number > 0 ? `${friend?.mutualFriends} Mutual Friends` : 'No Mutual Friends'}
        </p> */}
      </div>
      <div className="mt-2">
        {type == 'friend' &&
          <Button variant='default' onClick={() => navigate(`/user/${friend._id}`)} >
            View Profile
          </Button>
        }
        {type == 'suggestedUser' &&
          <Button onClick={handleSendFriendRequest} >
            Add Friend
          </Button>
        }
        {type == 'receivedRequest' &&
          <div className='flex justify-between gap-2 mt-1 ' >
            <Button variant='destructive' onClick={handleRejectFriendRequest} >
              Reject
            </Button>
            <Button onClick={handleAcceptFriendRequest} >
              Accept
            </Button>
          </div>
        }
        {type == 'sentRequest' &&
          <Button onClick={handleRemoveFriendRequest} >
            Remove
          </Button>
        }
      </div>
    </div>
  );
};

export default FriendCard;

FriendCard.Skeleton = function () {
  return (
    <div className='w-full flex flex-col justify-start gap-x-2 p-4 bg-light-gray text-cool-gray-dark rounded-[6px] animate-pulse mb-4 '>
      <div className="flex w-full justify-center ">
        <div className="w-full h-40 rounded-lg bg-warm-gray-dark" />
      </div>
      <div className="w-full flex flex-col justify-start items-center gap-y-2 mt-2 ">
        <p className="w-2/3 h-5 bg-warm-gray-dark rounded" />
        <p className="w-1/3 h-4 bg-warm-gray-dark rounded" />
      </div>
    </div>
  )
}