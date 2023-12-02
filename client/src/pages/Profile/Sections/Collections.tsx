import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Add, Favorite, Folder, Search } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import CollectionCard from '../../Collections/CollectionCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Collection, User } from '../../../interfaces';
import { getCollections, getUserCollections } from '../../../redux/actions/collection';
import { Loader } from '../../../utils/Components';

const Collections = () => {

  const dispatch = useDispatch()
  const { userCollections, isFetching }: { userCollections: Collection[], isFetching: boolean } = useSelector((state: RootState) => state.collection)
  const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch<any>(getUserCollections(loggedUser?._id as string))
  }, [])

  return (

    <div className="w-full flex flex-col gap-[2rem] ">
      {/* Your Collections */}
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold mb-6 text-dark-slate-blue">Your Collections</h2>
        {
          userCollections.length == 0
            ?
            <div className="flex justify-center items-center min-h-[16rem] ">
              <p className='font-medium text-2xl text-center mb-16 ' >No collections to show.</p>
            </div>
            :
            <>
              {
                isFetching ?
                  <div className='flex justify-center items-center w-full' >
                    <Loader />
                  </div>
                  :
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userCollections.map((collection, index) => (
                      <CollectionCard collection={collection} key={index} />
                    ))}
                  </div>
              }
            </>
        }
      </div>

    </div>
  );
};

export default Collections;