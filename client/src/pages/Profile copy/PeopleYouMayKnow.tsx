import React, { useEffect } from 'react';
import { Card, CardHeader, CardContent, CardActions, Button, Avatar, IconButton } from '@mui/material';
import { MoreHoriz, PersonAdd } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { User } from '../../interfaces';
import { getSuggestedUsers, sendFriendRequest } from '../../redux/actions/friend';


const PeopleYouMayKnow = () => {

    const dispatch = useDispatch()
    const { suggestedUsers }: { suggestedUsers: User[] } = useSelector((state: RootState) => state.friend)

    useEffect(() => {
        dispatch<any>(getSuggestedUsers())
    }, [])

    const handleSendFriendRequest = (friendId: string) => {
        dispatch<any>(sendFriendRequest(friendId))
    }


    const FriendCard = ({ person }: { person: User }) => {
        return (
            <Card className="h-full flex flex-col justify-between shadow-box rounded-md bg-light-gray ">
                <div className="flex h-[160px] ">
                    {
                        person?.profilePicture
                            ?
                            <img
                                src={person?.profilePicture}
                                alt={person?.username}
                                className="w-full h-[160px] object-cover rounded-md mb-2"
                            />
                            :
                            <div className='w-full h-[160px] rounded-md mb-2 capitalize flex justify-center items-center bg-black text-white font-semibold text-[5rem] '>{person?.username?.charAt(0)}</div>
                    }
                </div>
                <div className="flex flex-col p-2 pt-1 ">
                    <h4 className="text-lg font-semibold">{person?.username}</h4>
                    <span className='text-cool-gray text-sm'>{person?.mutualFriends > 0 ? `${person?.mutualFriends} Mutual Friends` : 'No Mutual Friends'}</span>
                    <button onClick={() => handleSendFriendRequest(person?._id)} className='mt-2 px-4 py-2 bg-teal-blue hover:bg-teal-blue-lighten text-white rounded-md hover:bg-teal-blue-dark '>
                        <PersonAdd className="mr-2" />
                        Add Friend
                    </button>
                </div>
            </Card>
        )
    }



    return (
        <div className='w-full ' >

            <div className="shadow-box rounded-[4px] p-[12px] ">
                <h2 className="text-xl text-dark-slate-blue font-medium mb-4">People You May Know</h2>
                <Swiper
                    slidesPerView={5}
                    spaceBetween={20}
                    loop={true}
                    autoplay={true}
                    pagination={{ clickable: true }}
                    className="h-fit w-full flex items-center "
                >
                    {suggestedUsers.map((person, index) => (
                        <SwiperSlide key={index} style={{ minWidth: '13rem' }} className='bg-light-gray w-fit min-w-52 h-full '>
                            <FriendCard person={person} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </div>
    );
};

export default PeopleYouMayKnow;
