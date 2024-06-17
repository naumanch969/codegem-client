import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { getProfile } from '@/redux/reducers/userSlice';

const ProfilePage = () => {

    const dispatch = useDispatch()
    const [activeMenuItem, setActiveMenuItem] = useState('about');

    useEffect(() => {
        dispatch<any>(getProfile())
    }, [])

    return (
        <div className="container mx-auto p-4 w-full flex flex-col gap-8 ">

            <ProfileHeader />
            <PeopleYouMayKnow />

            <div className="flex flex-col gap-4 ">
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