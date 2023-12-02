import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReceivedRequests, getSuggestedUsers } from '../../redux/actions/friend'
import { User } from '../../interfaces'
import { Loader } from '../../utils/Components'
import { RootState } from '../../redux/store'
import FriendCard from './FriendCard'

const ReceivedRequests = () => {

    //////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { receivedRequests, isFetching }: { receivedRequests: User[], isFetching: boolean } = useSelector((state: RootState) => state.friend)

    //////////////////////////////////////////////////// STATES ////////////////////////////////////////////////

    //////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getReceivedRequests())
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
                receivedRequests.map((friend, index) => (
                  <FriendCard key={index} friend={friend} type={'receivedRequest'} />
                ))
              }
            </div>
        }
      </div>
    )
}

export default ReceivedRequests