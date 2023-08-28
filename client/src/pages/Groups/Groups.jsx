import React, { useState } from 'react';
import { Button, Modal } from '@mui/material';
import CreateGroupModal from './Create'; // Import your CreateGroupModal component
import GroupCard from './GroupCard'; // Import your GroupCard component
import { Add, Close } from '@mui/icons-material';
import { Path } from '../../utils/Components';


const Groups = () => {

    /////////////////////////////////// VARIABLES /////////////////////////////////////
    const sampleGroupsData = [
        { id: 1, name: 'Web Developers', members: 1, isJoined: true },
        { id: 2, name: 'Design Enthusiasts', members: 2, isJoined: false },
        { id: 3, name: 'JavaScript Lovers', members: 3, isJoined: true },
        { id: 4, name: 'Python Programmers', members: 4, isJoined: false },
        { id: 5, name: 'Data Science Experts', members: 5, isJoined: true },
        { id: 6, name: 'Frontend Warriors', members: 6, isJoined: false },
        { id: 7, name: 'Backend Ninjas', members: 7, isJoined: true },
        { id: 8, name: 'UI/UX Designers', members: 8, isJoined: false },
        { id: 9, name: 'AI Enthusiasts', members: 9, isJoined: true },
        { id: 10, name: 'Blockchain Developers', members: 1010, isJoined: false },
        { id: 11, name: 'Mobile App Devs', members: 1111, isJoined: true },
        { id: 12, name: 'Game Developers', members: 1212, isJoined: false },
        { id: 13, name: 'Full Stack Gurus', members: 1313, isJoined: true },
        { id: 14, name: 'Tech Innovators', members: 1414, isJoined: false },
        { id: 15, name: 'Open Source Advocates', members: 1515, isJoined: true },
        { id: 16, name: 'Cloud Computing Pros', members: 1616, isJoined: false },
        { id: 17, name: 'Networking Geeks', members: 1717, isJoined: true },
        { id: 18, name: 'Cybersecurity Experts', members: 1818, isJoined: false },
        { id: 19, name: 'Startup Founders', members: 1919, isJoined: true },
        { id: 20, name: 'Digital Marketers', members: 2020, isJoined: false },
        { id: 21, name: 'Artificial Intelligence', members: 2121, isJoined: true },
        { id: 22, name: 'Machine Learning', members: 2222, isJoined: false },
        { id: 23, name: 'Big Data Analytics', members: 2323, isJoined: true },
        { id: 24, name: 'IoT Innovators', members: 2424, isJoined: false },
        { id: 25, name: 'DevOps Masters', members: 2525, isJoined: true },
        { id: 26, name: 'Software Architects', members: 2626, isJoined: false },
        { id: 27, name: 'Tech Enthusiasts', members: 2727, isJoined: true },
        { id: 28, name: 'Coding Enthusiasts', members: 2828, isJoined: false },
        { id: 29, name: 'Gaming Community', members: 2929, isJoined: true },
        { id: 30, name: 'Creative Designers', members: 3030, isJoined: false },
    ];
    const segments = [
        { name: 'Home', link: '/home' },
        { name: 'Groups', link: '/groups' },
    ];

    /////////////////////////////////// STATES /////////////////////////////////////
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sampleGroups, setSampleGroups] = useState(sampleGroupsData)

    /////////////////////////////////// FUNCTIONS /////////////////////////////////////
    const handleCreateGroup = (newGroup) => {
        const updatedGroups = [...sampleGroups, { id: sampleGroups.length + 1, ...newGroup, isJoined: false }];
        setCreateModalOpen(false);
        setFilter('all');
        setSearchQuery('');
        setSampleGroups(updatedGroups);
    };

    const handleJoinLeaveGroup = (groupId) => {
        const updatedGroups = sampleGroups.map(group =>
            group.id === groupId ? { ...group, isJoined: !group.isJoined } : group
        );
        setSampleGroups(updatedGroups);
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const toggleCreateModal = () => {
        setCreateModalOpen(prevState => !prevState);
    };

    const filteredGroups = sampleGroups.filter(group => {
        if (filter === 'all') {
            return group.name.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (filter === 'joined') {
            return group.isJoined && group.name.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (filter === 'available') {
            return !group.isJoined && group.name.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
    });

    return (
        <div className="container mx-auto p-4">

            <Path segments={segments} />

            <h1 className="text-3xl font-bold mb-6 text-dark-slate-blue">Groups</h1>
            {/* Add Group Button */}
            <button
                onClick={toggleCreateModal}
                className="fixed bottom-6 right-6 bg-teal-blue text-white p-3 rounded-full shadow-lg hover:bg-teal-blue-dark transition-colors duration-300"
            >
                {createModalOpen ? <Close /> : <Add />}
            </button>

            <div className="flex justify-between items-center mb-4">
                <div className="relative">
                    <select
                        value={filter}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-blue-dark focus:border-transparent"
                    >
                        <option value="all">All Groups</option>
                        <option value="joined">Joined Groups</option>
                        <option value="available">Available Groups</option>
                    </select>
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#7B93A4"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </span>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search groups..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-blue-dark focus:border-transparent"
                    />
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#7B93A4"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGroups.map(group => (
                    <GroupCard
                        key={group.id}
                        group={group}
                        onToggleMembership={() => handleJoinLeaveGroup(group.id)}
                    />
                ))}
            </div>
            <CreateGroupModal
                open={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onCreateGroup={handleCreateGroup}
            />
        </div>
    );
};

export default Groups;



