import React, { ChangeEvent, useEffect, useState } from 'react';
import { Add, Filter, Search } from '@mui/icons-material';
import { Pagination, Tooltip } from '@mui/material';
import Rightbar from './Rightbar';
import { Path } from '../../utils/Components';
import CollectionCard from './CollectionCard';
import { getCollections, getUserCollections, } from '../../redux/actions/collection';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Collection, User } from '../../interfaces';
import { useCollectionModal } from '../../hooks/useCollectionModal';
import qs from "query-string";
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { programmingLanguages } from '@/constant';
import { Combobox } from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import { empty } from '@/assets';
import { Button } from '@/components/ui/button';

const Collections: React.FC = () => {
    ////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { collections, userCollections, isFetching, count } = useSelector((state: RootState) => state.collection);
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user);

    const { onOpen } = useCollectionModal()
    const segments = [
        { name: 'Home', link: '/home' },
        { name: 'Collections', link: '/collections' },
    ];
    const pageSize = 20;
    const totalPages = Math.ceil(count / pageSize);

    /////////////////////////////////// STATES /////////////////////////////////////
    const [searchValue, setSearchValue] = useState<string>('');
    const [page, setPage] = useState<number>(1)
    const [languages, setLanguages] = useState<string[]>([])
    const [searchedQuery, setSearchedQuery] = useState<string>('')

    /////////////////////////////////// USE EFFECTS /////////////////////////////////////
    useEffect(() => {
        fetch({ loading: collections.length == 0, count: true })
        fetch({ loading: userCollections.length == 0, count: true, userId: loggedUser?._id! })
    }, [])
    useEffect(() => {
        fetch({ loading: true })
    }, [searchedQuery, languages, page])

    /////////////////////////////////////// FUNCTIONS /////////////////////////////////////////
    const fetch = ({ loading = false, count = false, userId }: { loading?: boolean, count?: boolean, userId?: string }) => {
        const languagesString = languages.join(',')
        const query = qs.stringifyUrl(
            { url: '', query: { page, pageSize, query: searchValue, languages: languagesString, count, userId } },
            { skipEmptyString: true, skipNull: true }
        );
        userId
            ?
            dispatch<any>(getUserCollections(loading, query))
            :
            dispatch<any>(getCollections(loading, query))
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

    return (
        <div className="flex w-full ">

            <div className=" lg:w-[75%] w-full p-4">

                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <Path segments={segments} />
                        <h1 className="text-3xl font-bold mb-6 text-blackish">Collections</h1>
                    </div>
                    <Button onClick={onOpen} variant="default">
                        <Add /> <span className="" >Add Collection</span>
                    </Button>
                </div>

                <div className="flex flex-col mb-4 ">
                    <div className="flex justify-between items-center mb-4">
                        <div className="relative w-1/3 ">
                            <Input
                                type="text"
                                placeholder="Search collections..."
                                value={searchValue}
                                onKeyDown={(e) => e.key == 'Enter' && fetch({ loading: true })}
                                onChange={handleSearchChange}
                                className="w-full px-4 py-2 "
                            />
                            <button onClick={() => fetch({ loading: true })} className="absolute right-2 top-1/2 transform -translate-y-1/2">
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
                                isMultiple={true}
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

                <div className="w-full flex flex-col gap-8 ">

                    {
                        !searchedQuery && languages.length == 0 &&
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {
                                isFetching
                                    ?
                                    Array(9).fill("")?.map((_, index) => (
                                        <CollectionCard.Skeleton key={index} />
                                    ))
                                    :
                                    userCollections.map((collection: Collection, index: number) => (
                                        <CollectionCard collection={collection} key={index} />
                                    ))
                            }
                        </div>
                    }

                    {/* Suggested Collections */}
                    <div className="flex flex-col">
                        {
                            userCollections.length != 0 &&
                            <h2 className="text-2xl font-bold mb-4 text-blackish">
                                {(searchedQuery || languages.length > 0) ? 'Search Results' : 'Suggested To You'}
                            </h2>
                        }
                        <div className="flex flex-col gap-y-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {
                                    isFetching
                                        ?
                                        Array(9).fill("")?.map((_, index) => (
                                            <CollectionCard.Skeleton key={index} />
                                        ))
                                        :
                                        collections.length == 0
                                            ?
                                            <div className='col-span-3 flex flex-col justify-center items-center grayscale '>
                                                <img src={empty} alt='Empty' className='w-96 h-96 grayscale ' />
                                                <span className='text-foreground text-center text-lg font-semibold ' >Nothing Found.</span>
                                                <span className='text-muted-foreground text-center text-md ' >It's our fault not yours.</span>
                                            </div>
                                            :
                                            collections.map((collection: Collection, index: number) => (
                                                <CollectionCard collection={collection} key={index} />
                                            ))}
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
                </div>
            </div>
            <div className="hidden lg:block w-[25%] bg-cool-gray-light p-4 rounded shadow">
                <Rightbar />
            </div>
        </div>
    );
};

export default Collections;
