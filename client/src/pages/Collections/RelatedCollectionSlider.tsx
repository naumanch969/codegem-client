import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Card, CardContent, Typography } from '@mui/material';
import { Collections } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const RelatedCollectionSlider = () => {
    const relatedCollections = [
        {
            id: '1',
            name: 'Frontend Development',
        },
        {
            id: '2',
            name: 'UI/UX Design',
        },
        {
            id: '3',
            name: 'JavaScript Tricks',
        },
        {
            id: '2',
            name: 'UI/UX Design',
        },
        {
            id: '3',
            name: 'JavaScript Tricks',
        },
        {
            id: '2',
            name: 'UI/UX Design',
        },
        {
            id: '3',
            name: 'JavaScript Tricks',
        },
        {
            id: '4',
            name: 'Responsive Web Design',
        },
    ];

    return (
        <div className="w-full h-[12rem] flex justify-center items-center bg-light-gray p-[12px] rounded ">
            <Swiper
                slidesPerView={5}
                spaceBetween={20}
                loop={true}
                autoplay={true}
                pagination={{ clickable: true }}
                className="h-full w-full "
            >
                {relatedCollections.map((collection, index) => (
                    <SwiperSlide key={index} className='w-[15rem] h-[10rem]  '>
                        <Card
                            key={index}
                            className=" h-full bg-cool-gray-light p-[8px] rounded shadow-md transition-transform transform hover:scale-102  "
                        >
                            <CardContent>
                                <Typography variant="h6" component="h3" className="text-dark-slate-blue flex flex-col items-center">
                                    <Collections fontSize="small" style={{ marginRight: '0.5rem' }} />
                                   <span className='text-center ' >{collection.name}</span>
                                </Typography>
                                <Link
                                    to={`/collections/${collection.id}`}
                                    className="block mt-2 cursor-pointer text-teal-blue hover:text-teal-blue-dark hover:underline transition-colors duration-300"
                                >
                                    View Collection
                                </Link>
                            </CardContent>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default RelatedCollectionSlider;
