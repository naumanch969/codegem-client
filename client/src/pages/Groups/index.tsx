import React, { ChangeEvent, useEffect, useState } from 'react';
import { Pagination, Tooltip } from '@mui/material';
import CreateGroup from './Create';
import GroupCard from './GroupCard';
import { Add, Filter, Search } from '@mui/icons-material';
import { Path } from '../../utils/Components';
import { Group, User } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getGroups } from '../../redux/actions/group';
import { useGroupModal } from '../../hooks/useGroupModal';
import UpdateGroup from './Update';


const Groups = () => {

    /////////////////////////////////// VARIABLES /////////////////////////////////////
    const { groups, isFetching }: { groups: Group[], isFetching: boolean } = useSelector((state: RootState) => state.group)
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const { onOpen } = useGroupModal()
    const segments = [
        { name: 'Home', link: '/home' },
        { name: 'Groups', link: '/groups' },
    ];
    const pageSize = 5;
    const maxLength = 50;
    const totalPages = Math.ceil(maxLength / pageSize);

    /////////////////////////////////// STATES /////////////////////////////////////
    const [filter, setFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [page, setPage] = useState<number>(1)

    /////////////////////////////////// USE EFFECTS /////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getGroups(groups.length == 0, `?page=${page}&pageSize=${pageSize}`))
    }, [])
    // the longer you know somebody, the more curse you are to see them as human
    useEffect(() => {
        // TODO: if data of particular page is available then dont call api
        fetchMore()
    }, [page])

    /////////////////////////////////////// FUNCTIONS /////////////////////////////////////////
    const fetchMore = async () => {
        dispatch<any>(getGroups(groups.length == 0, `?page=${page}&pageSize=${pageSize}`))
    }
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

            <CreateGroup />
            <UpdateGroup />

            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <Path segments={segments} />
                    <h1 className="text-3xl font-bold mb-6 text-dark-slate-blue">Groups</h1>
                </div>
                <Tooltip title="Create Group" placement="top">
                    <button
                        onClick={onOpen}
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
                {
                    isFetching
                        ?
                        Array(9).fill("")?.map((_, index) => (
                            <GroupCard.Skeleton key={index} />
                        ))
                        :
                        <>
                            {filteredGroups.map((group: Group, index: number) => (
                                <GroupCard key={index} group={group} />
                            ))}
                            <div className="w-full flex justify-center">
                                <Pagination
                                    count={totalPages}
                                    defaultPage={1}
                                    page={page}
                                    siblingCount={0}
                                    onChange={(e: any, page: number) => setPage(page)}
                                    size='large'
                                />
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default Groups;