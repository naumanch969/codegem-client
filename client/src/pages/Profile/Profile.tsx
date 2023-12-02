import React, { useEffect, useState } from 'react';
import { Avatar } from '@mui/material'; // Import your Avatar component
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Use React Router's Link for navigation
import { ArrowDownward } from '@mui/icons-material';
import ProfileHeader from './ProfileHeader';
import PeopleYouMayKnow from './PeopleYouMayKnow';
import MenuBar from './MenuBar';
import About from './Sections/About'
import Saved from './Sections/Saved'
import Collections from './Sections/Collections'
import Codes from './Sections/Codes'
import Groups from './Sections/Groups'
import Friends from './Sections/Friends'
import Notifications from './Sections/Notifications'
import Settings from './Sections/Settings'
import { getProfile, getUser } from '../../redux/actions/user'
import { RootState } from '../../redux/store';
import { User } from '../../interfaces';

const ProfilePage = () => {

    const dispatch = useDispatch()
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user);
    const [activeMenuItem, setActiveMenuItem] = useState('about');

    useEffect(() => {
        dispatch<any>(getProfile(loggedUser?._id as string))
    }, [])


    return (
        <div className="container mx-auto p-4 w-full flex flex-col gap-[2rem] ">

            <ProfileHeader />
            <PeopleYouMayKnow />

            <div className="flex flex-col gap-[1rem] ">
                <MenuBar activeMenuItem={activeMenuItem} setActiveMenuItem={setActiveMenuItem} />

                {activeMenuItem == 'about' && <About />}
                {activeMenuItem == 'saved' && <Saved />}
                {activeMenuItem == 'collections' && <Collections />}
                {activeMenuItem == 'codes' && <Codes />}
                {activeMenuItem == 'groups' && <Groups />}
                {activeMenuItem == 'friends' && <Friends />}
                {activeMenuItem == 'notifications' && <Notifications />}
                {activeMenuItem == 'settings' && <Settings />}
            </div>

        </div>
    );
};

export default ProfilePage;

// {/* User Details */}
// <div className="col-span-3">
//     <h2 className="text-xl font-bold mb-4">User Details</h2>
//     <div className="bg-white p-4 rounded-lg shadow-box">
//         <div className="mb-4">
//             <h3 className="text-lg font-semibold">Profile Picture</h3>
//             <img
//                 src="https://via.placeholder.com/50"
//                 alt="Profile"
//                 className="w-24 h-24 rounded-full object-cover"
//             />
//         </div>
//         <div className="mb-4">
//             <h3 className="text-lg font-semibold">Email</h3>
//             <p className="text-gray-600">user@example.com</p>
//         </div>
//         <div className="mb-4">
//             <h3 className="text-lg font-semibold">Phone</h3>
//             <p className="text-gray-600">123-456-7890</p>
//         </div>
//         <div className="mb-4">
//             <h3 className="text-lg font-semibold">Bio</h3>
//             <p className="text-gray-600">Frontend Developer | UI/UX Enthusiast</p>
//         </div>
//         <div className="mb-4">
//             <h3 className="text-lg font-semibold">Location</h3>
//             <p className="text-gray-600">New York, USA</p>
//         </div>
//         <div className="mb-4">
//             <h3 className="text-lg font-semibold">Favorite Languages</h3>
//             <ul className="list-disc pl-6 text-gray-600">
//                 <li>JavaScript</li>
//                 <li>Python</li>
//                 <li>Java</li>
//             </ul>
//         </div>
//         {/* ... Additional user details */}
//         <div className="mb-4">
//             <h3 className="text-lg font-semibold">Website</h3>
//             <a
//                 href="https://www.example.com"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-teal-blue hover:underline"
//             >
//                 www.example.com
//             </a>
//         </div>
//         <div className="mb-4">
//             <h3 className="text-lg font-semibold">Social Media</h3>
//             <div className="flex gap-4">
//                 <a
//                     href="https://www.twitter.com/example"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-teal-blue hover:underline"
//                 >
//                     Twitter
//                 </a>
//                 <a
//                     href="https://www.linkedin.com/in/example"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-teal-blue hover:underline"
//                 >
//                     LinkedIn
//                 </a>
//             </div>
//         </div>

//     </div>
// </div>