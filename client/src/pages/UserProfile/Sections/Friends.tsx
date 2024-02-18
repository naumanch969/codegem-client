import React, { useEffect } from 'react';
import FriendCard from '../../Friends/FriendCard';
import { image1 } from '../../../assets';
import { User } from '../../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { getFriends } from '../../../redux/actions/friend';
import { Loader } from '../../../utils/Components';

const FriendsPage = () => {

  const dispatch = useDispatch()
  const { friends, isFetching }: { friends: User[], isFetching: boolean } = useSelector((state: RootState) => state.friend)

  useEffect(() => {
    dispatch<any>(getFriends(friends.length == 0, ''))
  }, [])

  return (
    <div className="p-6 flex flex-col gap-[1rem] w-full ">

      <h1 className="text-3xl font-bold text-dark-slate-blue " >Friends</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                  <div className="flex justify-center items-center min-h-[16rem] ">
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
