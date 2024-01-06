import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, IconButton, Tooltip } from '@mui/material';
import { FavoriteOutlined, BookmarkBorderOutlined, ShareOutlined, Add } from '@mui/icons-material';
import CodeComponent from '../Codes/Code';
import RelatedCollectionSlider from './RelatedCollectionSlider'
import { Challenge, Code, Collection, Streak } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getCollection, getCollectionChallenges, getCollectionCodes, getCollectionStreaks, createCollectionCode, createCollectionStreak, createCollectionChallenge } from '../../redux/actions/collection';
import { Loader, Path } from '../../utils/Components';
import StreakComponent from '../Streak/Streak';
import ChallengeComponent from '../Challenge/Challenge';
import CodeCreateModal from '../Codes/Create'
import StreakCreateModal from '../Streak/Create'
import ChallengeCreateModal from '../Challenge/Create'


const SingleCollectionView = () => {
    ///////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { collectionId } = useParams();
    const { currentCollection }: { currentCollection: Collection | null } = useSelector((state: RootState) => state.collection)
    const collectionName = (
        currentCollection?.name ? currentCollection.name.charAt(0).toUpperCase() + currentCollection.name.slice(1).toLowerCase() : ''
    );

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
    const [loadingString, setLoadingString] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    ///////////////////////////////////////////////////// useEffects //////////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getCollection(collectionId as string))
    }, [])
    useEffect(() => {
        if (activeMenuItem == 'codes') {
            const isLoading = currentCollection?.codes?.every(c => typeof c === 'string');      // if codes are not populated
            const action = isLoading ? getCollectionCodes(collectionId as string, setLoadingString) : getCollectionCodes(collectionId as string);
            dispatch<any>(action);
        }
        else if (activeMenuItem == 'streaks') {
            const isLoading = currentCollection?.streaks?.every(s => typeof s === 'string');    // if streaks are not populated
            const action = isLoading ? getCollectionStreaks(collectionId as string, setLoadingString) : getCollectionStreaks(collectionId as string);
            dispatch<any>(action);
        }
        else {
            const isLoading = currentCollection?.challenges?.every(c => typeof c === 'string'); // if challenges are not populated
            const action = isLoading ? getCollectionChallenges(collectionId as string, setLoadingString) : getCollectionChallenges(collectionId as string);
            dispatch<any>(action);
        }
    }, [activeMenuItem])

    ///////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////
    const handleAdd = () => {
        setOpen(true)
    }
    const handleCreateCode = (codeData: any) => {
        dispatch<any>(createCollectionCode(collectionId!, codeData, setOpen))
    }
    const handleCreateStreak = (streakData: any) => {
        dispatch<any>(createCollectionStreak(collectionId!, streakData, setOpen))
    }
    const handleCreateChallenge = (challengeData: any) => {
        dispatch<any>(createCollectionChallenge(collectionId!, challengeData, setOpen))
    }

    return (
        <div className="container mx-auto p-[1rem] flex flex-col gap-3 ">


            {activeMenuItem == 'codes' && <CodeCreateModal open={open} setOpen={setOpen} handleSubmit={handleCreateCode} />}
            {activeMenuItem == 'streaks' && <StreakCreateModal open={open} setOpen={setOpen} handleSubmit={handleCreateStreak} />}
            {activeMenuItem == 'challenges' && <ChallengeCreateModal open={open} setOpen={setOpen} handleSubmit={handleCreateChallenge} />}

            <RelatedCollectionSlider />

            <Path segments={segments} />


            <div className="flex flex-col gap-[8px] ">
                <div className="flex justify-between items-center ">
                    <h1 className="text-3xl font-bold text-dark-slate-blue capitalize ">{currentCollection?.name}</h1>
                    {/* Interaction buttons */}

                    <div className="flex justify-center space-x-4 ">
                        <Tooltip placement='top' title='Add to Favorite' >
                            <IconButton size="medium">
                                <FavoriteOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip placement='top' title='Like' >
                            <IconButton size="medium">
                                <BookmarkBorderOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip placement='top' title='Share' >
                            <IconButton size="medium">
                                <ShareOutlined />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <p className="text-gray-600 mb-2">{currentCollection?.description}</p>
            </div>


            <div className="flex flex-col gap-4">
                <div className="relative">
                    <div className="flex justify-center ">
                        <div className="bg-white shadow-md rounded-lg flex overflow-hidden">
                            {menuItems.map(item => (
                                <button
                                    key={item}
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
                        onClick={handleAdd}
                        className="absolute top-0 right-4 flex justify-center items-center gap-1 bg-teal-blue hover:bg-teal-blue-lighten text-white py-2 px-2 rounded-lg shadow-md capitalize "
                    >
                        <Add /> Add {activeMenuItem.slice(0, -1)}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[16rem] ">
                    {
                        loadingString ?
                            <div className="w-full h-full col-span-2 flex justify-center items-center ">
                                <Loader />
                            </div>
                            :
                            <>
                                {
                                    activeMenuItem == 'codes'
                                    &&
                                    <>
                                        {
                                            currentCollection?.codes?.length == 0
                                                ?
                                                <div className="w-full h-full flex justify-center items-center col-span-2 ">
                                                    <span>No Codes to Show.</span>
                                                </div>
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
                                                <div className="w-full h-full flex justify-center items-center col-span-2 ">
                                                    <span>No Streaks to Show.</span>
                                                </div>
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
                                                <div className="w-full h-full flex justify-center items-center col-span-2 ">
                                                    <span>No Challenges to Show.</span>
                                                </div>
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
    );
};

export default SingleCollectionView;
