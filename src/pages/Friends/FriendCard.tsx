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
    <div className='w-full flex justify-between gap-x-2 p-4 bg-light-gray text-cool-gray-dark rounded-[6px] animate-pulse mb-4 '>
      <div className="flex w-full justify-start items-center gap-1 ">
        <Avatar>
          <AvatarImage src={''} alt="Profile" />
          <AvatarFallback className='capitalize bg-blackish text-white' ></AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1" >
          <div className="h-4 w-20 rounded bg-warm-gray-dark" />
          <div className="h-3 w-12 rounded bg-warm-gray-dark" />
        </div>
      </div>

    </div>
  )
}