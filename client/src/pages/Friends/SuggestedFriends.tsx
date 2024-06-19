import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSuggestedUsers } from '../../redux/reducers/friendSlice'
import { User } from '../../interfaces'
import { RootState } from '../../redux/store'
import FriendCard from './FriendCard'
import { Pagination } from '@mui/material'
import { empty } from '@/assets'

const SuggestedFriends = ({ totalPages, page, setPage, pageSize }: { totalPages: number, page: number, setPage: any, pageSize: number }) => {

    //////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { suggestedUsers }: { suggestedUsers: User[] } = useSelector((state: RootState) => state.friend)

    //////////////////////////////////////////////////// STATES ////////////////////////////////////////////////
    const [isFetching, setIsFetching] = useState(false)

    //////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////
    useEffect(() => {
        if (suggestedUsers?.length == 0) setIsFetching(true)
        dispatch<any>(getSuggestedUsers(`?page=${page}&pageSize=${pageSize}`)).finally(() => setIsFetching(false))
    }, [])
    useEffect(() => {
        // TODO: if data of particular page is available then dont call api
        fetchMore()
    }, [page])

    /////////////////////////////////////// FUNCTIONS /////////////////////////////////////////
    const fetchMore = async () => {
        if (suggestedUsers?.length == 0) setIsFetching(true)
        dispatch<any>(getSuggestedUsers(`?page=${page}&pageSize=${pageSize}`)).finally(() => setIsFetching(false))
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
                        suggestedUsers.length == 0
                            ?
                            <div className='col-span-4 w-full flex flex-col justify-center items-center grayscale '>
                                <img src={empty} alt='Empty' className='w-96 h-96 grayscale ' />
                                <span className='text-foreground text-center text-lg font-semibold ' >Nothing Found.</span>
                                <span className='text-muted-foreground text-center text-md ' >It's our fault not yours.</span>
                            </div>
                            :
                            suggestedUsers.map((friend, index) => (
                                <FriendCard key={index} friend={friend} type={'suggestedUser'} />
                            ))
                }
            </div>

            {
                totalPages > 1 &&
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
            }

        </div>
    )
}

export default SuggestedFriends