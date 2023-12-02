import React, { ChangeEvent, useState } from 'react';
import { Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createCollection } from '../../redux/actions/collection';
import { RootState } from '../../redux/store';
import { Close, Lock, ArrowDropDown } from '@mui/icons-material';
import { Avatar } from '../../utils/Components';
import { image6 } from '../../assets';
import { User } from '../../interfaces';

const CreateCollection = ({ open, setOpen }: { open: boolean, setOpen: any }) => {

    ///////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////
    const dispatch = useDispatch();
    const { loggedUser: user, isFetching }: { loggedUser: User | null, isFetching: boolean } = useSelector((state: RootState) => state.user);
    const menu = [
        'private',
        'public',
        'friends only',
        'all friends except',
        'only share with',
    ];

    const initialCollection = {
        name: '',
        description: '',
        visibility: 'private',
    };

    ///////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////
    const [collectionData, setCollectionData] = useState(initialCollection);
    const [showVisibilityMenu, setShowVisibilityMenu] = useState(false);

    ///////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////
    const handleCreate = () => {
        const { name, description } = collectionData
        if (!name || !description) return alert('Make sure to provide all the fields.')
        dispatch<any>(createCollection(collectionData, setOpen));
        setCollectionData(initialCollection)
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setCollectionData(pre => ({ ...pre, [e.target.name]: e.target.value }));
    };



    return (
        <Modal open={open} onClose={() => setOpen(false)} className='flex justify-center items-center '>
            <div className='bg-white w-[35rem] min-h-[20rem] h-fit max-h-[90vh] overflow-y-scroll rounded-[8px] p-[1rem] ' >

                <div className='h-[12%] relative flex justify-center items-center pb-[12px] ' >
                    <h4 className='text-[22px] font-bold text-dark-slate-blue ' >Create Collection</h4>
                    <button onClick={() => setOpen(false)} className='absolute right-0 w-[2rem] h-[2rem] rounded-full bg-transparent ' ><Close className='text-cool-gray' /></button>
                </div>

                <hr className='h-[2px] w-full py-[12px] text-warm-gray  ' />

                <div className='min-h-[82%] h-auto flex flex-col justify-between gap-[8px] ' >

                    {/* avatar */}
                    <div className='flex gap-[1rem] ' >
                        <Avatar src={image6} />
                        <div className='flex flex-col ' >
                            <p className='font-semibold text-dark-slate-blue capitalize ' >{user?.firstName} {user?.lastName}</p>
                            <div className='relative flex flex-col justify-center items-start gap-[4px] cursor-pointer rounded-t-[4px] min-w-[9rem] bg-gray-100 ' >

                                <button onClick={() => setShowVisibilityMenu(pre => !pre)} className='w-full flex justify-between items-center p-[2px] ' >
                                    <span className="flex justify-start gap-[2px] capitalize " >
                                        <Lock style={{ fontSize: '16px' }} className='text-[16px] ' />
                                        <span className='text-[12px] font-medium ' >{collectionData.visibility}</span>
                                    </span>
                                    <ArrowDropDown />
                                </button>
                                {
                                    showVisibilityMenu &&
                                    <div className='w-full absolute top-full bg-white shadow-box flex flex-col items-start gap-[4px] rounded-b-[4px] ' >
                                        {
                                            menu.filter(m => m != collectionData.visibility).map((item, index) => (
                                                <button key={index} onClick={() => { setShowVisibilityMenu(false); setCollectionData({ ...collectionData, visibility: item }) }} className='w-full gap-[2px] text-start hover:bg-teal-blue-lighten hover:text-white text-cool-gray capitalize p-[2px] ' >
                                                    <Lock style={{ fontSize: '16px' }} className='text-[16px] ' />
                                                    <span className='text-[12px] font-medium ' >{item}</span>
                                                </button>
                                            ))
                                        }
                                    </div>
                                }

                            </div>
                        </div>
                    </div>



                    <div className='flex flex-col gap-[8px] ' >
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2 ">
                                <label htmlFor="name" className='flex-[1] text-cool-gray ' >Name<span className='text-[18px] text-teal-blue-darken ' >*</span> :</label>
                                <input
                                    name='name'
                                    placeholder='Name..'
                                    value={collectionData.name}
                                    onChange={(e) => handleChange(e)}
                                    className={`h-[40px] px-[4px] py-[2px] flex w-full outline-cool-gray bg-light-gray text-cool-gray border-cool-gray border-[1px] resize-none text-[16px] rounded-[4px] `}
                                />
                            </div>
                            <div className="flex flex-col gap-2 ">
                                <label htmlFor="description" className='flex-[1] text-cool-gray ' >Description<span className='text-[18px] text-teal-blue-darken ' >*</span> :</label>
                                <textarea
                                    rows={4}
                                    name='description'
                                    placeholder='Write a short description of the collection?....'
                                    value={collectionData.description}
                                    onChange={(e) => handleChange(e)}
                                    className={` px-[4px] py-[2px] flex w-full outline-cool-gray bg-light-gray text-cool-gray border-cool-gray border-[1px] resize-none text-[16px] rounded-[4px] `}
                                />
                            </div>
                        </div>

                        {/* buttons */}
                        <div className='flex flex-col gap-[8px] ' >
                            {/* collection button */}
                            <div className='flex justify-end ' >
                                <button onClick={handleCreate} disabled={!collectionData.name} className={` ${!collectionData.name ? 'cursor-not-allowed ' : 'cursor-pointer '}  w-[6rem] rounded-[4px] p-[4px] bg-teal-blue text-white font-medium text-[18px] `} >
                                    {isFetching ? 'Creating...' : 'Create'}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </Modal>
    );
};

export default CreateCollection;
