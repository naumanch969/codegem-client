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
import { getUserCollections, starCollection } from '../../redux/actions/collection';
import { Loader } from '../../utils/Components';
import { CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { format } from 'timeago.js';
import { LucideGroup, Star } from 'lucide-react';

const RelatedCollectionSlider = () => {

    const dispatch = useDispatch()
    const { userCollections, isFetching }: { userCollections: Collection[], isFetching: boolean } = useSelector((state: RootState) => state.collection)
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)

    useEffect(() => {
        if (userCollections.length == 0) {
            // Place User Collection
        }
    }, [])

    const onStar = (collectionId: string) => {
        dispatch<any>(starCollection(collectionId, loggedUser?._id!))
    }

    return (
        <div className="w-full h-[16rem] flex justify-center items-center bg-light-gray p-[12px] rounded ">
            {
                isFetching
                    ?
                    <RelatedCollectionSlider.Skeleton />
                    :
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={20}
                        loop={true}
                        autoplay={true}
                        pagination={{ clickable: true }}
                        className="h-full w-full "
                    >
                        {userCollections.map((collection, index) => {
                            const starred: boolean = Boolean(collection.stars.find(id => id == loggedUser?._id!))

                            return (
                                <SwiperSlide key={index} className='w-[15rem] h-[14rem]  '>
                                    <Card
                                        key={index}
                                        className=" h-full flex flex-col justify-between bg-cool-gray-light p-[8px] rounded shadow-md transition-transform transform hover:scale-102  "
                                    >
                                        <CardHeader className='flex flex-row items-center justify-between gap-2 p-4 pb-0 w-full space-y-0' >
                                            <div className="flex justify-start items-center gap-2 ">
                                                <Avatar className='w-8 h-8 ' >
                                                    <AvatarImage src={(collection?.owner as User)?.profilePicture} alt="Profile" />
                                                    <AvatarFallback className='capitalize' >{(collection?.owner as User)?.firstName?.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <h3 className='flex flex-col items-start justify-center space-y-0 '>
                                                    <Link to={`/user/${(collection?.owner as User)?._id}`} className='text-xs font-semibold capitalize hover:underline hover:text-teal-blue'>
                                                        {(collection?.owner as User)?.firstName} {(collection?.owner as User)?.lastName}
                                                    </Link>
                                                </h3>
                                            </div>
                                            <Button onClick={() => onStar(collection._id)} variant={starred ? 'default' : 'outline'} size='sm' className='p-1 w-7 h-7 ' ><Star className='w-4 h-4' /></Button>
                                        </CardHeader>
                                        <CardContent className='p-4 pt-0' >
                                            <Link to={`/collections/${collection?._id}`} className='text-dark-slate-blue hover:text-dark-slate-blue-lighten hover:underline capitalize flex items-center text-base font-semibold '>
                                                <LucideGroup className='mr-2 w-5 h-5 ' />
                                                {collection.name}
                                            </Link>
                                            <p className="text-cool-gray-dark max-lines-10 truncate text-sm ">
                                                {collection.description.charAt(0).toUpperCase() + collection.description.slice(1)}
                                            </p>
                                            {collection?.language && <span className='text-teal-blue italic hover:underline cursor-pointer lowercase '>#{collection?.language}</span>}
                                        </CardContent>
                                        <CardFooter className='p-4 pt-0' >
                                            <Link
                                                to={`/collections/${collection._id}`}
                                                className="cursor-pointer text-teal-blue hover:text-teal-blue-dark hover:underline transition-colors duration-300"
                                            >
                                                View Collection
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                </SwiperSlide>
                            )
                        }
                        )}
                    </Swiper>
            }
        </div>
    );
};

export default RelatedCollectionSlider;

RelatedCollectionSlider.Skeleton = function () {
    return (
        <Swiper
            slidesPerView={5}
            spaceBetween={20}
            loop={true}
            autoplay={true}
            pagination={{ clickable: true }}
            className="h-full w-full bg-light-gray text-cool-gray-dark rounded-[6px] animate-pulse"
        >
            {Array(8).fill('').map((_, index) => (
                <SwiperSlide key={index} className='w-[15rem] h-[14rem]  '>
                    <Card
                        key={index}
                        className=" h-full bg-cool-gray-light p-[8px] rounded shadow-md transition-transform transform hover:scale-102  "
                    >
                        <CardHeader className='p-2' >
                            <span className='w-full h-24 bg-warm-gray-dark rounded '></span>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-2 p-2' >
                            <span className='w-full h-5 bg-warm-gray-dark rounded-full text-start ' />
                            <span className='w-full h-4 bg-warm-gray-dark rounded-full' />
                        </CardContent>
                    </Card>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}