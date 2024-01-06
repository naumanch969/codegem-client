import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, IconButton, Tooltip } from '@mui/material';
import { FavoriteOutlined, BookmarkBorderOutlined, ShareOutlined } from '@mui/icons-material';
import CodeComponent from '../Codes/Code';
import RelatedCollectionSlider from './RelatedCollectionSlider'
import { Code, Collection } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getCollection } from '../../redux/actions/collection';
import { Path } from '../../utils/Components';


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

    ///////////////////////////////////////////////////// STATES //////////////////////////////////////////////////////

    ///////////////////////////////////////////////////// useEffects //////////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getCollection(collectionId as string))
    }, [])

    return (
        <div className="container mx-auto p-[1rem] flex flex-col gap-[1.5rem] ">

            <RelatedCollectionSlider />

            <Path segments={segments} />


            <div className="flex flex-col gap-[8px] ">
                <div className="flex justify-between items-center ">
                    <h1 className="text-3xl font-bold mb-4 text-dark-slate-blue capitalize ">{currentCollection?.name}</h1>
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
                <p className="text-gray-600 mb-6">{currentCollection?.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <span>Codes: {currentCollection?.codes.length}</span>
                <span>Challenges: {currentCollection?.challenges.length}</span>
                <span>Streaks: {currentCollection?.streaks.length}</span>
                {currentCollection?.codes?.map((code, index) => (
                    <CodeComponent code={code} key={index} />
                ))}
            </div>

        </div>
    );
};

export default SingleCollectionView;
