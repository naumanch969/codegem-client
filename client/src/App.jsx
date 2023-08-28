import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { Navbar, Rightbar, Sidebar } from './components';
import {
  Login, Register, Home, Friends, Groups, Collections, Notifications, Create, Profile, More, Codes, Collection, Group,
} from "./pages";
import { getAllUsers } from './redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useStateContext } from "./contexts/ContextProvider";
import Cookies from "js-cookie";

const Apps = () => {
  const dispatch = useDispatch();
  const { showSidebar } = useStateContext();
  const { loggedUser } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="w-screen min-h-screen overflow-x-hidden flex bg-light-gray text-dark-slate-blue">
      <div className="w-full h-screen overflow-y-scroll overflow-x-hidden flex flex-col">
        <div className="sticky left-0 top-0 z-50 w-full bg-dark-slate-blue text-white">
          <Navbar />
        </div>

        {/* !loggedUser
          ?
          <Routes>
            <Route exact path="/auth/login" element={<Login />} />
            <Route exact path="/auth/register" element={<Register />} />
            <Route path="/*" element={<Navigate to='/auth/login' />} />
          </Routes>
          : */}
        {
            <div className="md:w-screen flex justify-between ">
              <div style={{ height: 'calc(100vh - 4rem)' }} className={`${showSidebar ? 'lg:w-[20%] md:w-[25%]  ' : 'lg:w-[5%] md:w-[6%]'} bg-dark-slate-blue-darken text-white sticky top-[4rem] transition-all border-r-[2px] border-gray-100`}>
                <Sidebar />
              </div>

              <div className="flex bg-white text-cool-gray w-[80%] ">
                <Routes>
                  <Route path="/" element={<Navigate to='/home' />} />
                  <Route path="/home" element={<Codes />} />
                  <Route path="/auth/*" element={<Navigate to='/' />} />
                  <Route path="/Codes" element={<Codes />} />
                  <Route path={`/friends`} element={<Friends />} />
                  <Route path={`/friends/:selectedItem`} element={<Friends />} />
                  <Route path={`/friends/:selectedItem/:accountId`} element={<Friends account />} />
                  <Route path={`/groups`} element={<Groups />} />
                  <Route path={`/groups/:groupId`} element={<Group />} />
                  <Route path={`/collections`} element={<Collections />} />
                  <Route path={`/collections/:collectionId`} element={<Collection />} />
                  <Route path={`/notifications`} element={<Notifications />} />
                  <Route path={`/notifications/:notificationId`} element={<Notifications />} />
                  <Route path={`/create`} element={<Create />} />
                  <Route path={`/profile`} element={<Profile />} />
                  <Route path={`/more`} element={<More />} />
                </Routes>
              </div>
 
            </div>
        }
      </div>
    </div>
  );
}

export default Apps;
