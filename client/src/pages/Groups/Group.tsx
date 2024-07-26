import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'; // Import necessary routing components
import { Group as GroupIcon, Person, Code as CodeIcon, ExitToApp, Edit, Delete as DeleteIcon, DeleteForever, Add, UpdateOutlined, DeleteForeverSharp, MoreVert, Update, Category, Language } from '@mui/icons-material';
import { Loader, Path } from '../../utils/Components';
import { Group, User } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { createGroupChallenge, createGroupCode, createGroupStreak, getGroup, getGroupChallenges, getGroupCodes, getGroupStreaks, joinGroup, leaveGroup } from '../../redux/actions/group';
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Empty } from '@/utils/Components/Empty';

const SingleGroup = () => {

    ////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { groupId } = useParams(); // Get the groupId parameter from the URL
    const { currentGroup, isFetching }: { currentGroup: Group | null, isFetching: boolean } = useSelector((state: RootState) => state.group)
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)
    const isJoined = currentGroup?.members?.findIndex(memberId => memberId == loggedUser?._id) != -1
    const isAdmin = (currentGroup?.admin as User)?._id?.toString() == loggedUser?._id?.toString()
    const { onSetGroup, onOpen, onClose } = useGroupModal()
    const { onOpen: onCodeOpen, onSetCode, onSetCollectionId: onSetCollectionIdForCode, onSetGroupId: onSetGroupIdForCode } = useCodeModal()
    const { onOpen: onStreakOpen, onSetStreak, onSetCollectionId: onSetCollectionIdForStreak, onSetGroupId: onSetGroupIdForStreak } = useStreakModal()
    const { onOpen: onChallengeOpen, onSetChallenge, onSetCollectionId: onSetCollectionIdForChallenge, onSetGroupId: onSetGroupIdForChallenge } = useChallengeModal()
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
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
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
    const onOpenUpdateModal = () => {
        if (!currentGroup) return
        onSetGroup(currentGroup as Group)
        onOpen()
    }
    const onOpenDeleteModal = () => {
        setOpenDeleteModal(true)
    } 
    const handleOpen = () => {
        if (activeMenuItem == 'codes') {
            onSetCode(null)
            onSetGroupIdForCode(groupId!)
            onSetCollectionIdForCode('')
            onCodeOpen()
        }
        else if (activeMenuItem == 'streaks') {
            onSetStreak(null)
            onSetCollectionIdForStreak('')
            onSetGroupIdForStreak(groupId!)
            onStreakOpen()
        }
        else {
            onSetChallenge(null)
            onSetCollectionIdForChallenge('')
            onSetGroupIdForChallenge(groupId!)
            onChallengeOpen()
        }
    }

    return (
        <div className="container mx-auto p-4">

            {activeMenuItem == 'codes' && <CodeCreateModal />}
            {activeMenuItem == 'streaks' && <StreakCreateModal />}
            {activeMenuItem == 'challenges' && <ChallengeCreateModal />}

            <Delete open={openDeleteModal} setOpen={setOpenDeleteModal} />
            {
                isFetching
                    ?
                    <SingleGroup.Skeleton />
                    :
                    <div className='flex flex-col gap-4' >
                        <Path segments={segments} />

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-">
                                <h1 className="text-3xl font-bold mb-4 capitalize ">{currentGroup?.name}</h1>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <IconButton><MoreVert /></IconButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side='bottom' >
                                        <DropdownMenuItem onClick={handleLeaveGroup} className='cursor-pointer flex gap-x-1' >
                                            <ExitToApp /> Leave Group
                                        </DropdownMenuItem>
                                        {
                                            isAdmin &&
                                            <>
                                                <DropdownMenuItem className='cursor-pointer flex gap-x-1' onClick={onOpenUpdateModal} >
                                                    <Edit /> Update
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className='cursor-pointer flex gap-x-1' onClick={onOpenDeleteModal} >
                                                    <DeleteIcon /> Delete
                                                </DropdownMenuItem>
                                            </>
                                        }
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <p className="text-gray-600 mb-4">{currentGroup?.description?.charAt(0)?.toUpperCase()! + currentGroup?.description?.slice(1)!}</p>
                            <div className="flex items-center mb-4">
                                <p className="text-copper mr-2">{currentGroup?.members.length} Members</p>
                                <p className="text-gray-500">{currentGroup?.shares?.length} Codes Shared</p>
                            </div>
                            <Tooltip placement='top-start' title='Admin' >
                                <div className="flex items-center mb-4">
                                    <Person className="text-gray-500 mr-2" />
                                    <p className="text-copper capitalize ">{(currentGroup?.admin as User)?.firstName} {(currentGroup?.admin as User)?.lastName}</p>
                                </div>
                            </Tooltip>
                            <Tooltip placement='top-start' title='Categories' >
                                <div className="flex items-center mb-4">
                                    <Category className="text-gray-500 mr-2" />
                                    <p className="text-copper capitalize italic cursor-pointer ">{currentGroup?.categories.join(', ')}</p>
                                </div>
                            </Tooltip>
                            <Tooltip placement='top-start' title='Programming Languages' >
                                <div className="flex items-center mb-4">
                                    <CodeIcon className="text-gray-500 mr-2" />
                                    <p className="text-copper capitalize italic cursor-pointer ">{currentGroup?.languages.join(', ')}</p>
                                </div>
                            </Tooltip>
                            <div className="flex items-center mb-4">
                                <p className="text-gray-500 mr-2">Established:</p>
                                <p className="text-copper">{new Date(currentGroup?.createdAt as Date).getFullYear()}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                {!isJoined &&
                                    <button onClick={handleJoinGroup} className="px-4 py-2 bg-copper text-white rounded-lg hover:bg-copper-dark">
                                        Join Group
                                    </button>
                                }
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
                                                ? 'bg-copper text-white'
                                                : 'text-cool-gray'
                                                } hover:bg-copper-lighten hover:text-white transition-all duration-200 focus:outline-none`}
                                            onClick={() => setActiveMenuItem(item.toLowerCase() as 'codes' | 'streaks' | 'challenges')}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <button
                                onClick={handleOpen}
                                className="absolute top-0 right-4 flex justify-center items-center gap-1 bg-copper hover:bg-copper-lighten text-white py-2 px-2 rounded-lg shadow-md capitalize "
                            >
                                <Add /> Add {activeMenuItem.slice(0, -1)}
                            </button>
                        </div>


                        <div className="w-full flex justify-center">
                            <div className="lg:w-full pt-1 px-3 w-full flex flex-col items-center gap-4 h-full">
                                {
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
                                                        loading
                                                            ?
                                                            Array(5).fill('').map((_, index) => (
                                                                <CodeComponent.Skeleton key={index} />
                                                            ))
                                                            :
                                                            <>
                                                                {
                                                                    currentGroup?.codes?.length == 0
                                                                        ?
                                                                        <Empty />
                                                                        :
                                                                        currentGroup?.codes?.map((code, index) => (
                                                                            <CodeComponent code={code} key={index} />
                                                                        ))
                                                                }
                                                            </>
                                                    }
                                                </>
                                            }
                                            {
                                                activeMenuItem == 'streaks'
                                                &&
                                                <>
                                                    {
                                                        loading
                                                            ?
                                                            Array(5).fill('').map((_, index) => (
                                                                <StreakComponent.Skeleton key={index} />
                                                            ))
                                                            :
                                                            <>
                                                                {
                                                                    currentGroup?.streaks?.length == 0
                                                                        ?
                                                                        <Empty />
                                                                        :
                                                                        <>
                                                                            {currentGroup?.streaks?.map((streak, index) => (
                                                                                <StreakComponent streak={streak} key={index} />
                                                                            ))}
                                                                        </>
                                                                }
                                                            </>
                                                    }
                                                </>
                                            }
                                            {
                                                activeMenuItem == 'challenges'
                                                &&
                                                <>
                                                    {
                                                        loading
                                                            ?
                                                            Array(5).fill('').map((_, index) => (
                                                                <ChallengeComponent.Skeleton key={index} />
                                                            ))
                                                            :
                                                            <>
                                                                {
                                                                    currentGroup?.challenges?.length == 0
                                                                        ?
                                                                        <Empty />
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
                                            }
                                        </>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
            }

        </div>
    );
};

export default SingleGroup;

SingleGroup.Skeleton = function () {
    return (
        <div className='w-full flex flex-col gap-4 p-4 bg-white text-cool-gray-dark rounded-[6px] animate-pulse '>

            <div className='w-full h-[340px] flex flex-col gap-4 p-4 bg-light-gray text-cool-gray-dark rounded-[6px]'>
                <span className='w-full h-5 rounded bg-warm-gray-dark' />
                <span className='w-3/4 h-5 rounded bg-warm-gray-dark' />
                <span className='w-1/2 h-4 rounded bg-warm-gray-dark' />
                <span className='w-full h-5 rounded bg-warm-gray-dark' />
                <span className='w-2/3 h-4 rounded bg-warm-gray-dark' />
                <span className='w-full h-5 rounded bg-warm-gray-dark' />
                <span className='w-full h-5 rounded bg-warm-gray-dark' />
                <span className='w-1/3 h-4 rounded bg-warm-gray-dark' />
                <span className='w-1/4 h-4 rounded bg-warm-gray-dark' />
            </div>

            <div className='w-full h-fit flex justify-center items-center gap-4 p-4 bg-light-gray text-cool-gray-dark rounded-[6px]'>
                <span className='w-20 h-8 rounded-md bg-warm-gray-dark' />
                <span className='w-20 h-8 rounded-md bg-warm-gray-dark' />
                <span className='w-20 h-8 rounded-md bg-warm-gray-dark' />
            </div>

            <div className="w-full flex justify-center">
                <div className="lg:w-full pt-1 px-3 w-full flex flex-col items-center gap-2 h-full">
                    {Array(5).fill('').map((_, index) => (
                        <CodeComponent.Skeleton />
                    ))}
                </div>
            </div>

        </div>
    )
}