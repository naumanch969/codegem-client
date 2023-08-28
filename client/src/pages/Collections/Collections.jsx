import './collection.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Add, Favorite, Folder, Search } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import Rightbar from './Rightbar'
import { Path } from '../../utils/Components';
import CollectionCard from './CollectionCard';

const Collections = () => {
    const yourCollections = [
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
    ]
    const otherCollections = [
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
        { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
    ]
    const segments = [
        { name: 'Home', link: '/home' },
        { name: 'Collections', link: '/collections' },
    ];

    return (
        <div className="flex">
            <div className="w-[75%] p-[1rem] ">

                <Path segments={segments} />

                {/* Browse Collections Search Input */}
                <div className="mt-2 mb-4 flex justify-between items-center">
                    <div className="flex items-center bg-cool-gray-light p-2 rounded-md mr-4 w-[70%]">
                        <Search className="text-cool-gray-dark" />
                        <input
                            type="text"
                            placeholder="Browse Collections..."
                            className="ml-2 bg-transparent border-none outline-none focus:ring-0 placeholder-cool-gray-dark w-full"
                        />
                    </div>
                    <Tooltip title="Create Collection" placement='top' >
                        <button
                            className="bg-teal-blue text-white rounded-full px-3 py-3 hover:bg-teal-blue-dark transition-colors duration-300 flex items-center"
                        >
                            <Add />
                        </button>
                    </Tooltip>
                </div>

                <div className="w-full flex flex-col gap-[2rem] ">
                    {/* Your Collections */}
                    <div className="flex flex-col">
                        <h2 className="text-3xl font-bold mb-6 text-dark-slate-blue">Your Collections</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {yourCollections.map((collection, index) => (
                             <CollectionCard collection={collection} key={index} />
                            ))}
                        </div>
                    </div>


                    {/* Other Collections */}
                    <div className="flex flex-col">
                        <h2 className="text-3xl font-bold mb-6 text-dark-slate-blue">Other Collections</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {otherCollections.map((collection, index) => (
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
