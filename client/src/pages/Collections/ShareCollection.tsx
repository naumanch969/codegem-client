import React, { useState, useEffect } from 'react';
import { Close, } from '@mui/icons-material';
import { IconButton, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getFriends } from '../../redux/actions/friend';
import { Facebook, Instagram, Linkedin, Twitter, Whatsapp } from '../../assets';
import { shareCollection, shareCollectionInGroups } from '../../redux/actions/collection';
import { Collection, Group, User } from '../../interfaces';
import { getGroups } from '../../redux/actions/group';



const ShareCollection = ({ open, setOpen, collection }: { open: boolean, setOpen: any, collection: Collection }) => {

    /////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { friends }: { friends: User[] } = useSelector((state: RootState) => state.friend)
    const { groups }: { groups: Group[] } = useSelector((state: RootState) => state.group)
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)
    const { isFetching }: { isFetching: boolean } = useSelector((state: RootState) => state.collection)
    const joinedGroups = groups.filter(group => group.members.findIndex(memberId => memberId === loggedUser?._id) != -1);
    /////////////////////////////////////////////// STATES ///////////////////////////////////////////////////
    const [selectedFriends, setSelectedFriends] = useState<string[]>([])
    const [selectedGroups, setSelectedGroups] = useState<string[]>([])
    const [type, setType] = useState<string>('friend')

    /////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getFriends(friends.length == 0))
        dispatch<any>(getGroups(groups.length == 0))
    }, [])

    /////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////
    const handleToggleFriend = (friendId: string) => {
        selectedFriends.includes(friendId)
            ?
            setSelectedFriends((pre) => pre.filter((f) => f != friendId))
            :
            setSelectedFriends((pre) => [...pre, friendId])
    }
    const handleToggleGroup = (groupId: string) => {
        selectedGroups.includes(groupId)
            ?
            setSelectedGroups((pre) => pre.filter((g) => g != groupId))
            :
            setSelectedGroups((pre) => [...pre, groupId])
    }
    const handleShare = () => {
        if (type == 'friend') {
            if (selectedFriends.length == 0) return alert('Please select someone to share post.')
            dispatch<any>(shareCollection(collection, selectedFriends, setOpen))
        }
        else {
            if (selectedGroups.length == 0) return alert('Please select someone to share post.')
            dispatch<any>(shareCollectionInGroups(collection, selectedGroups, loggedUser?._id as string, setOpen))
        }
    }

    /////////////////////////////////////////////// COMPONENTS ///////////////////////////////////////////////////
    const Friend = ({ friend }: { friend: User }) => (
        <li onClick={() => handleToggleFriend(friend?._id!)} className={`${selectedFriends.includes(friend?._id!) ? 'bg-gray-100 ' : ''} flex gap-2 items-center mb-4 hover:bg-gray-100 rounded-md p-1 cursor-pointer`}>
            <div className="w-10 flex items-center rounded-full overflow-hidden">
                {friend.profilePicture ? (
                    <img
                        src={friend.profilePicture as string}
                        alt={friend.username}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="w-10 h-10 rounded-full bg-teal-blue text-white text-lg capitalize flex items-center justify-center">
                        {friend.username.charAt(0)}
                    </span>
                )}
            </div>
            <div className="">
                <p className="text-teal-blue font-medium capitalize">
                    {friend.username}
                </p>
                <p className="text-cool-gray text-sm">
                    {friend.email}
                </p>
            </div>
        </li>

    )
    const GroupCard = ({ group }: { group: Group }) => (
        <li onClick={() => handleToggleGroup(group?._id as string)} className={`${selectedGroups.includes(group?._id as string) ? 'bg-gray-100 ' : ''} flex gap-2 items-center mb-4 hover:bg-gray-100 rounded-md p-1 cursor-pointer`}>
            <div className="w-10 flex items-center rounded-full overflow-hidden">
                {group.avatar ? (
                    <img
                        src={group.avatar}
                        alt={group.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="w-10 h-10 rounded-full bg-teal-blue text-white text-lg capitalize flex items-center justify-center">
                        {group.name.charAt(0)}
                    </span>
                )}
            </div>
            <div className="">
                <p className="text-teal-blue font-medium capitalize">
                    {group.name}
                </p>
                <p className="text-cool-gray text-sm">
                    {group.members.length} Members
                </p>
            </div>
        </li>

    )

    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)} className='flex justify-center items-center ' >
                <div className='bg-white md:w-[30rem] sm:w-[60vw] flex flex-col justify-between w-full min-h-[20rem] h-fit max-h-[90vh] overflow-y-scroll rounded-[8px] p-[1rem] ' >

                    <div className="flex flex-col">
                        <div className='w-full relative flex justify-between items-center pb-[12px] ' >
                            <h4 className='text-[22px] font-bold text-dark-slate-blue ' >Share Collection</h4>
                            <IconButton onClick={() => setOpen(false)} className='w-8 h-8 rounded-full bg-transparent ' ><Close className='text-cool-gray' /></IconButton>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/* social shares */}
                            <div className="flex justify-start items-center gap-4 p-2 bg-cool-gray-light rounded-md ">
                                <button className='flex justify-center items-center ' ><img src={Whatsapp} className='object-cover rounded-full w-8 h-8 ' /></button>
                                <button className='flex justify-center items-center ' ><img src={Facebook} className='object-cover rounded-full w-8 h-8 ' /></button>
                                <button className='flex justify-center items-center ' ><img src={Linkedin} className='object-cover rounded-full w-8 h-8 ' /></button>
                                <button className='flex justify-center items-center ' ><img src={Instagram} className='object-cover rounded-full w-8 h-8 ' /></button>
                                <button className='flex justify-center items-center ' ><img src={Twitter} className='object-cover rounded-full w-8 h-8 ' /></button>
                            </div>

                            <div className="flex flex-col gap-4 ">
                                <div className="w-full flex justify-start items-center gap-[1.5rem] border-b-[1px] border-teal-blue  ">
                                    <button onClick={() => setType('friend')} className={` w-[49%] transition-all ${type == 'friend' ? "bg-teal-blue text-white py-[4px] px-[14px] rounded-t-[4px]  " : "text-dark-slate-blue-lighten "}  `}>
                                        Friends
                                    </button>
                                    <button onClick={() => setType('group')} className={` w-[49%] transition-all ${type == 'group' ? "bg-teal-blue text-white py-[4px] px-[14px] rounded-t-[4px]  " : "text-dark-slate-blue-lighten "}  `}>
                                        Groups
                                    </button>
                                </div>
                                {/* friends */}
                                <ul>
                                    {
                                        type == 'friend'
                                            ?
                                            <>
                                                {friends.map((friend, index) => (
                                                    <Friend friend={friend} key={index} />
                                                ))}
                                            </>
                                            :
                                            <>
                                                {joinedGroups.map((group, index) => (
                                                    <GroupCard group={group} key={index} />
                                                ))}
                                            </>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end items-center">
                        <button onClick={handleShare} className={` ${selectedFriends.length == 0 ? 'cursor-not-allowed ' : 'cursor-pointer '}  w-[6rem] rounded-[4px] p-[4px] bg-teal-blue text-white font-medium text-[18px] `} >
                            {isFetching ? 'Sharing' : 'Share'}
                        </button>
                    </div>

                </div>
            </Modal>
        </>
    )
}

export default ShareCollection