import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'; // Import necessary routing components
import Code from '../Codes/Code';
import { Group as GroupIcon, Person, Code as CodeIcon, ExitToApp, Edit, Delete as DeleteIcon, DeleteForever, Add, UpdateOutlined, DeleteForeverSharp, MoreVert } from '@mui/icons-material';
import { Path } from '../../utils/Components';
import { Group, User } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getGroup, joinGroup, leaveGroup } from '../../redux/actions/group';
import { getGroupReducer } from '../../redux/reducers/group';
import Update from './Update';
import Delete from './Delete';
import { IconButton, Tooltip } from '@mui/material';
import CreateCode from '../Codes/Create';
import { useStateContext } from '../../contexts/ContextProvider';


const SingleGroup = () => {

    ////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { groupId } = useParams(); // Get the groupId parameter from the URL
    const { currentGroup }: { currentGroup: Group | null } = useSelector((state: RootState) => state.group)
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)
    const { setShowCodeCreateModal } = useStateContext();
    const isJoined = currentGroup?.members?.findIndex(memberId => memberId == loggedUser?._id) != -1
    const isAdmin = (currentGroup?.admin as User)?._id?.toString() == loggedUser?._id?.toString()
    const groupName = (
        currentGroup?.name ? currentGroup.name.charAt(0).toUpperCase() + currentGroup.name.slice(1).toLowerCase() : ''
    );
    const segments = [
        { name: 'Home', link: '/home' },
        { name: 'Groups', link: '/groups' },
        { name: groupName, link: `/groups/${currentGroup?._id}` },
    ];

    //////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    //////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getGroup(groupId as string))
    }, [])
    //////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////
    const handleJoinGroup = () => {
        dispatch<any>(joinGroup(groupId as string, loggedUser?._id as string))
    }
    const handleLeaveGroup = () => {
        dispatch<any>(leaveGroup(groupId as string, loggedUser?._id as string))
    }
    const handleOpenUpdateModal = () => {
        setOpenUpdateModal(true)
        setShowMenu(false)
    }
    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true)
        setShowMenu(false)
    }
    /////////////////////////////////////// COMPONENTS ////////////////////////////////////////
    const Menu = () => (
        <motion.div animate={{ x: [100, 0], opacity: [0, 1] }} className="absolute z-[50] shadow-box top-[3rem] items-start right-0 w-[15rem] h-auto flex flex-col gap-[4px] p-[8px] border-[2px] bg-white text-dark-slate-blue border-warm-gray-dark rounded-[4px]">
            <button onClick={handleOpenUpdateModal} className="w-full flex hover:bg-cool-gray-light hover:text-teal-blue p-[6px] rounded-[6px] gap-2"><UpdateOutlined /><span className="">Update</span></button>
            <button onClick={handleOpenDeleteModal} className="w-full flex hover:bg-cool-gray-light hover:text-teal-blue p-[6px] rounded-[6px] gap-2"><DeleteForeverSharp /><span className="">Delete</span></button>
        </motion.div>
    );

    return (
        <div className="container mx-auto p-4">

            <CreateCode groupId={currentGroup?._id as string} />
            <Update open={openUpdateModal} setOpen={setOpenUpdateModal} />
            <Delete open={openDeleteModal} setOpen={setOpenDeleteModal} />

            <Path segments={segments} />

            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-">
                    <h1 className="text-3xl font-bold mb-4 capitalize ">{currentGroup?.name}</h1>
                    {
                        isAdmin &&
                        <div className="relative">
                            <IconButton onClick={() => setShowMenu(prev => !prev)} className="bg-teal-blue cursor-pointer capitalize text-black"><MoreVert /></IconButton>
                            {showMenu && <Menu />}
                        </div>
                    }
                </div>
                <p className="text-gray-600 mb-4">{currentGroup?.description}</p>
                <div className="flex items-center mb-4">
                    <p className="text-teal-blue mr-2">{currentGroup?.members.length} Members</p>
                    <p className="text-gray-500">{currentGroup?.sharedCodes?.length} Codes Shared</p>
                </div>
                <div className="flex items-center mb-4">
                    <Person className="text-gray-500 mr-2" />
                    <p className="text-teal-blue capitalize ">{(currentGroup?.admin as User)?.firstName} {(currentGroup?.admin as User)?.lastName}</p>
                </div>
                <div className="flex items-center mb-4">
                    <CodeIcon className="text-gray-500 mr-2" />
                    <p className="text-teal-blue capitalize italic cursor-pointer ">{currentGroup?.categories.join(', ')}</p>
                </div>
                <div className="flex items-center mb-4">
                    <GroupIcon className="text-gray-500 mr-2" />
                    <p className="text-teal-blue">Online</p>
                </div>
                <div className="flex items-center mb-4">
                    <p className="text-gray-500 mr-2">Established:</p>
                    <p className="text-teal-blue">{new Date(currentGroup?.createdAt as Date).getFullYear()}</p>
                </div>
                <div className="flex justify-between items-center">
                    {isJoined ? (
                        <button onClick={handleLeaveGroup} className="px-4 py-2 bg-teal-blue text-white rounded-lg hover:bg-teal-blue-dark">
                            Leave Group <ExitToApp className="ml-1" />
                        </button>
                    ) : (
                        <button onClick={handleJoinGroup} className="px-4 py-2 bg-teal-blue text-white rounded-lg hover:bg-teal-blue-dark">
                            Join Group
                        </button>
                    )}
                </div>
            </div>


            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold mt-8 mb-4">Group Posts</h2>
                <Tooltip title="Create Group" placement="top">
                    <button
                        onClick={() => setShowCodeCreateModal(true)}
                        className="bg-teal-blue text-white rounded-full px-3 py-3 hover:bg-teal-blue-dark transition-colors duration-300 flex items-center"
                    >
                        <Add />
                    </button>
                </Tooltip>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...(currentGroup?.codes || []), ...(currentGroup?.sharedCodes.map(codeObj => codeObj.code) || [])].map((code, index) => (
                    <Code key={index} code={code} />
                ))}
            </div>

        </div>
    );
};

export default SingleGroup;
