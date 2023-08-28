import React from 'react';
import { Card, CardHeader, CardContent, CardActions, Button, Avatar, IconButton } from '@mui/material';
import { MoreHoriz, PersonAdd } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const PeopleYouMayKnow = () => {
    const people = [
        { id: 1, name: 'John Doe', mutualFriends: 3, profileImage: 'https://via.placeholder.com/50' },
        { id: 2, name: 'Jane Smith', mutualFriends: 1, profileImage: 'https://via.placeholder.com/50' },
        { id: 1, name: 'John Doe', mutualFriends: 3, profileImage: 'https://via.placeholder.com/50' },
        { id: 2, name: 'Jane Smith', mutualFriends: 1, profileImage: 'https://via.placeholder.com/50' },
        { id: 1, name: 'John Doe', mutualFriends: 3, profileImage: 'https://via.placeholder.com/50' },
        { id: 2, name: 'Jane Smith', mutualFriends: 1, profileImage: 'https://via.placeholder.com/50' },
        { id: 1, name: 'John Doe', mutualFriends: 3, profileImage: 'https://via.placeholder.com/50' },
        { id: 2, name: 'Jane Smith', mutualFriends: 1, profileImage: 'https://via.placeholder.com/50' },
        { id: 1, name: 'John Doe', mutualFriends: 3, profileImage: 'https://via.placeholder.com/50' },
        { id: 2, name: 'Jane Smith', mutualFriends: 1, profileImage: 'https://via.placeholder.com/50' },
        // Add more people data here
    ];

    const FriendCard = ({ person }) => {
        return (
            <Card className="h-full flex flex-col justify-between shadow-box rounded-md bg-light-gray ">
                <div className="flex h-[60%]">
                    <img src={person.profileImage} alt="profileImage" className='h-full w-full object-cover rounded-t-md' />
                </div>
                <div className="h-[40%] flex flex-col p-[.5rem]">
                    <h4 className="text-lg font-semibold">{person.name}</h4>
                    <span className='text-cool-gray text-sm'>{person.mutualFriends > 0 ? `${person.mutualFriends} Mutual Friends` : 'No Mutual Friends'}</span>
                    <button className='mt-2 px-4 py-2 bg-teal-blue hover:bg-teal-blue-lighten text-white rounded-md hover:bg-teal-blue-dark '>
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
                    {people.map((person, index) => (
                        <SwiperSlide key={index} className='bg-light-gray w-fit h-full '>
                            <FriendCard person={person} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </div>
    );
};

export default PeopleYouMayKnow;
