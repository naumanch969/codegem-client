import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Login, Register, InputRegisterationOTP, Home, Friends, Groups, Collections, Notifications, Create, Profile, More, Codes, Collection, Group, UserProfile, ChangePassword, InputOTP, VerifyEmail, NewPassword, EditProfile, Streaks, Challenges, LandingPage, Contact, About, Pricing, Features } from "./pages";
import { useDispatch, useSelector } from "react-redux";
import { NotFound } from '@/components'
import { AuthWrapper, DashboardWrapper, LandingPageWrapper } from "@/wrappers";
import { RootState } from "@/redux/store";
import { Collection as TCollection } from '@/interfaces'
import { useRole } from '@/hooks/useRole';
import { adminEmail } from '@/constant';
import { getProfile, getUsers } from './redux/reducers/userSlice';

const Apps = () => {
  /////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////
  const { loggedUser } = useSelector((state: RootState) => state.user);
  const { userCollections }: { userCollections: TCollection[] } = useSelector((state: RootState) => state.collection);
  const { onSetRole } = useRole()
  const dispatch = useDispatch()

  /////////////////////////////////////////////// STATES /////////////////////////////////////////////////////

  /////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getUsers(''));
    if (userCollections.length == 0) {
      // Place User Collection
    }
  }, [userCollections]);
  useEffect(() => {
    dispatch<any>(getProfile())
  }, [])
  useEffect(() => {
    loggedUser?.email == adminEmail && onSetRole('Admin')
  }, [loggedUser])

  /////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////

  return (
    <div className={` w-screen min-h-screen overflow-x-hidden flex justify-center bg-light-grayD text-dark-slate-blue`}>
      <Routes>

        {/* Auth pages */}
        <Route path="/auth/register" element={<AuthWrapper><Register /></AuthWrapper>} />
        <Route path="/auth/verify_register_otp" element={<AuthWrapper><InputRegisterationOTP /></AuthWrapper>} />
        <Route path="/auth/login" element={<AuthWrapper><Login /></AuthWrapper>} />
        <Route path="/auth/verify_email" element={<AuthWrapper><VerifyEmail /></AuthWrapper>} />
        <Route path="/auth/verify_otp" element={<AuthWrapper><InputOTP /></AuthWrapper>} />
        <Route path="/auth/new_password" element={<AuthWrapper><NewPassword /></AuthWrapper>} />
        <Route path="/auth/change_password" element={<AuthWrapper><ChangePassword /></AuthWrapper>} />

        {/* Landing Page */}
        <Route path="/" element={<LandingPageWrapper />}>
          <Route index element={<LandingPage />} />
          <Route path='contact' element={<Contact />} />
          <Route path='about' element={<About />} />
          <Route path='features' element={<Features />} />
          <Route path='pricing' element={<Pricing />} />
        </Route>

        {/* Dashboard pages */}
        <Route path="/" element={<DashboardWrapper />}>
          <Route path="home" element={<Home />} />
          <Route path="auth/*" element={<Navigate to="/" />} />
          <Route path="codes" element={<Codes />} />
          <Route path="streaks" element={<Streaks />} />
          <Route path="challenges" element={<Challenges />} />
          <Route path={`friends`} element={<Friends />} />
          <Route path={`friends/:selectedItem`} element={<Friends />} />
          <Route path={`friends/:selectedItem/:accountId`} element={<Friends />} />
          <Route path={`groups`} element={<Groups />} />
          <Route path={`groups/:groupId`} element={<Group />} />
          <Route path={`collections`} element={<Collections />} />
          <Route path={`collections/:collectionId`} element={<Collection />} />
          <Route path={`notifications`} element={<Notifications />} />
          <Route path={`notifications/:notificationId`} element={<Notifications />} />
          <Route path={`create`} element={<Create />} />
          <Route path={`user/:userId`} element={<UserProfile />} />
          <Route path={`profile`} element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route path={`more`} element={<More />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Apps;
