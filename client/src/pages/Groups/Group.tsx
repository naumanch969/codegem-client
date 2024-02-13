import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'; // Import necessary routing components
import { Group as GroupIcon, Person, Code as CodeIcon, ExitToApp, Edit, Delete as DeleteIcon, DeleteForever, Add, UpdateOutlined, DeleteForeverSharp, MoreVert } from '@mui/icons-material';
import { Loader, Path } from '../../utils/Components';
import { Group, User } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { createGroupChallenge, createGroupCode, createGroupStreak, getGroup, getGroupChallenges, getGroupCodes, getGroupStreaks, joinGroup, leaveGroup } from '../../redux/actions/group';
import { getGroupReducer } from '../../redux/reducers/group';
import Update from './Update';
import Delete from './Delete';
import { IconButton, Tooltip } from '@mui/material';
import CodeCreateModal from '../Codes/Create';
import StreakCreateModal from '../Streak/Create';
import ChallengeCreateModal from '../Challenge/Create';
import ChallengeComponent from '../Challenge/Challenge';
import StreakComponent from '../Streak/Streak';
import CodeComponent from '../Codes/Code';
import { useGroupModal } from '../../hooks/useGroupModal';
import { useCodeModal } from '../../hooks/useCodeModal';
import { useStreakModal } from '../../hooks/useStreakModal';
import { useChallengeModal } from '../../hooks/useChallengeModal';


const SingleGroup = () => {

    ////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { groupId } = useParams(); // Get the groupId parameter from the URL
    const { currentGroup, isFetching }: { currentGroup: Group | null, isFetching: boolean } = useSelector((state: RootState) => state.group)
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)
    const isJoined = currentGroup?.members?.findIndex(memberId => memberId == loggedUser?._id) != -1
    const isAdmin = (currentGroup?.admin as User)?._id?.toString() == loggedUser?._id?.toString()
    const { onSetGroup, onOpen, onClose } = useGroupModal()
    const { onOpen: onCodeOpen } = useCodeModal()
    const { onOpen: onStreakOpen } = useStreakModal()
    const { onOpen: onChallengeOpen } = useChallengeModal()
    const groupName = (currentGroup?.name ? currentGroup.name.charAt(0).toUpperCase() + currentGroup.name.slice(1).toLowerCase() : '');
    const segments = [
        { name: 'Home', link: '/home' },
        { name: 'Groups', link: '/groups' },
        { name: groupName, link: `/groups/${currentGroup?._id}` },
    ];
    const menuItems = [
        'Codes',
        'Streaks',
        'Challenges',
    ];
    //////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [activeMenuItem, setActiveMenuItem] = useState<'codes' | 'streaks' | 'challenges'>('codes')
    const [loading, setLoading] = useState<boolean>(false)

    //////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getGroup(groupId as string))
    }, [groupId])
    useEffect(() => {
        if (activeMenuItem == 'codes') {
            const isLoading = currentGroup?.codes?.every(c => typeof c === 'string');      // if codes are not populated
            const action = isLoading ? getGroupCodes(groupId as string, setLoading) : getGroupCodes(groupId as string);
            dispatch<any>(action);
        }
        else if (activeMenuItem == 'streaks') {
            const isLoading = currentGroup?.streaks?.every(s => typeof s === 'string');    // if streaks are not populated
            const action = isLoading ? getGroupStreaks(groupId as string, setLoading) : getGroupStreaks(groupId as string);
            dispatch<any>(action);
        }
        else {
            const isLoading = currentGroup?.challenges?.every(c => typeof c === 'string'); // if challenges are not populated
            const action = isLoading ? getGroupChallenges(groupId as string, setLoading) : getGroupChallenges(groupId as string);
            dispatch<any>(action);
        }
    }, [activeMenuItem])

    //////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////
    const handleJoinGroup = () => {
        dispatch<any>(joinGroup(groupId as string, loggedUser?._id as string))
    }
    const handleLeaveGroup = () => {
        dispatch<any>(leaveGroup(groupId as string, loggedUser?._id as string))
    }
    const handleOpenUpdateModal = () => {
        if (!currentGroup) return
        onSetGroup(currentGroup as Group)
        onOpen()
        setShowMenu(false)
    }
    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true)
        setShowMenu(false)
    }
    const handleCreateCode = (codeData: any) => {
        dispatch<any>(createGroupCode(groupId!, codeData, onClose))
    }
    const handleCreateStreak = (streakData: any) => {
        dispatch<any>(createGroupStreak(groupId!, streakData, onClose))
    }
    const handleCreateChallenge = (challengeData: any) => {
        dispatch<any>(createGroupChallenge(groupId!, challengeData, onClose))
    }
    const handleOpen = () => {
        if (activeMenuItem == 'codes') {
            onCodeOpen()
        }
        else if (activeMenuItem == 'streaks') {
            onStreakOpen()
        }
        else {
            onChallengeOpen()
        }
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

            {activeMenuItem == 'codes' && <CodeCreateModal handleSubmit={handleCreateCode} />}
            {activeMenuItem == 'streaks' && <StreakCreateModal handleSubmit={handleCreateStreak} />}
            {activeMenuItem == 'challenges' && <ChallengeCreateModal handleSubmit={handleCreateChallenge} />}

            <Delete open={openDeleteModal} setOpen={setOpenDeleteModal} />

            {
                isFetching
                    ?
                    <div className="flex justify-center items-center w-full h-full">
                        <Loader />
                    </div>
                    :
                    <div className='flex flex-col gap-4' >
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
                                <p className="text-gray-500">{currentGroup?.shares?.length} Codes Shared</p>
                            </div>
                            <Tooltip placement='top-start' title='Admin' >
                                <div className="flex items-center mb-4">
                                    <Person className="text-gray-500 mr-2" />
                                    <p className="text-teal-blue capitalize ">{(currentGroup?.admin as User)?.firstName} {(currentGroup?.admin as User)?.lastName}</p>
                                </div>
                            </Tooltip>
                            <Tooltip placement='top-start' title='Technologies' >
                                <div className="flex items-center mb-4">
                                    <CodeIcon className="text-gray-500 mr-2" />
                                    <p className="text-teal-blue capitalize italic cursor-pointer ">{currentGroup?.categories.join(', ')}</p>
                                </div>
                            </Tooltip>
                            <Tooltip placement='top-start' title='Status' >
                                <div className="flex items-center mb-4">
                                    <GroupIcon className="text-gray-500 mr-2" />
                                    <p className="text-teal-blue">Online</p>
                                </div>
                            </Tooltip>
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

                        {/* MENU */}
                        <div className="relative">
                            <div className="flex justify-center ">
                                <div className="bg-white shadow-md rounded-lg flex overflow-hidden">
                                    {menuItems.map(item => (
                                        <button
                                            key={item}
                                            className={`py-2 px-4 ${activeMenuItem.toLowerCase() === item.toLowerCase()
                                                ? 'bg-teal-blue text-white'
                                                : 'text-cool-gray'
                                                } hover:bg-teal-blue-lighten hover:text-white transition-all duration-200 focus:outline-none`}
                                            onClick={() => setActiveMenuItem(item.toLowerCase() as 'codes' | 'streaks' | 'challenges')}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={handleOpen}
                                className="absolute top-0 right-4 flex justify-center items-center gap-1 bg-teal-blue hover:bg-teal-blue-lighten text-white py-2 px-2 rounded-lg shadow-md capitalize "
                            >
                                <Add /> Add {activeMenuItem.slice(0, -1)}
                            </button>
                        </div>



                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {
                                loading ?
                                    <div className="w-full h-full col-span-2 flex justify-center items-center ">
                                        <Loader />
                                    </div>
                                    :
                                    <>
                                        {/* {[...(currentGroup?.codes || []), ...(currentGroup?.shares.map(codeObj => codeObj.code) || [])].map((code, index) => (
                                            <Code key={index} code={code} />
                                        ))} */}
                                        <>
                                            {
                                                activeMenuItem == 'codes'
                                                &&
                                                <>
                                                    {
                                                        currentGroup?.codes?.length == 0
                                                            ?
                                                            <div className="w-full h-full flex justify-center items-center col-span-2 ">
                                                                <span>No Codes to Show.</span>
                                                            </div>
                                                            :
                                                            <>
                                                                {currentGroup?.codes?.map((code, index) => (
                                                                    <CodeComponent code={code} key={index} />
                                                                ))}
                                                            </>
                                                    }
                                                </>
                                            }
                                            {
                                                activeMenuItem == 'streaks'
                                                &&
                                                <>
                                                    {
                                                        currentGroup?.streaks?.length == 0
                                                            ?
                                                            <div className="w-full h-full flex justify-center items-center col-span-2 ">
                                                                <span>No Streaks to Show.</span>
                                                            </div>
                                                            :
                                                            <>
                                                                {currentGroup?.streaks?.map((streak, index) => (
                                                                    <StreakComponent streak={streak} key={index} />
                                                                ))}
                                                            </>
                                                    }
                                                </>
                                            }
                                            {
                                                activeMenuItem == 'challenges'
                                                &&
                                                <>
                                                    {
                                                        currentGroup?.challenges?.length == 0
                                                            ?
                                                            <div className="w-full h-full flex justify-center items-center col-span-2 ">
                                                                <span>No Challenges to Show.</span>
                                                            </div>
                                                            :
                                                            <>
                                                                {currentGroup?.challenges?.map((challenge, index) => (
                                                                    <ChallengeComponent challenge={challenge} key={index} />
                                                                ))}
                                                            </>
                                                    }
                                                </>
                                            }
                                        </>
                                    </>
                            }
                        </div>
                    </div>
            }

        </div>
    );
};

export default SingleGroup;
