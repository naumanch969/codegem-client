import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSuggestedUsers } from '../../redux/reducers/friendSlice'
import { RootState } from '../../redux/store'
import FriendCard from './FriendCard'
import { Pagination } from '@mui/material'
import { empty } from '@/assets'

const SuggestedFriends = ({ searchValue }: { searchValue: string }) => {

    //////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { suggestedUsers: fetchedSuggestedUsers, count } = useSelector((state: RootState) => state.friend)
    const pageSize = 20;
    const totalPages = Math.ceil(count.suggestedUsers / pageSize);

    //////////////////////////////////////////////////// STATES ////////////////////////////////////////////////
    const [isFetching, setIsFetching] = useState(false)
    const [page, setPage] = useState(1)
    const [suggestedUsers, setSuggestedUsers] = useState(fetchedSuggestedUsers)

    //////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////
    useEffect(() => {
        if (suggestedUsers?.length == 0) setIsFetching(true)
        dispatch<any>(getSuggestedUsers(`?page=${page}&pageSize=${pageSize}?count=${true}`)).finally(() => setIsFetching(false))
    }, [])
    useEffect(() => {
        // TODO: if data of particular page is available then dont call api
        fetchMore()
    }, [page])
    useEffect(() => {
        setSuggestedUsers(fetchedSuggestedUsers)
    }, [fetchedSuggestedUsers])
    useEffect(() => {
        const filtered = fetchedSuggestedUsers.filter(u => u.username.includes(searchValue) || u.firstName?.includes(searchValue) || u.lastName.includes(searchValue))
        setSuggestedUsers(filtered)
    }, [searchValue])

    /////////////////////////////////////// FUNCTIONS /////////////////////////////////////////
    const fetchMore = async () => {
        if (suggestedUsers?.length == 0) setIsFetching(true)
        dispatch<any>(getSuggestedUsers(`?page=${page}&pageSize=${pageSize}`)).finally(() => setIsFetching(false))
    }

    return (
        <div className='flex flex-col gap-y-8 w-full' >
            <div className='w-full flex flex-col gap-2'>
                {
                    isFetching
                        ?
                        Array(6).fill("").map((_, index) => (
                            <FriendCard.Skeleton key={index} />
                        ))
                        :
                        suggestedUsers.length == 0
                            ?
                            <div className='w-full flex flex-col justify-center items-center grayscale '>
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