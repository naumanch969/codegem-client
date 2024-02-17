import React, { ChangeEvent, useEffect, useState } from 'react';
import { IconButton, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createCollection, getUserCollections } from '../../redux/actions/collection';
import { saveStreakInCollections } from '../../redux/actions/streak';
import { RootState } from '../../redux/store';
import { Close, Lock, ArrowDropDown } from '@mui/icons-material';
import { Avatar } from '../../utils/Components';
import { image6 } from '../../assets';
import { Streak, Collection, User } from '../../interfaces';

const SaveStreak = ({ open, setOpen, streak }: { open: boolean, setOpen: any, streak: Streak }) => {

    ///////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////
    const dispatch = useDispatch();
    const { loggedUser: user, isFetching }: { loggedUser: User | null, isFetching: boolean } = useSelector((state: RootState) => state.user);
    const { userCollections }: { userCollections: Collection[] } = useSelector((state: RootState) => state.collection);

    ///////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////
    const [selectedCollections, setSelectedCollections] = useState<string[]>([]);

    ///////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getUserCollections(userCollections.length == 0, user?._id as string, `?page=${1}&pageSize=${20}`))
    }, [])

    ///////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////
    const handleSave = () => {
        dispatch<any>(saveStreakInCollections(streak, selectedCollections, setOpen));
        setSelectedCollections([])
    };
    const handleToggleSelectedCollection = (collectionId: string) => {
        if (selectedCollections.includes(collectionId)) {
            setSelectedCollections((pre) => pre.filter(cId => cId != collectionId))
        } else {
            setSelectedCollections((pre) => [...pre, collectionId])
        }
    }



    return (
        <Modal open={open} onClose={() => setOpen(false)} className='flex justify-center items-center '>
            <div className='bg-white w-[35rem] min-h-[20rem] h-fit max-h-[90vh] overflow-y-scroll rounded-[8px] p-[1rem] ' >

                <div className='h-[12%] relative flex justify-center items-center pb-[12px] ' >
                    <h4 className='text-[22px] font-bold text-dark-slate-blue ' >Save Streak</h4>
                    <IconButton onClick={() => setOpen(false)} style={{ position: 'absolute' }} className='absolute right-0 rounded-full bg-transparent ' ><Close className='text-cool-gray' /></IconButton>
                </div>

                <hr className='h-[2px] w-full py-[12px] text-warm-gray  ' />

                <div className='min-h-[82%] h-auto flex flex-col justify-between gap-[8px] ' >

                    {/* avatar */}
                    <div className='flex gap-[1rem] ' >
                        <Avatar src={image6} />
                        <div className='flex flex-col justify-center ' >
                            <p className='font-semibold text-dark-slate-blue capitalize ' >{user?.firstName} {user?.lastName}</p>
                        </div>
                    </div>

                    <div className='flex flex-col flex-wrap gap-[8px] ' >

                        <div className="grid grid-cols-2 gap-4">
                            {userCollections.map((collection, index) => {
                                let disabled = collection.codes.findIndex(c => c._id == streak._id) != -1
                                return (
                                    <button
                                        disabled={disabled}
                                        key={index}
                                        onClick={() => handleToggleSelectedCollection(collection._id)}
                                        className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${selectedCollections.includes(collection._id) ? 'bg-teal-50 border-teal-blue-lighten' : 'border-cool-gray-dark'} cursor-pointer w-full p-2 h-fit border-[2px] rounded-md flex-1 flex flex-col`}
                                    >
                                        <h5 className={`${selectedCollections.includes(collection._id) ? 'text-teal-blue-lighten' : 'text-cool-gray-dark'} font-semibold text-2xl capitalize `}>{collection.name}</h5>
                                        <span className='font-medium text-md text-warm-gray-dark '>{collection.codes.length} Streaks</span>
                                    </button>
                                )
                            })}
                        </div>


                        {/* buttons */}
                        <div className='flex flex-col gap-[8px] ' >
                            {/* collection button */}
                            <div className='flex justify-end ' >
                                <button onClick={handleSave} disabled={selectedCollections.length == 0} className={` ${selectedCollections.length == 0 ? 'cursor-not-allowed ' : 'cursor-pointer '}  w-[6rem] rounded-[4px] p-[4px] bg-teal-blue  text-white font-medium text-[18px] `} >
                                    {isFetching ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </Modal>
    );
};

export default SaveStreak;