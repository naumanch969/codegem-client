import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Chat, User } from '../../interfaces';
import { RootState } from '../../redux/store';
import { SampleProfileCoverImage } from '../../assets';
import { Button } from '@/components/ui/button';
import { removeFriendRequest, sendFriendRequest, getSentRequests, getFriends, getReceivedRequests, acceptFriendRequest } from '@/redux/reducers/friendSlice';
import { useRole } from '@/hooks/useRole';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { deleteUser } from '@/redux/reducers/userSlice';
import { fetchChats, setChat, setCurrentChatSlice } from '@/redux/reducers/chatSlice';
import toast from 'react-hot-toast';
import { MessageCircle } from 'lucide-react';
import { Loader, Loading } from '@/utils/Components';
import { useStateContext } from '@/contexts/ContextProvider';

const ProfilePage = () => {

    ///////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loggedUser, currentUser, isFetching: userFetching } = useSelector((state: RootState) => state.user)
    const { chats } = useSelector((state: RootState) => state.chat)
    const { sentRequests, receivedRequests, friends } = useSelector((state: RootState) => state.friend)
    const { role } = useRole()
    const { setSelectedChat } = useStateContext()

    ///////////////////////////////////////////////// STATES //////////////////////////////////////////////////////////
    const [userType, setUserType] = useState<'friend' | 'request_sent' | 'request_received' | 'none'>('none')
    const [friendsFetching, setFriendsFetching] = useState(false)
    const [loading, setLoading] = useState(false)

    ///////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////////////
    useEffect(() => {
        if (friends.length == 0 || sentRequests.length == 0 || receivedRequests.length == 0) setFriendsFetching(true)
        dispatch<any>(getReceivedRequests('')).finally(() => setFriendsFetching(false))
        dispatch<any>(getSentRequests('')).finally(() => setFriendsFetching(false))
        dispatch<any>(getFriends('')).finally(() => setFriendsFetching(false))
    }, [])
    useEffect(() => {
        if (chats?.length > 0) return
        dispatch<any>(fetchChats(loggedUser?._id!))
    }, []);
    useEffect(() => {
        if (friends.some(user => user._id == currentUser?._id)) { // if friend
            setUserType('friend')
        }
        else if (sentRequests.some(user => user._id == currentUser?._id)) {  // if request sent
            setUserType('request_sent')
        }
        else if (receivedRequests.some(user => user._id == currentUser?._id)) { // if request received
            setUserType('request_received')
        }
        else {
            setUserType('none')
        }
    }, [sentRequests, currentUser, friends, receivedRequests])
    ///////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////////
    const onClick = () => {
        if (userType == 'request_sent')
            dispatch<any>(removeFriendRequest(currentUser?._id as string))
        else if (userType == 'request_received')
            dispatch<any>(acceptFriendRequest(currentUser?._id as string))
        else
            dispatch<any>(sendFriendRequest(currentUser?._id as string))
    }

    const onDeleteUser = () => {
        if (role == 'Admin') {
            dispatch<any>(deleteUser(currentUser?._id as string))
                .then(() => {
                    navigate("/users");
                })
        }
    }

    const onChat = () => {

        const findedChat = chats?.find(c => c?.participantIds?.includes(currentUser?._id!))
        if (findedChat) {
            localStorage.setItem('lastChat', findedChat?.id!);
            setSelectedChat({ ...findedChat, otherUser: currentUser! });
            dispatch(setCurrentChatSlice({ ...findedChat, otherUser: currentUser! }))
            navigate('/messages')
        }
        else {
            const input: Chat = {
                id: '',
                createdAt: new Date(),
                participantIds: [loggedUser?._id!, currentUser?._id!],
                lastMessage: '',
                lastMessageTimestamp: new Date(),
                participants: [loggedUser!, currentUser!],
                messages: []
            }

            setLoading(true)
            dispatch<any>(setChat(input))
                .then(({ payload }: { payload: Chat }) => {
                    localStorage.setItem('lastChat', payload?.id!);
                    setSelectedChat({ ...payload, otherUser: currentUser! });
                    dispatch(setCurrentChatSlice({ ...payload, otherUser: currentUser! }))
                    navigate('/messages')
                })
                .catch(() => {
                    toast.error('Something went wrong!')
                })
                .finally(() => {
                    setLoading(false)
                })
        }

    }

    ///////////////////////////////////////////////// RENDER //////////////////////////////////////////////////////////
    return (
        <div className="flex flex-col w-full">
            <div className="w-full h-[20rem] rounded-[6px] overflow-hidden " >
                <img
                    src={currentUser?.coverImage ? currentUser?.coverImage : SampleProfileCoverImage}
                    alt=""
                    className="w-full h-full"
                />
            </div>

            <div className="flex justify-between items-center gap-4 my-[1rem] px-[2rem]">
                {/* Profile image and username */}
                <div className="flex items-end gap-4 relative">
                    <div className="relative w-[10rem]">
                        <div className="w-[10rem] h-[10rem] absolute bottom-[-1rem] rounded-full border-[1px] border-gray-500">
                            {/* <img
                                src={currentUser?.profilePicture ? currentUser?.profilePicture : "https://via.placeholder.com/50"}
                                className="w-full h-full object-cover rounded-full"
                                alt="Profile"
                            /> */}
                            <Avatar className='w-full h-full object-cover' >
                                <AvatarImage src={currentUser?.profilePicture} alt={currentUser?.username} />
                                <AvatarFallback className='text-primary text-9xl font-semibold flex justify-center items-center' >
                                    {currentUser?.username?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-blackish "><span className='capitalize' >{currentUser?.firstName} {currentUser?.lastName} </span>({currentUser?.username}) </h1>
                        <p className="text-gray-600">{currentUser?.email}</p>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <Button onClick={onChat} variant='secondary' className='flex items-center gap-2' >
                        <MessageCircle className='w-4 h-4' /> {loading ? <Loading size='sm' /> : <>Message</>}
                    </Button>
                    {
                        userType != 'friend' &&
                        <Button onClick={onClick} disabled={friendsFetching || userFetching} >
                            {userType == 'request_received' ? 'Accept Request' : userType == 'request_sent' ? 'Remove Request' : 'Add Friend'}
                        </Button>
                    }
                    {
                        role == 'Admin' &&
                        <Button onClick={onDeleteUser} variant='destructive' disabled={friendsFetching || userFetching} >
                            Delete User
                        </Button>
                    }
                </div>
            </div>

        </div>

    );
};

export default ProfilePage;
