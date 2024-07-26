import React, { useEffect, useState } from 'react';
import { Delete as DeleteIcon, Favorite, MoreVert, Update } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Delete from './Delete'
import { Collection, User } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { getCollectionReducer } from '../../redux/reducers/collection';
import { useCollectionModal } from '../../hooks/useCollectionModal';
import { Edit, LucideGroup, Star } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconButton } from '@mui/material';
import { RootState } from '@/redux/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'timeago.js';
import { Button } from '@/components/ui/button';
import { starCollection } from '@/redux/actions/collection';
import { useRole } from '@/hooks/useRole';

const CollectionCard = ({ collection }: { collection: Collection }) => {

    /////////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)
    const isOwner = ((collection.owner as User)?._id || collection.owner) == loggedUser?._id!
    const starred: boolean = Boolean(collection.stars.find(id => id == loggedUser?._id!))
    const { onOpen, onSetCollection } = useCollectionModal()
    const { role } = useRole()

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
    const onStar = () => {
        dispatch<any>(starCollection(collection._id, loggedUser?._id!))
    }


    return (
        <>
            <Delete open={openDeleteModal} setOpen={setOpenDeleteModal} />

            <Card className={`${isOwner ? 'bg-muted' : 'bg-white'} flex flex-col justify-between rounded transition-transform transform hover:scale-105`}>
                <CardHeader className='flex flex-row items-center justify-between gap-2 p-4 w-full space-y-0' >
                    <div className="flex justify-start items-center gap-2 ">
                        <Avatar className='w-8 h-8 ' >
                            <AvatarImage src={(collection?.owner as User)?.profilePicture} alt="Profile" />
                            <AvatarFallback className='capitalize' >{(collection?.owner as User)?.firstName?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className='flex flex-col items-start justify-center space-y-0 '>
                            <Link to={`/user/${(collection?.owner as User)?._id}`} className='text-xs font-semibold capitalize hover:underline hover:text-copper'>
                                {(collection?.owner as User)?.firstName} {(collection?.owner as User)?.lastName}
                            </Link>
                        </h3>
                        <span className='text-copper text-[11px] '>{format(collection?.createdAt as Date)}</span>
                    </div>
                    {
                        !isOwner &&
                        <Button onClick={onStar} variant={starred ? 'default' : 'outline'} size='sm' className='p-1 w-7 h-7 ' ><Star className='w-4 h-4' /></Button>
                    }
                </CardHeader>

                <CardContent className='p-4 pt-0' >
                    <div className="flex justify-between items-center mb-2 ">
                        <Link to={`/collections/${collection?._id}`} className='text-blackish hover:text-blackish-lighten hover:underline capitalize flex items-center text-2xl font-semibold '>
                            <LucideGroup className='mr-2' />
                            {collection.name}
                        </Link>
                        {
                            isOwner || role == 'Admin' &&
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <IconButton><MoreVert /></IconButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side='bottom' >
                                    <DropdownMenuItem className='cursor-pointer flex gap-x-1' onClick={handleOpenUpdateModal} >
                                        <Edit />Update
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className='cursor-pointer flex gap-x-1' onClick={handleOpenDeleteModal} >
                                        <DeleteIcon />Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        }
                    </div>
                    <p className="text-cool-gray-dark max-lines-10">
                        {collection.description.charAt(0).toUpperCase() + collection.description.slice(1)}
                    </p>
                    <div className="flex justify-start flex-wrap gap-1">
                        {collection?.language && <span className='text-copper italic hover:underline cursor-pointer lowercase '>#{collection?.language}</span>}
                        {
                            collection?.categories?.map((category, index) => (
                                <span key={index} className='text-muted-foreground italic hover:underline cursor-pointer lowercase '>#{category}</span>
                            ))
                        }
                    </div>
                </CardContent>
                <CardFooter className='p-4 pt-0' >
                    <Link
                        to={`/collections/${collection._id}`}
                        className="cursor-pointer text-copper hover:text-copper-dark hover:underline transition-colors duration-300"
                    >
                        View Collection
                    </Link>
                </CardFooter>
            </Card>
        </>
    );
};

export default CollectionCard;


CollectionCard.Skeleton = function () {
    return (
        <div className={`w-full animate-pulse flex flex-col justify-between p-4 border rounded shadow-lg bg-light-gray`}>
            <div className="flex justify-between items-center">
                <div className="text-blackish w-full flex items-center ">
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