import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getFriends } from '../../redux/reducers/friendSlice';
import { shareStreak, shareStreakInGroups } from '../../redux/actions/streak';
import { Streak, Group, User } from '../../interfaces';
import { getGroups } from '../../redux/actions/group';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Modal } from '@/components/ui/modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const ShareStreak = ({ open, setOpen, streak }: { open: boolean, setOpen: any, streak: Streak }) => {

    /////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { friends }: { friends: User[] } = useSelector((state: RootState) => state.friend)
    const { groups }: { groups: Group[] } = useSelector((state: RootState) => state.group)
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)
    const joinedGroups = groups.filter(group => group.members.findIndex(memberId => memberId === loggedUser?._id) != -1);
    /////////////////////////////////////////////// STATES ///////////////////////////////////////////////////
    const [selectedFriends, setSelectedFriends] = useState<string[]>([])
    const [selectedGroups, setSelectedGroups] = useState<string[]>([])
    const [type, setType] = useState<string>('friend')

    /////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getFriends(''))
        dispatch<any>(getGroups(groups.length == 0, ``))
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
            dispatch<any>(shareStreak(streak, selectedFriends, setOpen))
        }
        else {
            if (selectedGroups.length == 0) return alert('Please select someone to share post.')
            dispatch<any>(shareStreakInGroups(streak, selectedGroups, setOpen))
        }
    }

    /////////////////////////////////////////////// COMPONENTS ///////////////////////////////////////////////////
    const Friend = ({ friend }: { friend: User }) => (
        <li onClick={() => handleToggleFriend(friend?._id!)} className={`${selectedFriends.includes(friend?._id!) ? 'bg-gray-100 ' : ''} flex gap-2 items-center mb-4 hover:bg-gray-100 rounded-md p-1 cursor-pointer`}>
            <Avatar className='w-10 h-10' >
                <AvatarImage src={friend.profilePicture as string} alt={friend.username} />
                <AvatarFallback className='capitalize' >{friend.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="">
                <p className="text-copper font-medium capitalize">
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
            <Avatar className='w-10 h-10' >
                <AvatarImage src={group.avatar} alt={group.name} />
                <AvatarFallback className='capitalize' >{group.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="">
                <p className="text-copper font-medium capitalize">
                    {group.name}
                </p>
                <p className="text-cool-gray text-sm">
                    {group.members.length} Members
                </p>
            </div>
        </li>

    )

    return (
        <Modal
            title='Share Streak'
            description='Share this post across your friends and groups.'
            isOpen={open}
            onClose={() => setOpen(false)}
            className='md:w-[30rem] sm:w-[60vw]'
        >
            <Tabs defaultValue="friend" className="w-full">
                <div className="flex justify-center w-full">
                    <TabsList>
                        <TabsTrigger value="friend">Friends</TabsTrigger>
                        <TabsTrigger value="group">Groups</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="friend">
                    {friends.map((friend, index) => (
                        <Friend friend={friend} key={index} />
                    ))}
                </TabsContent>
                <TabsContent value="group">
                    {joinedGroups.map((group, index) => (
                        <GroupCard group={group} key={index} />
                    ))}
                </TabsContent>
            </Tabs>

            <div className="flex justify-end items-center">
                <Button onClick={handleShare} disabled={selectedFriends.length == 0 && selectedGroups.length == 0}>Share</Button>
            </div>
        </Modal>
    )
}

export default ShareStreak