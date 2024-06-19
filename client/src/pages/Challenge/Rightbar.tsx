import React, { useEffect, useState } from 'react';
import { PeopleAlt, Update, PersonAdd, Image } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { User } from '../../interfaces';
import { getFriends, getSuggestedUsers } from '../../redux/reducers/friendSlice';
import { Link, useNavigate } from 'react-router-dom';
import { SampleProfileCoverImage, image1 } from '../../assets';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ChallengesRightbar = () => {

    //////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { friends, suggestedUsers }: { friends: User[], suggestedUsers: User[], isFetching: boolean } = useSelector((state: RootState) => state.friend)
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)

    //////////////////////////////////////////////////// STATES ///////////////////////////////////////////////
    const [isFetching, setIsFetching] = useState(false)

    //////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////
    useEffect(() => {
        if (friends.length == 0 || suggestedUsers.length == 0) {
            setIsFetching(true)
        }
        dispatch<any>(getFriends(`?page=${1}&pageSize=${10}`)).finally(() => setIsFetching(false))
        dispatch<any>(getSuggestedUsers(`?page=${1}&pageSize=${10}`)).finally(() => setIsFetching(false))
    }, [])

    //////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////

    //////////////////////////////////////////////////// COMPONENTS ///////////////////////////////////////////////
    const Friend = ({ friend }: { friend: User }) => (
        <li onClick={() => navigate(`/user/${friend._id}`)} className="flex gap-2 items-center mb-4 hover:bg-gray-100 rounded-md p-2 cursor-pointer">
            <div className="w-10 flex items-center rounded-full overflow-hidden">
                {friend.profilePicture ? (
                    <img
                        src={friend.profilePicture as string}
                        alt={friend.username}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="w-10 h-10 rounded-full bg-teal-blue  text-white text-lg capitalize flex items-center justify-center">
                        {friend.username.charAt(0)}
                    </span>
                )}
            </div>
            <div className="">
                <p className="text-teal-blue font-medium capitalize">
                    {friend.username}
                </p>
                <p className="text-cool-gray text-sm">
                    {friend.mutualFriends} Mutual Friends
                </p>
            </div>
        </li>
    )
    Friend.Skeleton = function () {
        return (
            <div className='w-full flex justify-start gap-x-2 p-4 bg-light-gray text-cool-gray-dark rounded-[6px] animate-pulse mb-4 '>
                <div className="flex">
                    <div className="w-10 h-10 rounded-full bg-warm-gray-dark" />
                </div>
                <div className="w-full flex flex-col gap-y-2 ">
                    <p className="w-[5rem] h-4 bg-warm-gray-dark rounded" />
                    <p className="w-full h-4 bg-warm-gray-dark rounded" />
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col items-center mb-4 gap-y-2 ">
                <Avatar className='w-32 h-32' >
                    <AvatarImage src={loggedUser?.profilePicture} alt="Profile" />
                    <AvatarFallback className='text-8xl text-center' >{loggedUser?.firstName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col items-center gap-y-0.5 ' >
                    <Link to='/profile' className="capitalize font-semibold text-gray-800 text-lg ">{loggedUser?.firstName} {loggedUser?.lastName}</Link>
                    <p className="text-lg text-gray-600">{loggedUser?.email}</p>
                </div>
            </div>
            {/* Suggested to You */}
            <div className="bg-white p-3 rounded-lg shadow-md w-full ">
                <h2 className="text-lg font-semibold mb-2 text-dark-slate-blue">
                    Suggested to You
                </h2>
                <ul >
                    {
                        isFetching
                            ?
                            Array(2).fill("").map((_, index) => (
                                <Friend.Skeleton key={index} />
                            ))
                            :
                            suggestedUsers.slice(0, 4).map((friend, index) => (
                                <Friend friend={friend} key={index} />
                            ))
                    }
                </ul>
            </div>
            {/* Your Friends */}
            <div className='bg-white p-3 rounded-lg shadow-md w-full ' >
                <h2 className="text-lg font-semibold mb-2 text-dark-slate-blue">
                    Your Friends
                </h2>
                <ul>
                    {
                        isFetching
                            ?
                            Array(4).fill("").map((_, index) => (
                                <Friend.Skeleton key={index} />
                            ))
                            :
                            friends.map((friend, index) => (
                                <Friend friend={friend} key={index} />
                            ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default ChallengesRightbar;
