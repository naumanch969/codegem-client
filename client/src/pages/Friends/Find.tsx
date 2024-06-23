import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFriends } from '../../redux/reducers/friendSlice'
import { User } from '../../interfaces'
import { RootState } from '../../redux/store'
import FriendCard from './FriendCard'
import { Pagination } from '@mui/material'
import { empty } from '@/assets'
import { getUsers } from '@/redux/reducers/userSlice'

const Find = ({ searchValue }: { searchValue: string }) => {

  //////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////
  const dispatch = useDispatch()
  const { users: fetchedUsers, isFetching: usersFetching, count } = useSelector((state: RootState) => state.user)
  const pageSize = 20;
  const totalPages = Math.ceil(count / pageSize);

  //////////////////////////////////////////////////// STATES ////////////////////////////////////////////////
  const [friendsFetching, setFriendsFetching] = useState(false)
  const [users, setUsers] = useState(fetchedUsers)
  const [page, setPage] = useState(1)

  //////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getUsers(`?page=${page}&pageSize=${pageSize}&count=${true}`))
  }, [])
  useEffect(() => {
    // TODO: if data of particular page is available then dont call api
    fetchMore()
  }, [page])
  useEffect(() => {
    setUsers(fetchedUsers)
  }, [fetchedUsers])
  useEffect(() => {
    const filtered = fetchedUsers.filter(u => u.username.includes(searchValue) || u.firstName?.includes(searchValue) || u.lastName.includes(searchValue))
    setUsers(filtered)
  }, [searchValue])

  /////////////////////////////////////// FUNCTIONS /////////////////////////////////////////
  const fetchMore = async () => {
    setFriendsFetching(true)
    dispatch<any>(getFriends(`?page=${page}&pageSize=${pageSize}`)).finally(() => setFriendsFetching(false))
  }


  return (
    <div className='flex flex-col gap-y-8 w-full' >
      <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {
          usersFetching || friendsFetching
            ?
            Array(6).fill("").map((_, index) => (
              <FriendCard.Skeleton key={index} />
            ))
            :
            users.length == 0
              ?
              <div className='col-span-4 w-full flex flex-col justify-center items-center grayscale '>
                <img src={empty} alt='Empty' className='w-96 h-96 grayscale ' />
                <span className='text-foreground text-center text-lg font-semibold ' >Nothing Found.</span>
                <span className='text-muted-foreground text-center text-md ' >It's our fault not yours.</span>
              </div>
              :
              users.map((friend, index) => (
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

export default Find