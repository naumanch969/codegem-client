import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFriends } from '../../redux/reducers/friendSlice'
import { RootState } from '../../redux/store'
import FriendCard from './FriendCard'
import { Pagination } from '@mui/material'
import { empty } from '@/assets'

const Friends = ({ searchValue }: { searchValue: string }) => {

  //////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////
  const dispatch = useDispatch()
  const { friends: fetchedFriends, count } = useSelector((state: RootState) => state.friend)
  const pageSize = 20;
  const totalPages = Math.ceil(count.friends / pageSize);

  //////////////////////////////////////////////////// STATES ////////////////////////////////////////////////
  const [isFetching, setIsFetching] = useState(false)
  const [page, setPage] = useState(1)
  const [friends, setFriends] = useState(fetchedFriends)

  //////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////
  useEffect(() => {
    if (friends.length == 0) setIsFetching(true)
    dispatch<any>(getFriends(`?page=${page}&pageSize=${pageSize}&count=${true}`)).finally(() => setIsFetching(false))
  }, [])
  useEffect(() => {
    // TODO: if data of particular page is available then dont call api
    fetchMore()
  }, [page])
  useEffect(() => {
    setFriends(fetchedFriends)
  }, [fetchedFriends])
  useEffect(() => {
    const filtered = fetchedFriends.filter(u => u.username.includes(searchValue) || u.firstName?.includes(searchValue) || u.lastName.includes(searchValue))
    setFriends(filtered)
  }, [searchValue])

  /////////////////////////////////////// FUNCTIONS /////////////////////////////////////////
  const fetchMore = async () => {
    setIsFetching(true)
    dispatch<any>(getFriends(`?page=${page}&pageSize=${pageSize}`)).finally(() => setIsFetching(false))
  }
  
  
  /////////////////////////////////////// FUNCTIONS /////////////////////////////////////////
  return (
    <div className='flex flex-col gap-y-8 w-full' >
      <div className='w-full flex flex-col gap-6'>
        {
          isFetching
            ?
            Array(6).fill("").map((_, index) => (
              <FriendCard.Skeleton key={index} />
            ))
            :
            friends.length == 0
              ?
              <div className='w-full flex flex-col justify-center items-center grayscale '>
                <img src={empty} alt='Empty' className='w-96 h-96 grayscale ' />
                <span className='text-foreground text-center text-lg font-semibold ' >Nothing Found.</span>
                <span className='text-muted-foreground text-center text-md ' >It's our fault not yours.</span>
              </div>
              :
              friends.map((friend, index) => (
                <FriendCard key={index} friend={friend} type={'friend'} />
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

export default Friends