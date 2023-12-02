import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Add, Favorite, Folder, Search } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import GroupCard from '../../Groups/GroupCard';
import { Group, User } from '../../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { getGroups, getUserGroups } from '../../../redux/actions/group';
import { Loader } from '../../../utils/Components';

const Groups = () => {

  const dispatch = useDispatch()
  const { userGroups, isFetching }: { userGroups: Group[], isFetching: boolean } = useSelector((state: RootState) => state.group)
  const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch<any>(getUserGroups(loggedUser?._id as string))
  }, [])

  return (

    <div className="w-full flex flex-col gap-[2rem] ">
      {/* Your Collections */}
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold mb-6 text-dark-slate-blue">Your Groups</h2>
        {
          isFetching
            ?
            <div className="flex justify-center items-center w-ful">
              <Loader />
            </div>
            :
            <>
              {
                userGroups.length == 0
                  ?
                  <div className="flex justify-center items-center min-h-[16rem] ">
                    <p className='font-medium text-2xl text-center mb-16 ' >No group to show.</p>
                  </div>
                  :
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userGroups.map((group, index) => (
                      <GroupCard group={group} key={index} />
                    ))}
                  </div>
              }
            </>
        }
      </div>

    </div>
  );
};

export default Groups;