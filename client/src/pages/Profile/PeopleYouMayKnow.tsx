import React, { useEffect } from 'react';
import { PersonAdd } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { User } from '../../interfaces';
import { getSuggestedUsers, sendFriendRequest } from '../../redux/actions/friend';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


const PeopleYouMayKnow = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { suggestedUsers, isFetching }: { suggestedUsers: User[], isFetching: boolean } = useSelector((state: RootState) => state.friend)

    useEffect(() => {
        dispatch<any>(getSuggestedUsers(suggestedUsers.length == 0, `?page=${1}&pageSize=${20}`))
    }, [])

    const handleSendFriendRequest = (friendId: string) => {
        dispatch<any>(sendFriendRequest(friendId))
    }


    const FriendCard = ({ person }: { person: User }) => {
        return (
            <Card className="h-full flex flex-col justify-between shadow-box rounded-md bg-secondary">
                <CardHeader className="flex h-[160px] p-2">
                    <Avatar className='w-full h-[160px] mb-2 rounded-lg ' >
                        <AvatarImage src={person?.profilePicture} alt={person?.username} />
                        <AvatarFallback className='bg-black text-white font-semibold capitalize text-7xl rounded-lg' >{person?.firstName.charAt(0)}</AvatarFallback>
                    </Avatar>
                </CardHeader>
                <CardContent className="flex flex-col p-2">
                    <CardTitle onClick={() => navigate(`/user/${person._id}`)} className="text-base font-semibold cursor-pointer capitalize truncate ">
                        {person?.firstName} {person?.lastName}
                    </CardTitle>
                    <span className='text-cool-gray text-sm mb-1 '>{person?.mutualFriends! > 0 ? `${person?.mutualFriends} Mutual Friends` : 'No Mutual Friends'}</span>
                    <Button onClick={() => handleSendFriendRequest(person?._id!)} >
                        <PersonAdd className="mr-2" />
                        Add Friend
                    </Button>
                </CardContent>
            </Card>
        )
    }
    FriendCard.Skeleton = function () {
        return (
            <div className='w-full flex flex-col justify-start gap-x-2 p-4 bg-secondary text-cool-gray-dark rounded-[6px] animate-pulse mb-4 '>
                <div className="flex w-full justify-center ">
                    <div className="w-full h-40 rounded-lg bg-warm-gray-dark" />
                </div>
                <div className="w-full flex flex-col justify-center items-center gap-y-2 mt-2 ">
                    <p className="w-[60%] h-5 bg-warm-gray-dark rounded" />
                    <p className="w-full h-4 bg-warm-gray-dark rounded" />
                </div>
                <p className="w-full h-8 bg-warm-gray-dark rounded mt-2 " />
            </div>
        )
    }


    return (
        <div className='w-full ' >

            <Card className="shadow-box rounded-[4px] p-[12px] ">
                <h2 className="text-xl text-dark-slate-blue font-medium mb-4">People You May Know</h2>
                <Swiper
                    slidesPerView={5}
                    spaceBetween={20}
                    loop={true}
                    autoplay={true}
                    pagination={{ clickable: true }}
                    className="h-fit w-full flex items-center "
                >
                    {
                        isFetching
                            ?
                            Array(20).fill('').map((_, index) => (
                                <SwiperSlide key={index} style={{ minWidth: '13rem' }} className='bg-light-gray w-fit min-w-52 h-full '>
                                    <FriendCard.Skeleton key={index} />
                                </SwiperSlide>
                            ))
                            :
                            suggestedUsers.map((person, index) => (
                                <SwiperSlide key={index} style={{ minWidth: '13rem' }} className='bg-light-gray w-fit min-w-52 h-full '>
                                    <FriendCard person={person} />
                                </SwiperSlide>
                            ))
                    }
                </Swiper>
            </Card>

        </div>
    );
};

export default PeopleYouMayKnow;
