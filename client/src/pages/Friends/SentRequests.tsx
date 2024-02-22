import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSentRequests, getSuggestedUsers } from '../../redux/actions/friend'
import { User } from '../../interfaces'
import { RootState } from '../../redux/store'
import FriendCard from './FriendCard'
import { Pagination } from '@mui/material'

const SentRequest = ({ totalPages, page, setPage, pageSize }: { totalPages: number, page: number, setPage: any, pageSize: number }) => {

    //////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { sentRequests, isFetching }: { sentRequests: User[], isFetching: boolean } = useSelector((state: RootState) => state.friend)

    //////////////////////////////////////////////////// STATES ////////////////////////////////////////////////

    //////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getSentRequests(sentRequests.length == 0, `?page=${page}&pageSize=${pageSize}`))
    }, [])
    useEffect(() => {
        // TODO: if data of particular page is available then dont call api
        fetchMore()
    }, [page])

    /////////////////////////////////////// FUNCTIONS /////////////////////////////////////////
    const fetchMore = async () => {
        dispatch<any>(getSuggestedUsers(sentRequests.length == 0, `?page=${page}&pageSize=${pageSize}`))
    }

    return (
        <div className='flex flex-col gap-y-8 w-full' >
            <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {
                    isFetching
                        ?
                        Array(6).fill("").map((_, index) => (
                            <FriendCard.Skeleton key={index} />
                        ))
                        :
                        sentRequests.map((friend, index) => (
                            <FriendCard key={index} friend={friend} type={'sentRequest'} />
                        ))
                }
            </div>
            <div className="w-full flex justify-center">
                <Pagination
                    count={totalPages}
                    defaultPage={1}
                    page={page}
                    siblingCount={0}
                    onChange={(e: any, page: number) => setPage(page)}
                    size='large'
                />
            </div>
        </div>
    )
}

export default SentRequest