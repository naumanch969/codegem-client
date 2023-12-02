import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSentRequests, getSuggestedUsers } from '../../redux/actions/friend'
import { User } from '../../interfaces'
import { Loader } from '../../utils/Components'
import { RootState } from '../../redux/store'
import FriendCard from './FriendCard'

const SentRequest = () => {

    //////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { sentRequests, isFetching }: { sentRequests: User[], isFetching: boolean } = useSelector((state: RootState) => state.friend)

    //////////////////////////////////////////////////// STATES ////////////////////////////////////////////////

    //////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getSentRequests())
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
                            sentRequests.map((friend, index) => (
                                <FriendCard key={index} friend={friend} type={'sentRequest'} />
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default SentRequest