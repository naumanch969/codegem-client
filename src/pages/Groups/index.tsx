import React, { ChangeEvent, useEffect, useState } from 'react';
import { Pagination, Tooltip } from '@mui/material';
import GroupCard from './GroupCard';
import { Add, Filter, Search } from '@mui/icons-material';
import { Path } from '../../utils/Components';
import { Group, User } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getGroups } from '../../redux/actions/group';
import { useGroupModal } from '../../hooks/useGroupModal';
import { programmingLanguages } from '@/constant';
import { Combobox } from '@/components/ui/combobox';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { empty } from '@/assets';
import qs from "query-string";
import { Button } from '@/components/ui/button';

const Groups = () => {

    /////////////////////////////////// VARIABLES /////////////////////////////////////
    const { groups, isFetching, count }: { groups: Group[], isFetching: boolean, count: number } = useSelector((state: RootState) => state.group)
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()
    const { onOpen } = useGroupModal()
    const segments = [
        { name: 'Home', link: '/home' },
        { name: 'Groups', link: '/groups' },
    ];
    const pageSize = 20;
    const totalPages = Math.ceil(count / pageSize);

    /////////////////////////////////// STATES /////////////////////////////////////
    const [filter, setFilter] = useState<string>('all');
    const [searchValue, setSearchValue] = useState<string>('');
    const [page, setPage] = useState<number>(1)
    const [languages, setLanguages] = useState<string[]>([])
    const [searchedQuery, setSearchedQuery] = useState<string>('')

    /////////////////////////////////// USE EFFECTS /////////////////////////////////////
    useEffect(() => {
        fetch({ loading: groups.length == 0, count: true })
    }, [])
    // the longer you know somebody, the more curse you are to see them as human
    useEffect(() => {
        // TODO: if data of particular page is available then dont call api
        fetch({ loading: true })
    }, [searchedQuery, languages, page])

    /////////////////////////////////////// FUNCTIONS /////////////////////////////////////////
    const fetch = ({ loading = false, count = false }: { loading?: boolean, count?: boolean }) => {
        const languagesString = languages.join(',')
        const query = qs.stringifyUrl(
            { url: '', query: { page, pageSize, query: searchValue, languages: languagesString, count } },
            { skipEmptyString: true, skipNull: true }
        );
        dispatch<any>(getGroups(loading, query))
        setSearchedQuery(searchValue)
    }
    const onLanguageFilter = (value: string) => {
        setLanguages(pre => pre.filter(item => item.toLowerCase() != value.toLowerCase()))
    }
    const onLanguageSelect = (value: string) => {
        const isExist = languages.find(l => l.toLowerCase() == value.toLowerCase())
        if (isExist)
            onLanguageFilter(value)
        else
            setLanguages((pre: string[]) => ([...pre, value]))
    }
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
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

            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <Path segments={segments} />
                    <h1 className="text-3xl font-bold mb-6 text-blackish">Groups</h1>
                </div>
                <Button onClick={onOpen} variant="default">
                    <Add /> <span className="" >Add Group</span>
                </Button>
            </div>

            <div className="flex flex-col mb-4 ">
                <div className="flex justify-between items-center mb-4">
                    <div className="relative w-1/3 ">
                        <Input
                            type="text"
                            placeholder="Search groups..."
                            value={searchValue}
                            onKeyDown={(e) => e.key == 'Enter' && fetch({ loading: true })}
                            onChange={handleSearchChange}
                            className="w-full px-4 py-2 "
                        />
                        <button title='Search' onClick={() => fetch({ loading: true })} className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <Search />
                        </button>
                    </div>
                    <div className="relative">
                        <Combobox
                            items={programmingLanguages}
                            onFilter={(value: string) => onLanguageFilter(value)}
                            onSelect={(value: string) => onLanguageSelect(value)}
                            selected={languages}
                            emptyString='No language found'
                            placeholder='Language'
                            className=''
                            showBadges={false}
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <Filter />
                        </span>
                    </div>
                </div>
                {(searchedQuery || languages.length > 0) &&
                    <div className="flex justify-start items-center flex-wrap gap-2">
                        <span className='text-lg text-muted-foreground' >Filters: </span>
                        {
                            searchedQuery &&
                            <Badge className="flex items-center gap-1 capitalize" >
                                {searchedQuery}
                                <X
                                    onClick={(event) => { event.stopPropagation(); setSearchedQuery(''); setSearchValue('') }}
                                    className="w-4 h-4 rounded-full cursor-pointer"
                                />
                            </Badge>
                        }
                        {
                            languages.map((s: string, i: number) =>
                                <Badge variant='secondary' key={i} className="flex items-center gap-1 uppercase" >
                                    {s}
                                    <X
                                        onClick={(event) => { event.stopPropagation(); onLanguageFilter(s); }}
                                        className="w-4 h-4 rounded-full cursor-pointer"
                                    />
                                </Badge>
                            )
                        }
                    </div>
                }
            </div>

            <div className='w-full flex flex-col gap-y-8'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        isFetching
                            ?
                            Array(9).fill("")?.map((_, index) => (
                                <GroupCard.Skeleton key={index} />
                            ))
                            :
                            filteredGroups.length == 0
                                ?
                                <div className='col-span-3 flex flex-col justify-center items-center grayscale '>
                                    <img src={empty} alt='Empty' className='w-96 h-96 grayscale ' />
                                    <span className='text-foreground text-center text-lg font-semibold ' >Nothing Found.</span>
                                    <span className='text-muted-foreground text-center text-md ' >It's our fault not yours.</span>
                                </div>
                                :
                                filteredGroups.map((group: Group, index: number) => (
                                    <GroupCard key={index} group={group} />
                                ))
                    }
                </div>
                {
                    totalPages > 1 &&
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
                }
            </div>
        </div>
    );
};

export default Groups;