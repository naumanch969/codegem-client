import React, { useEffect, useState } from 'react';
import Friends from './Friends'
import Menubar from './Menubar';
import SuggestedFriends from './SuggestedFriends';
import SentRequests from './SentRequests';
import ReceivedRequests from './ReceivedRequests';
import Find from './Find';
import { useDispatch } from 'react-redux';
import { searchFriends, searchUsers } from '@/redux/reducers/friendSlice';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLocation } from 'react-router-dom';

const FriendsPage = () => {

    //////////////////  //////////////////////////////// VARIABLES //////////////////////////////////////////////////
    const dispatch = useDispatch()
    const pageSize = 20;
    const { pathname } = useLocation()
    const page = 1

    ////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchedQuery, setSearchedValue] = useState<string>('');
    const [activeMenuItem, setActiveMenuItem] = useState<'find' | 'friends' | 'suggested' | 'received' | 'sent'>('find');

    ////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////
    useEffect(() => {
        if (pathname.includes('/users/find')) setActiveMenuItem('find')
        else if (pathname.includes('/users/friends')) setActiveMenuItem('friends')
        else if (pathname.includes('/users/suggested')) setActiveMenuItem('suggested')
        else if (pathname.includes('/users/received')) setActiveMenuItem('received')
        else if (pathname.includes('/users/sent')) setActiveMenuItem('sent')
    }, [pathname])

    ////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////
    const onSearch = () => {
        setSearchedValue(searchValue)
        if (activeMenuItem == 'find')
            dispatch<any>(searchUsers(`?page=${page}&pageSize=${pageSize}&count=${true}&query=${searchValue}`))
        else
            dispatch<any>(searchFriends(`?page=${page}&pageSize=${pageSize}&count=${true}&query=${searchValue}`))
    }

    return (
        <div className="p-6 flex flex-col gap-4 w-full ">

            <div className="flex justify-between items-center w-full">
                <h1 className="text-3xl font-bold text-blackish " >
                    Users {searchedQuery && <span className="font-medium"> {" > "} <span className='text-copper ' >{searchedQuery}</span></span>}
                </h1>
                <div className="relative w-1/3 ">
                    <Input
                        placeholder={`Search`}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => e.key == 'Enter' && onSearch()}
                        className="w-full px-4 py-2"
                    />
                    <button title='Search' onClick={onSearch} className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
                        <Search />
                    </button>
                </div>
            </div>

            <div className="flex justify-center items-center w-full ">
                <Menubar activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} />
            </div>

            {activeMenuItem === 'find' && <Find searchValue={searchValue} />}
            {activeMenuItem === 'friends' && <Friends searchValue={searchValue} />}
            {activeMenuItem === 'suggested' && <SuggestedFriends searchValue={searchValue} />}
            {activeMenuItem === 'sent' && <SentRequests searchValue={searchValue} />}
            {activeMenuItem === 'received' && <ReceivedRequests searchValue={searchValue} />}

        </div>
    );
};

export default FriendsPage;
