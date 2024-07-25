import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '@/redux/reducers/userSlice';
import RelatedFriends from './RelatedFriends';
import { useDispatch } from 'react-redux';
import ProfileHeader from './ProfileHeader';
import PeopleYouMayKnow from './PeopleYouMayKnow';
import MenuBar from './MenuBar';
import About from './Sections/About'
import Saved from './Sections/Saved'
import Collections from './Sections/Collections'
import Codes from './Sections/Codes'
import Groups from './Sections/Groups'
import Friends from './Sections/Friends'

const UserProfilePage = () => {

    //////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { userId } = useParams()
    const refs = { about: useRef(null), codes: useRef(null), saved: useRef(null), friends: useRef(null), collections: useRef(null), groups: useRef(null), notifications: useRef(null), settings: useRef(null), }

    //////////////////////////////////////////////////// STATES ////////////////////////////////////////////////
    const menuItems = [
        // @ts-ignore
        { label: 'About', value: 'about', onClick: () => scrollToElement(refs?.about) },
        // @ts-ignore
        { label: 'Codes', value: 'codes', onClick: () => scrollToElement(refs?.codes) },
        // @ts-ignore
        { label: 'Saved', value: 'saved', onClick: () => scrollToElement(refs?.saved) },
        // @ts-ignore
        { label: 'Collections', value: 'collections', onClick: () => scrollToElement(refs?.collections) },
        // @ts-ignore
        { label: 'Groups', value: 'groups', onClick: () => scrollToElement(refs?.groups) },
        // @ts-ignore
        { label: 'Friends', value: 'friends', onClick: () => scrollToElement(refs?.friends) },
        // @ts-ignore
        { label: 'Notifications', value: 'notifications', onClick: () => scrollToElement(refs?.notifications) },
        // @ts-ignore
        { label: 'Settings', value: 'settings', onClick: () => scrollToElement(refs?.settings) },
    ];

    //////////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getUser(userId as string))
    }, [userId])

    //////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////
    const scrollToElement = (ref: any) => {
        ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
    };

    //////////////////////////////////////////////////// RENDER ////////////////////////////////////////////////
    return (
        <div className="container mx-auto p-4 w-full flex flex-col gap-8 ">

            <ProfileHeader />
            <PeopleYouMayKnow />
            <RelatedFriends />

            <div className="grid grid-cols-7 gap-4 ">

                <div className="col-span-2">
                    <MenuBar menuItems={menuItems} isProfile={false} />
                </div>

                <div className="col-span-5 flex flex-col gap-6 ">
                    <section ref={refs.about}><About /></section>
                    <section ref={refs.codes}><Codes /></section>
                    <section ref={refs.saved}><Saved /></section>
                    <section ref={refs.collections}><Collections /></section>
                    <section ref={refs.groups}><Groups /></section>
                    <section ref={refs.friends}><Friends /></section>
                </div>
            </div>

        </div>
    );
};

export default UserProfilePage;