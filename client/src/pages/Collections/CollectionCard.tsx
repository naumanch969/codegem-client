import React, { useState } from 'react';
import { Delete as DeleteIcon, Favorite, Update } from '@mui/icons-material';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Delete from './Delete'
import { Collection } from '../../interfaces';
import { useDispatch } from 'react-redux';
import { getCollectionReducer } from '../../redux/reducers/collection';
import { useCollectionModal } from '../../hooks/useCollectionModal';
import { LucideGroup } from 'lucide-react'


const CollectionCard = ({ collection }: { collection: Collection }) => {

    /////////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { onOpen, onSetCollection } = useCollectionModal()

    /////////////////////////////////////////////////// STATES /////////////////////////////////////////////////////
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

    /////////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////
    const handleOpenUpdateModal = () => {
        onSetCollection(collection)
        onOpen()
    }
    const handleOpenDeleteModal = () => {
        dispatch(getCollectionReducer(collection))
        setOpenDeleteModal(true)
    }



    return (
        <>
            <Delete open={openDeleteModal} setOpen={setOpenDeleteModal} />

            <Card elevation={3} className="bg-light-gray-light  p-[8px] rounded shadow-md transition-transform transform hover:scale-105">
                <CardContent className='p-2' >
                    <div className="flex justify-between items-center">
                        <Typography variant="h6" component="h3" className="text-dark-slate-blue capitalize ">
                            <LucideGroup fontSize="small" style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                            {collection.name}
                        </Typography>
                        <div className="flex gap-0 relative">
                            <button onClick={handleOpenUpdateModal} className="w-full flex hover:bg-cool-gray-light hover:text-teal-blue p-[6px] rounded-full gap-2"><Update /></button>
                            <button onClick={handleOpenDeleteModal} className="w-full flex hover:bg-cool-gray-light hover:text-teal-blue p-[6px] rounded-full gap-2"><DeleteIcon /></button>
                        </div>
                    </div>
                    <Typography variant="body2" className="text-cool-gray-dark max-lines-10">
                        {collection.description}
                    </Typography>
                    <Link
                        to={`/collections/${collection._id}`}
                        className="cursor-pointer text-teal-blue hover:text-teal-blue-dark hover:underline transition-colors duration-300"
                    >
                        View Collection
                    </Link>
                </CardContent>
            </Card>
        </>
    );
};

export default CollectionCard;


CollectionCard.Skeleton = function () {
    return (
        <div className={`w-full animate-pulse flex flex-col justify-between p-4 border rounded shadow-lg bg-light-gray`}>
            <div className="flex justify-between items-center">
                <div className="text-dark-slate-blue w-full flex items-center ">
                    <Favorite fontSize="small" className='mr-2' style={{ fontSize: '24px' }} />
                    <div className='h-4 w-16 bg-warm-gray-dark rounded' />
                </div>
                <div className="flex gap-1 relative">
                    <span className="h-8 w-8 bg-warm-gray-dark rounded-full" />
                    <span className="h-8 w-8 bg-warm-gray-dark rounded-full" />
                </div>
            </div>
            <div className="flex flex-col gap-y-2 mt-4">
                <span className="h-4 w-full bg-warm-gray-dark rounded" />
                <span className="h-4 w-full bg-warm-gray-dark rounded" />
                <span className="h-4 w-full bg-warm-gray-dark rounded" />
            </div>
        </div>
    )
}