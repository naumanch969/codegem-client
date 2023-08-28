import React from 'react';
import { useParams } from 'react-router-dom'; // Import necessary routing components
import Code from '../Codes/Code';
import { Group, Person, Code as CodeIcon, ExitToApp, Edit } from '@mui/icons-material';
import { Path } from '../../utils/Components';

const SingleGroup = () => {
    //////////////////////////////////// VARIABLES ////////////////////////////////////
    const { groupId } = useParams(); // Get the groupId parameter from the URL
    const segments = [
        { name: 'Home', link: '/home' },
        { name: 'Groups', link: '/groups' },
        { name: 'Web Developers', link: `/groups/${groupId}` },
    ];
    const groupDetails = {
        id: 1,
        name: 'Web Developers',
        description: 'A community for web development enthusiasts to discuss technologies, share projects, and learn together.',
        members: 100,
        codesLength: 50,
        admins: ['User123', 'Admin456'],
        categories: ['Web Development', 'Frontend', 'Backend'],
        location: 'Online',
        establishedYear: 2010,
        isMember: true,
        isAdmin: true,
    };
    const sampleCodes = [
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
    ]

    //////////////////////////////////// VARIABLES ////////////////////////////////////


    return (
        <div className="container mx-auto p-4">

            <Path segments={segments} />

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-4">{groupDetails.name}</h1>
                <p className="text-gray-600 mb-4">{groupDetails.description}</p>
                <div className="flex items-center mb-4">
                    <p className="text-teal-blue mr-2">{groupDetails.members} Members</p>
                    <p className="text-gray-500">{groupDetails.codesLength} Codes Shared</p>
                </div>
                <div className="flex items-center mb-4">
                    <Person className="text-gray-500 mr-2" />
                    <p className="text-teal-blue">{groupDetails.admins.join(', ')}</p>
                </div>
                <div className="flex items-center mb-4">
                    <CodeIcon className="text-gray-500 mr-2" />
                    <p className="text-teal-blue">{groupDetails.categories.join(', ')}</p>
                </div>
                <div className="flex items-center mb-4">
                    <Group className="text-gray-500 mr-2" />
                    <p className="text-teal-blue">{groupDetails.location}</p>
                </div>
                <div className="flex items-center mb-4">
                    <p className="text-gray-500 mr-2">Established:</p>
                    <p className="text-teal-blue">{groupDetails.establishedYear}</p>
                </div>
                <div className="flex justify-between items-center">
                    {groupDetails.isMember ? (
                        <button className="px-4 py-2 bg-teal-blue text-white rounded-lg hover:bg-teal-blue-dark">
                            Leave Group <ExitToApp className="ml-1" />
                        </button>
                    ) : (
                        <button className="px-4 py-2 bg-teal-blue text-white rounded-lg hover:bg-teal-blue-dark">
                            Join Group
                        </button>
                    )}
                    {groupDetails.isAdmin && (
                        <button className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400">
                            Edit Group <Edit className="ml-1" />
                        </button>
                    )}
                </div>
            </div>


            <h2 className="text-2xl font-bold mt-8 mb-4">Group Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleCodes.map((code, index) => (
                    <Code key={index} code={code} />
                ))}
            </div>

        </div>
    );
};

export default SingleGroup;
