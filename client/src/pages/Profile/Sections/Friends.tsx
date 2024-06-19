import React, { useEffect, useState } from 'react';
import FriendCard from '../../Friends/FriendCard';
import { User } from '../../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { getFriends } from '../../../redux/reducers/friendSlice';

const FriendsPage = () => {

  //////////////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////////////
  const dispatch = useDispatch()
  const { friends }: { friends: User[] } = useSelector((state: RootState) => state.friend)

  //////////////////////////////////////////////////////// STATES /////////////////////////////////////////////////////////////
  const [isFetching, setIsFetching] = useState(false)

  //////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////////
  useEffect(() => {
    if (friends?.length == 0) setIsFetching(true)
    dispatch<any>(getFriends(`?page=${1}&pageSize=${20}`)).finally(() => setIsFetching(false))
  }, [])

  //////////////////////////////////////////////////////// RENDER /////////////////////////////////////////////////////////////
  return (
    <div className="p-6 flex flex-col gap-4 w-full ">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          isFetching
            ?
            Array(6).fill('').map((_, index) => (
              <FriendCard.Skeleton key={index} />
            ))
            :
            <>
              {
                friends.length == 0
                  ?
                  <div className="flex justify-center items-center min-h-[16rem] col-span-3">
                    <p className='font-medium text-2xl text-center mb-16 ' >No friend to show.</p>
                  </div>
                  :
                  friends.map((friend, index) => (
                    <FriendCard key={index} friend={friend} type={'friend'} />
                  ))
              }
            </>
        }
      </div>
    </div>
  );
};

export default FriendsPage; 