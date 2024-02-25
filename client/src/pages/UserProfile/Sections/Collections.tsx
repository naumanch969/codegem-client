import React, { useEffect } from 'react'
import CollectionCard from '../../Collections/CollectionCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Collection, User } from '../../../interfaces';
import { getUserCollections } from '../../../redux/actions/collection';

const Collections = () => {

  const dispatch = useDispatch()
  const { userCollections, isFetching }: { userCollections: Collection[], isFetching: boolean } = useSelector((state: RootState) => state.collection)
  const { currentUser }: { currentUser: User | null } = useSelector((state: RootState) => state.user)

  useEffect(() => {
            // Place User Collection
  }, [])

  return (

    <div className="w-full flex flex-col gap-8 ">
      {/* Your Collections */}
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold mb-6 text-dark-slate-blue">Your Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            isFetching ?
              Array(6).fill('').map((_, index) => (
                <CollectionCard.Skeleton key={index} />
              ))
              :
              <>
                {
                  userCollections.length == 0
                    ?
                    <div className="flex justify-center items-center min-h-[16rem] col-span-3 ">
                      <p className='font-medium text-2xl text-center mb-16 ' >No collections to show.</p>
                    </div>
                    :
                    userCollections.map((collection, index) => (
                      <CollectionCard collection={collection} key={index} />
                    ))
                }
              </>
          }
        </div>
      </div>

    </div>
  );
};

export default Collections;