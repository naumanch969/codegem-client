import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFriends } from '../../redux/actions/friend'
import { User } from '../../interfaces'
import { Loader } from '../../utils/Components'
import { RootState } from '../../redux/store'
import FriendCard from './FriendCard'

const Friends = () => {

  //////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////
  const dispatch = useDispatch()
  const { friends, isFetching }: { friends: User[], isFetching: boolean } = useSelector((state: RootState) => state.friend)

  //////////////////////////////////////////////////// STATES ////////////////////////////////////////////////

  //////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getFriends(friends.length == 0))
  }, [])

  //////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////


  return (
    <div className="w-full">
      {
        isFetching
          ?
          <div className="w-full flex justify-center items-center">
            <Loader />
          </div>
          :
          <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {
              friends.map((friend, index) => (
                <FriendCard key={index} friend={friend} type={'friend'} />
              ))
            }
          </div>
      }
    </div>
  )
}

export default Friends