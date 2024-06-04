import React, { useState } from 'react';
import Friends from './Friends'
import Menubar from './Menubar';
import SuggestedFriends from './SuggestedFriends';
import SentRequests from './SentRequests';
import ReceivedRequests from './ReceivedRequests';
import Find from './Find';
import { useDispatch } from 'react-redux';
import { searchFriends, searchUsers } from '@/redux/actions/friend';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const FriendsPage = () => {

    ////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
    const dispatch = useDispatch()
    const pageSize = 20;
    const maxLength = 50;
    const totalPages = Math.ceil(maxLength / pageSize);

    ////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
    const [searchValue, setSearchValue] = useState<string>('');
    const [searchedQuery, setSearchedValue] = useState<string>('');
    const [activeMenuItem, setActiveMenuItem] = useState<string>('find');
    const [page, setPage] = useState<number>(1)

    ////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////


    ////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////
    const onSearch = () => {
        setSearchedValue(searchValue)
        if (activeMenuItem == 'find')
            dispatch<any>(searchUsers(true, `?page=${page}&pageSize=${pageSize}&count=${true}&query=${searchValue}`))
        else
            dispatch<any>(searchFriends(true, `?page=${page}&pageSize=${pageSize}&count=${true}&query=${searchValue}`))
    }

    return (
        <div className="p-6 flex flex-col gap-4 w-full ">

            <div className="flex justify-between items-center w-full">
                <h1 className="text-3xl font-bold text-dark-slate-blue " >
                    Friends {searchedQuery && <span className="font-medium"> {" > "} <span className='text-teal-blue ' >{searchedQuery}</span></span>}
                </h1>
                <div className="relative w-1/3 ">
                    <Input
                        placeholder="Search Friends..."
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

            {activeMenuItem === 'find' && <Find totalPages={totalPages} page={page} setPage={setPage} pageSize={pageSize} />}
            {activeMenuItem === 'friends' && <Friends totalPages={totalPages} page={page} setPage={setPage} pageSize={pageSize} />}
            {activeMenuItem === 'suggested' && <SuggestedFriends totalPages={totalPages} page={page} setPage={setPage} pageSize={pageSize} />}
            {activeMenuItem === 'sent' && <SentRequests totalPages={totalPages} page={page} setPage={setPage} pageSize={pageSize} />}
            {activeMenuItem === 'received' && <ReceivedRequests totalPages={totalPages} page={page} setPage={setPage} pageSize={pageSize} />}

        </div>
    );
};

export default FriendsPage;
