import React, { useEffect, useState } from 'react';
import { SearchOff } from '@mui/icons-material';
import Friends from './Friends'
import Menubar from './Menubar';
import { User } from '../../interfaces';
import SuggestedFriends from './SuggestedFriends';
import SentRequests from './SentRequests';
import ReceivedRequests from './ReceivedRequests';

const FriendsPage = () => {

    ////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////

    ////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeMenuItem, setActiveMenuItem] = useState<string>('friends');

    ////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////


    ////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////
    const handleSearch = () => {
        // todo: Implement search functionality here
    };

    return (
        <div className="p-6 flex flex-col gap-[1rem] w-full ">

            <div className="flex justify-between items-center w-full">
                <h1 className="text-3xl font-bold text-dark-slate-blue " >Friends</h1>
                <div className="relative w-fit ">
                    <input
                        type="text"
                        placeholder="Search Friends..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-blue-dark focus:border-transparent"
                    />
                    <span onClick={handleSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                        <SearchOff />
                    </span>
                </div>
            </div>

            <div className="flex justify-center items-center w-full ">
                <Menubar activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} />
            </div>

            {activeMenuItem === 'friends' && <Friends />}
            {activeMenuItem === 'suggested' && <SuggestedFriends />}
            {activeMenuItem === 'sent' && <SentRequests />}
            {activeMenuItem === 'received' && <ReceivedRequests />}

        </div>
    );
};

export default FriendsPage;
