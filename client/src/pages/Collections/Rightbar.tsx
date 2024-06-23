import React, { useEffect } from 'react';
import { Folder, Person2TwoTone } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Collection, User } from '../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getCollectionCategories, getPopularCollections } from '@/redux/actions/collection';
import { Edit } from 'lucide-react';

const sampleUser = {
  username: 'JohnDoe',
  email: 'john@example.com',
  profilePicture: 'https://via.placeholder.com/50',
  collectionsCount: 5,
  likedCollections: 10,
};

const RightSidebar = () => {

  const dispatch = useDispatch()
  const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)
  const { userCollections, popularCollections, categories }: { userCollections: Collection[], popularCollections: Collection[], categories: string[] } = useSelector((state: RootState) => state.collection)

  useEffect(() => {
    dispatch<any>(getCollectionCategories())
    dispatch<any>(getPopularCollections())
  }, [])

  return (
    <div className="w-full bg-gray-100 p-4 rounded shadow">
      <div className="flex flex-col items-center mb-4">
        <img src={loggedUser?.profilePicture} alt="Profile" className="w-32 h-32 rounded-full mr-2" />
        <div className='flex flex-col items-center' >
          <Link to='/profile' className="capitalize font-semibold text-gray-800 text-lg ">{loggedUser?.firstName} {loggedUser?.lastName}</Link>
          <p className="text-gray-600 ">{loggedUser?.email}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-gray-600">
          Collections Created: <span className="font-semibold text-gray-800">{userCollections.length}</span>
        </p>
        <p className="text-gray-600">
          Liked Collections: <span className="font-semibold text-gray-800">{sampleUser.likedCollections}</span>
        </p>
      </div>
      <div className="flex flex-col mb-4">
        <Link to="/more" className="text-teal-500 hover:underline flex items-center ">
          <Person2TwoTone className="mr-2" />
          Personalize
        </Link>
        <Link to="/profile" className="text-dark-slate-blue-lighten hover:underline flex items-center ">
          <Edit className="mr-2 w-5 h-5 " />
          Profile Setting
        </Link>
      </div>
      <div className="mb-4">
        <h3 className="text-dark-slate-blue font-semibold mb-2">Collection Categories</h3>
        <ul className="list-disc pl-6">
          {
            categories.map((category, index) => (
              <li className="text-gray-600" key={index} >{category}</li>
            ))
          }
        </ul>
      </div>
      <div>
        <h3 className="text-dark-slate-blue font-semibold mb-2">Popular Collections</h3>
        <ul className="list-disc">
          {
            popularCollections.map((collection, index) => (
              <li key={index} className="text-gray-600 list-none hover:underline ">
                <Link to={`/collections/${collection._id}`} >
                  <Folder className="mr-2" />
                  {collection.name}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default RightSidebar;
