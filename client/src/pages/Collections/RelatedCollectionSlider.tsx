import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Card, CardContent, Typography } from '@mui/material';
import { Collections } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Collection, User } from '../../interfaces';
import { getUserCollections } from '../../redux/actions/collection';
import { Loader } from '../../utils/Components';

const RelatedCollectionSlider = () => {

    const dispatch = useDispatch()
    const { userCollections, isFetching }: { userCollections: Collection[], isFetching: boolean } = useSelector((state: RootState) => state.collection)
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)

    useEffect(() => {
         if (userCollections.length == 0) {
            dispatch<any>(getUserCollections(userCollections.length == 0, loggedUser?._id!, `?page=${1}&pageSize=${20}`))
        }
    }, [])

    return (
        <div className="w-full h-[12rem] flex justify-center items-center bg-light-gray p-[12px] rounded ">
            {
                isFetching
                    ?
                    <Loader />
                    :
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={20}
                        loop={true}
                        autoplay={true}
                        pagination={{ clickable: true }}
                        className="h-full w-full "
                    >
                        {userCollections.map((collection, index) => (
                            <SwiperSlide key={index} className='w-[15rem] h-[10rem]  '>
                                <Card
                                    key={index}
                                    className=" h-full bg-cool-gray-light p-[8px] rounded shadow-md transition-transform transform hover:scale-102  "
                                >
                                    <CardContent>
                                        <Typography variant="h6" component="h3" className="text-dark-slate-blue flex flex-col items-center">
                                            <Collections fontSize="small" style={{ marginRight: '0.5rem' }} />
                                            <span className='text-center capitalize ' >{collection.name}</span>
                                        </Typography>
                                        <Link
                                            to={`/collections/${collection._id}`}
                                            className="block mt-2 cursor-pointer text-teal-blue hover:text-teal-blue-dark hover:underline transition-colors duration-300"
                                        >
                                            View Collection
                                        </Link>
                                    </CardContent>
                                </Card>
                            </SwiperSlide>
                        ))}
                    </Swiper>
            }
        </div>
    );
};

export default RelatedCollectionSlider;
