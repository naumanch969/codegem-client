import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Add, Favorite, Folder, Search } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import CollectionCard from '../../Collections/CollectionCard';

const Collections = () => {
  const yourCollections = [
    { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
    { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
    { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
    { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
    { _id: '4', name: 'likes', description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, nobis repudiandae cum ducimus neque inventore sequi ad pariatur laborum odio, quo consequuntur omnis tempora dolor modi. Itaque quos aliquid debitis!' },
  ]


  return (

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

    </div>
  );
};

export default Collections;