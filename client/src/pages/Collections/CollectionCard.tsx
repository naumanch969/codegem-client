import React, { useState } from 'react';
import { motion } from 'framer-motion'
import { Delete as DeleteIcon, Favorite, MoreVert, Update as UpdateIcon } from '@mui/icons-material';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Update from './Update'
import Delete from './Delete'
import { Collection } from '../../interfaces';
import { useDispatch } from 'react-redux';
import { getCollectionReducer } from '../../redux/reducers/collection';


const CollectionCard = ({ collection }: { collection: Collection }) => {

    /////////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////
    const dispatch = useDispatch()

    /////////////////////////////////////////////////// STATES /////////////////////////////////////////////////////
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

    /////////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////
    const handleOpenUpdateModal = () => {
        setShowMenu(false);
        dispatch(getCollectionReducer(collection))
        setOpenUpdateModal(true)
    }
    const handleOpenDeleteModal = () => {
        setShowMenu(false);
        dispatch(getCollectionReducer(collection))
        setOpenDeleteModal(true)
    }


    /////////////////////////////////////////////////// COMPONENTS /////////////////////////////////////////////////////
    const Menu = () => (
        <motion.div animate={{ x: [100, 0], opacity: [0, 1] }} className="absolute z-[50] shadow-box top-[3rem] items-start right-0 w-[15rem] h-auto flex flex-col gap-[4px] p-[8px] border-[2px] bg-white text-dark-slate-blue border-warm-gray-dark rounded-[4px]">
        </motion.div>
    );

    return (
        <>

            <Update open={openUpdateModal} setOpen={setOpenUpdateModal} />
            <Delete open={openDeleteModal} setOpen={setOpenDeleteModal} />

            <Card elevation={3} className="bg-light-gray-light  p-[8px] rounded shadow-md transition-transform transform hover:scale-105">
                <CardContent className='p-2' >
                    <div className="flex justify-between items-center">
                        <Typography variant="h6" component="h3" className="text-dark-slate-blue capitalize ">
                            <Favorite fontSize="small" style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                            {collection.name}
                        </Typography>
                        <div className="flex gap-0 relative">
                            <button onClick={handleOpenUpdateModal} className="w-full flex hover:bg-cool-gray-light hover:text-teal-blue p-[6px] rounded-full gap-2"><UpdateIcon /></button>
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
