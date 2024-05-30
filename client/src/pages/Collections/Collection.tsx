import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { ShareOutlined, Add, Star, StarOutline } from '@mui/icons-material';
import CodeComponent from '../Codes/Code';
import RelatedCollectionSlider from './RelatedCollectionSlider'
import { Collection, User } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getCollection, getCollectionChallenges, getCollectionCodes, getCollectionStreaks, createCollectionCode, createCollectionStreak, createCollectionChallenge, starCollection } from '../../redux/actions/collection';
import { Path } from '../../utils/Components';
import StreakComponent from '../Streak/Streak';
import ChallengeComponent from '../Challenge/Challenge';
import CodeCreateModal from '../Codes/Create'
import StreakCreateModal from '../Streak/Create'
import ChallengeCreateModal from '../Challenge/Create'
import ShareCollection from './ShareCollection';
import { Button } from '@/components/ui/button';
import { Empty } from '@/utils/Components/Empty';
import { capitalizeFirstLetter } from '@/lib/utils';
import { useCodeModal } from '@/hooks/useCodeModal';
import { useChallengeModal } from '@/hooks/useChallengeModal';
import { useStreakModal } from '@/hooks/useStreakModal';


const SingleCollectionView = () => {
    ///////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { collectionId } = useParams();
    const { onOpen: onCodeOpen, onSetCode, onSetCollectionId: onSetCollectionIdForCode, onSetGroupId: onSetGroupIdForCode } = useCodeModal()
    const { onOpen: onStreakOpen, onSetStreak, onSetCollectionId: onSetCollectionIdForStreak, onSetGroupId: onSetGroupIdForStreak } = useStreakModal()
    const { onOpen: onChallengeOpen, onSetChallenge, onSetCollectionId: onSetCollectionIdForChallenge, onSetGroupId: onSetGroupIdForChallenge } = useChallengeModal()
    const { currentCollection, isFetching }: { currentCollection: Collection | null, isFetching: boolean } = useSelector((state: RootState) => state.collection)
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)
    const collectionName = currentCollection?.name ? currentCollection.name.charAt(0).toUpperCase() + currentCollection.name.slice(1).toLowerCase() : ''
    const starred = currentCollection?.stars?.some(id => id == loggedUser?._id as string)
    const segments = [
        { name: 'Home', link: '/home' },
        { name: 'Collections', link: '/collections' },
        { name: collectionName, link: `/collections/${currentCollection?._id}` },
    ];
    const menuItems = [
        'Codes',
        'Streaks',
        'Challenges',
    ];
    ///////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////
    const [activeMenuItem, setActiveMenuItem] = useState<'codes' | 'streaks' | 'challenges'>('codes')
    const [loading, setLoading] = useState<boolean>(false)
    const [openShareCollection, setOpenShareCollection] = useState<boolean>(false)

    ///////////////////////////////////////////////////// useEffects //////////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getCollection(collectionId as string))
    }, [collectionId])
    useEffect(() => {
        if (activeMenuItem == 'codes') {
            const isLoading = currentCollection?.codes?.every(c => typeof c === 'string');      // if codes are not populated
            const action = isLoading ? getCollectionCodes(collectionId as string, setLoading) : getCollectionCodes(collectionId as string);
            dispatch<any>(action);
        }
        else if (activeMenuItem == 'streaks') {
            const isLoading = currentCollection?.streaks?.every(s => typeof s === 'string');    // if streaks are not populated
            const action = isLoading ? getCollectionStreaks(collectionId as string, setLoading) : getCollectionStreaks(collectionId as string);
            dispatch<any>(action);
        }
        else {
            const isLoading = currentCollection?.challenges?.every(c => typeof c === 'string'); // if challenges are not populated
            const action = isLoading ? getCollectionChallenges(collectionId as string, setLoading) : getCollectionChallenges(collectionId as string);
            dispatch<any>(action);
        }
    }, [activeMenuItem])

    ///////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////
    // dispatch<any>(createCollectionChallenge(collectionId!, challengeData))
    const handleStar = () => {
        dispatch<any>(starCollection(currentCollection?._id!, loggedUser?._id!))
    }
    const onCreateModalOpen = () => {
        if (activeMenuItem == 'codes') {
            onSetCode(null)
            onSetCollectionIdForCode(collectionId!)
            onSetGroupIdForCode("")
            onCodeOpen()
        }
        else if (activeMenuItem == 'streaks') {
            onSetStreak(null)
            onSetCollectionIdForStreak(collectionId!)
            onSetGroupIdForStreak("")
            onStreakOpen()
        }
        else {
            onSetChallenge(null)
            onSetCollectionIdForChallenge(collectionId!)
            onSetGroupIdForChallenge("")
            onChallengeOpen()
        }

    }

    return (
        <div className="container mx-auto p-4 flex flex-col gap-3 ">

            <ShareCollection open={openShareCollection} setOpen={setOpenShareCollection} collection={currentCollection!} />
            {activeMenuItem == 'codes' && <CodeCreateModal />}
            {activeMenuItem == 'streaks' && <StreakCreateModal />}
            {activeMenuItem == 'challenges' && <ChallengeCreateModal />}

            <RelatedCollectionSlider />

            {
                isFetching
                    ?
                    <SingleCollectionView.Skeleton />
                    :
                    <>
                        <Path segments={segments} />


                        <div className="flex flex-col gap-[8px] ">
                            <div className="flex justify-between items-center ">
                                <h1 className="text-3xl font-bold text-dark-slate-blue capitalize ">{currentCollection?.name}</h1>
                                {/* Interaction buttons */}
                                <div className="flex justify-center space-x-2 px-4 ">
                                    <Tooltip placement='top' title='Star' >
                                        <Button onClick={handleStar} variant={starred ? 'default' : 'outline'} size='icon' >
                                            {starred ? <Star /> : <StarOutline />}
                                        </Button>
                                    </Tooltip>
                                    <Tooltip placement='top' title='Share' >
                                        <Button variant={'outline'} size='icon'  >
                                            <ShareOutlined />
                                        </Button>
                                    </Tooltip>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-2">{capitalizeFirstLetter(currentCollection?.description!)}</p>
                        </div>


                        <div className="flex flex-col gap-4">
                            {/* MENU */}
                            <div className="relative">
                                <div className="flex justify-center ">
                                    <div className="bg-white shadow-md rounded-lg flex overflow-hidden">
                                        {menuItems.map((item, index) => (
                                            <button
                                                key={index}
                                                className={`py-2 px-4 ${activeMenuItem.toLowerCase() === item.toLowerCase()
                                                    ? 'bg-teal-blue text-white'
                                                    : 'text-cool-gray'
                                                    } hover:bg-teal-blue-lighten hover:text-white transition-all duration-200 focus:outline-none`}
                                                onClick={() => setActiveMenuItem(item.toLowerCase() as 'codes' | 'streaks' | 'challenges')}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    onClick={onCreateModalOpen}
                                    className="absolute top-0 right-4 flex justify-center items-center gap-1 bg-teal-blue hover:bg-teal-blue-lighten text-white py-2 px-2 rounded-lg shadow-md capitalize "
                                >
                                    <Add /> Add {activeMenuItem.slice(0, -1)}
                                </button>
                            </div>

                            <div className="flex justify-center items-center">
                                <div className="lg:w-[48rem] pt-1 px-3 w-full flex flex-col gap-6 min-h-[16rem] ">
                                    {
                                        loading ?
                                            Array(5).fill('').map((_, index) => (
                                                <CodeComponent.Skeleton key={index} />
                                            ))
                                            :
                                            <>
                                                {
                                                    activeMenuItem == 'codes'
                                                    &&
                                                    <>
                                                        {
                                                            currentCollection?.codes?.length == 0
                                                                ?
                                                                <Empty />
                                                                :
                                                                <>
                                                                    {currentCollection?.codes?.map((code, index) => (
                                                                        <CodeComponent code={code} key={index} />
                                                                    ))}
                                                                </>
                                                        }
                                                    </>
                                                }
                                                {
                                                    activeMenuItem == 'streaks'
                                                    &&
                                                    <>
                                                        {
                                                            currentCollection?.streaks?.length == 0
                                                                ?
                                                                <Empty />
                                                                :
                                                                <>
                                                                    {currentCollection?.streaks?.map((streak, index) => (
                                                                        <StreakComponent streak={streak} key={index} />
                                                                    ))}
                                                                </>
                                                        }
                                                    </>
                                                }
                                                {
                                                    activeMenuItem == 'challenges'
                                                    &&
                                                    <>
                                                        {
                                                            currentCollection?.challenges?.length == 0
                                                                ?
                                                                <Empty />
                                                                :
                                                                <>
                                                                    {currentCollection?.challenges?.map((challenge, index) => (
                                                                        <ChallengeComponent challenge={challenge} key={index} />
                                                                    ))}
                                                                </>
                                                        }
                                                    </>
                                                }
                                            </>
                                    }
                                </div>
                            </div>

                        </div>
                    </>
            }
        </div>
    );
};

export default SingleCollectionView;


SingleCollectionView.Skeleton = function () {
    return (
        <div className='w-full flex flex-col gap-4 p-4 bg-white text-cool-gray-dark rounded-[6px] animate-pulse '>

            <div className='w-full h-fit flex flex-col gap-4 p-4 bg-light-gray text-cool-gray-dark rounded-[6px]'>
                <span className='w-1/3 h-4 rounded bg-warm-gray-dark' />
                <span className='w-1/2 h-4 rounded bg-warm-gray-dark' />
                <span className='w-2/3 h-4 rounded bg-warm-gray-dark' />
                <span className='w-1/4 h-4 rounded bg-warm-gray-dark' />
                <span className='w-2/3 h-4 rounded bg-warm-gray-dark' />
            </div>

            <div className='w-full h-fit flex justify-center items-center gap-4 p-4 bg-light-gray text-cool-gray-dark rounded-[6px]'>
                <span className='w-20 h-8 rounded-md bg-warm-gray-dark' />
                <span className='w-20 h-8 rounded-md bg-warm-gray-dark' />
                <span className='w-20 h-8 rounded-md bg-warm-gray-dark' />
            </div>

            <div className="w-full flex justify-center">
                <div className="lg:w-[48rem] pt-1 px-3 w-full flex flex-col items-center gap-2 h-full">
                    {Array(5).fill('').map((_, index) => (
                        <CodeComponent.Skeleton key={index} />
                    ))}
                </div>
            </div>

        </div>
    )
}