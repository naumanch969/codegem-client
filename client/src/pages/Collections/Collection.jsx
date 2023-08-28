import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, IconButton, Tooltip } from '@mui/material';
import { FavoriteOutlined, BookmarkBorderOutlined, ShareOutlined } from '@mui/icons-material';
import Code from '../Codes/Code';
import RelatedCollectionSlider from './RelatedCollectionSlider'

const sampleCollection = {
    id: '1',
    name: 'Awesome Web Design',
    description: 'A collection of beautiful web design inspirations.',
    snippets: [
        { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: `console.log("Hello, world!");\n`, likes: [], shares: [], comments: [] },
        { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: 'console.log("Hello, world!");', likes: [], shares: [], comments: [] },
        { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: 'console.log("Hello, world!");', likes: [], shares: [], comments: [] },
        { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: 'console.log("Hello, world!");', likes: [], shares: [], comments: [] },
        { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: 'console.log("Hello, world!");', likes: [], shares: [], comments: [] },
        { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: 'console.log("Hello, world!");', likes: [], shares: [], comments: [] },
        { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: 'console.log("Hello, world!");', likes: [], shares: [], comments: [] },
        { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: 'console.log("Hello, world!");', likes: [], shares: [], comments: [] },
        { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: 'console.log("Hello, world!");', likes: [], shares: [], comments: [] },
        { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: 'console.log("Hello, world!");', likes: [], shares: [], comments: [] },
        { id: 1, title: 'Sample Title 1', description: 'Sample description 1...', tags: ['tag1', 'tag2'], code: 'console.log("Hello, world!");', likes: [], shares: [], comments: [] },
    ],
};

const relatedCollections = [
    { id: '2', name: 'Web Development Trends', description: 'Stay updated with the latest web development trends.' },
    { id: '2', name: 'Web Development Trends', description: 'Stay updated with the latest web development trends.' },
    { id: '2', name: 'Web Development Trends', description: 'Stay updated with the latest web development trends.' },
    { id: '2', name: 'Web Development Trends', description: 'Stay updated with the latest web development trends.' },
    { id: '2', name: 'Web Development Trends', description: 'Stay updated with the latest web development trends.' },
    { id: '3', name: 'UI/UX Design Showcase', description: 'Explore stunning UI/UX design examples.' },
    { id: '3', name: 'UI/UX Design Showcase', description: 'Explore stunning UI/UX design examples.' },
    { id: '3', name: 'UI/UX Design Showcase', description: 'Explore stunning UI/UX design examples.' },
    { id: '3', name: 'UI/UX Design Showcase', description: 'Explore stunning UI/UX design examples.' },
    { id: '3', name: 'UI/UX Design Showcase', description: 'Explore stunning UI/UX design examples.' },
    { id: '3', name: 'UI/UX Design Showcase', description: 'Explore stunning UI/UX design examples.' },
    { id: '3', name: 'UI/UX Design Showcase', description: 'Explore stunning UI/UX design examples.' },
    { id: '3', name: 'UI/UX Design Showcase', description: 'Explore stunning UI/UX design examples.' },
    { id: '3', name: 'UI/UX Design Showcase', description: 'Explore stunning UI/UX design examples.' },
    { id: '3', name: 'UI/UX Design Showcase', description: 'Explore stunning UI/UX design examples.' },
    { id: '3', name: 'UI/UX Design Showcase', description: 'Explore stunning UI/UX design examples.' },
    { id: '3', name: 'UI/UX Design Showcase', description: 'Explore stunning UI/UX design examples.' },
    { id: '3', name: 'UI/UX Design Showcase', description: 'Explore stunning UI/UX design examples.' },
    { id: '3', name: 'UI/UX Design Showcase', description: 'Explore stunning UI/UX design examples.' },
    { id: '3', name: 'UI/UX Design Showcase', description: 'Explore stunning UI/UX design examples.' },
    // Add more related collections
];

const SingleCollectionView = () => {
    const { collectionId } = useParams();
    const collection = sampleCollection; // Replace with actual data fetching logic

    return (
        <div className="container mx-auto p-[1rem] flex flex-col gap-[1.5rem] ">

            <RelatedCollectionSlider />

            <div className="flex flex-col gap-[8px] ">
                <div className="flex justify-between items-center ">
                    <h1 className="text-3xl font-bold mb-4 text-dark-slate-blue ">{collection.name}</h1>
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
                <p className="text-gray-600 mb-6">{collection.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                {collection.snippets.map((snippet, index) => (
                    <Code code={snippet} key={index} />
                ))}
            </div>

        </div>
    );
};

export default SingleCollectionView;
