import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Modal, Tooltip } from '@mui/material';
import CreateGroupModal from './Create'; // Import your CreateGroupModal component
import GroupCard from './GroupCard'; // Import your GroupCard component
import { Add, Close, Filter, Search } from '@mui/icons-material';
import { Path } from '../../utils/Components';
import { Group, User } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { createGroup, getGroups } from '../../redux/actions/group';


const Groups = () => {

    /////////////////////////////////// VARIABLES /////////////////////////////////////
    const { groups }: { groups: Group[] } = useSelector((state: RootState) => state.group)
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const segments = [
        { name: 'Home', link: '/home' },
        { name: 'Groups', link: '/groups' },
    ];

    /////////////////////////////////// STATES /////////////////////////////////////
    const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    /////////////////////////////////// USE EFFECTS /////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getGroups(groups.length == 0))
    }, [])
    // the longer you know somebody, the more curse you are to see them as human

    /////////////////////////////////// FUNCTIONS /////////////////////////////////////
    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredGroups = groups.filter((group: Group) => {
        if (filter === 'all') {
            return group
        } else if (filter === 'joined') {
            return group.members.findIndex(memberId => memberId === loggedUser?._id) != -1
        } else if (filter === 'available') {
            return group.members.findIndex(memberId => memberId === loggedUser?._id) == -1
        }
        return true;
    });

    return (
        <div className="container mx-auto p-4">

            <CreateGroupModal open={openCreateModal} setOpen={setOpenCreateModal} />

            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <Path segments={segments} />
                    <h1 className="text-3xl font-bold mb-6 text-dark-slate-blue">Groups</h1>
                </div>
                <Tooltip title="Create Group" placement="top">
                    <button
                        onClick={() => setOpenCreateModal(true)}
                        className="bg-teal-blue text-white rounded-full px-3 py-3 hover:bg-teal-blue-dark transition-colors duration-300 flex items-center"
                    >
                        <Add />
                    </button>
                </Tooltip>
            </div>

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
                        <Filter />
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
                        <Search />
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGroups.map((group: Group, index: number) => (
                    <GroupCard key={index} group={group} />
                ))}
            </div>
        </div>
    );
};

export default Groups;



{/* <svg
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
</svg> */}
{/* <svg
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
</svg> */}