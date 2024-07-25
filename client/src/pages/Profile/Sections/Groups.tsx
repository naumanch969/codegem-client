import React, { useEffect } from 'react'
import GroupCard from '../../Groups/GroupCard';
import { Group, User } from '../../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { getUserGroups } from '../../../redux/actions/group';

const Groups = () => {

  const dispatch = useDispatch()
  const { userGroups, isFetching }: { userGroups: Group[], isFetching: boolean } = useSelector((state: RootState) => state.group)
  const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch<any>(getUserGroups(userGroups.length == 0, loggedUser?._id as string))
  }, [])

  return (
    <div className="w-full flex flex-col gap-3 ">

      {/* Heading */}
      <h3 className="text-3xl font-bold text-dark-slate-blue">Groups</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
        {
          isFetching
            ?
            Array(6).fill('').map((_, index) => (
              <GroupCard.Skeleton key={index} />
            ))
            :
            <>
              {
                userGroups.length == 0
                  ?
                  <div className="flex justify-center items-center min-h-[16rem] col-span-3 ">
                    <p className='font-medium text-2xl text-center mb-16 ' >No group to show.</p>
                  </div>
                  :
                  userGroups.map((group, index) => (
                    <GroupCard group={group} key={index} />
                  ))
              }
            </>
        }
      </div>
    </div>
  );
};

export default Groups;