import React, { ChangeEvent, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Add, Favorite, Filter, Search } from '@mui/icons-material';
import { Pagination, Tooltip } from '@mui/material';
import Rightbar from './Rightbar';
import { Path } from '../../utils/Components';
import CollectionCard from './CollectionCard';
import { getCollections, getUserCollections } from '../../redux/actions/collection';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Collection, User } from '../../interfaces';
import UpdateCollection from './Update';
import CreateCollection from './Create';
import { useCollectionModal } from '../../hooks/useCollectionModal';

const Collections: React.FC = () => {
    ////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { collections, userCollections, isFetching } = useSelector((state: RootState) => state.collection);
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user);
    const { onOpen } = useCollectionModal()
    const segments = [
        { name: 'Home', link: '/home' },
        { name: 'Collections', link: '/collections' },
    ];
    const pageSize = 5;
    const maxLength = 50;
    const totalPages = Math.ceil(maxLength / pageSize);

    ////////////////////////////////////////////// STATES ////////////////////////////////////////////////////
    const [filter, setFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [page, setPage] = useState<number>(1)

    ////////////////////////////////////////////// useEffects ////////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getCollections(`?page=${page}&pageSize=${pageSize}`));
        dispatch<any>(getUserCollections(loggedUser?._id as string));
    }, []);
    useEffect(() => {
        // TODO: if data of particular page is available then dont call api
        fetchMore()
    }, [page])

    /////////////////////////////////////// FUNCTIONS /////////////////////////////////////////
    const fetchMore = async () => {
        dispatch<any>(getCollections(`?page=${page}&pageSize=${pageSize}`))
    }

    const handleFilterChange = (newFilter: string) => {
        setFilter(newFilter);
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="flex w-full ">

            <CreateCollection />
            <UpdateCollection />

            <div className=" lg:w-[75%] w-full p-[1rem]">

                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <Path segments={segments} />
                        <h1 className="text-3xl font-bold mb-6 text-dark-slate-blue">Collection</h1>
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
                            <option value="all">All Collection</option>
                            <option value="joined">Joined Collection</option>
                            <option value="available">Available Collection</option>
                        </select>
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <Filter />
                        </span>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search collection..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-blue-dark focus:border-transparent"
                        />
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <Search />
                        </span>
                    </div>
                </div>

                {
                    isFetching
                        ?
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                Array(9).fill("")?.map((_, index) => (
                                    <CollectionCard.Skeleton key={index} />
                                ))
                            }
                        </div>
                        :
                        <div className="w-full flex flex-col gap-[2rem] ">
                            <div className="flex flex-col">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {userCollections.map((collection: Collection, index: number) => (
                                        <CollectionCard collection={collection} key={index} />
                                    ))}
                                </div>
                            </div>

                            {/* Other Collections */}
                            <div className="flex flex-col">
                                <h2 className="text-3xl font-bold mb-6 text-dark-slate-blue">Suggested To You</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {collections.map((collection: Collection, index: number) => (
                                        <Card
                                            key={index}
                                            className="bg-cool-gray-light p-[1rem] rounded shadow-md transition-transform transform hover:scale-105"
                                        >
                                            <CardContent>
                                                <Typography variant="h6" component="h3" className="text-dark-slate-blue">
                                                    <Favorite fontSize="small" style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
                                                    {collection.name}
                                                </Typography>
                                                <Typography variant="body2" className="text-cool-gray-dark max-lines-10">
                                                    {collection.description}
                                                </Typography>
                                                <Link
                                                    to={`/collections/${collection._id}`}
                                                    className="cursor-pointer text-teal-blue hover:text-teal-blue-dark hover:underline transition-colors duration-300"
                                                >
                                                    View Collection
                                                </Link>
                                            </CardContent>
                                        </Card>
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
                                </div>
                            </div>
                        </div>
                }
            </div>
            <div className="hidden lg:block w-[25%] bg-cool-gray-light p-4 rounded shadow">
                <Rightbar />
            </div>
        </div>
    );
};

export default Collections;
