import React, { useEffect, useState } from 'react';
import { Check, Delete, Visibility, Clear } from '@mui/icons-material';
import NotificationCard from './NotificationCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Notification as TNotification, User } from '../../interfaces';
import { deleteNotifications, getNotifications, markAllAsRead } from '../../redux/actions/notification';

const Notification = () => {

    const dispatch = useDispatch()
    const { notifications }: { notifications: TNotification[] } = useSelector((state: RootState) => state.notification)
    const { loggedUser }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)


    useEffect(() => {
        dispatch<any>(getNotifications())
    }, [])

    const handleMarkAllAsRead = () => {
        dispatch<any>(markAllAsRead(loggedUser?._id!))
    };

    const handleDismissAll = () => {
        dispatch<any>(deleteNotifications())
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-dark-slate-blue">Notifications</h1>
            <div className="flex justify-between items-center mb-4">
                <button
                    className="text-teal-blue hover:text-teal-blue-dark"
                    onClick={handleMarkAllAsRead}
                >
                    Mark All as Read
                </button>
                <button
                    className="text-teal-blue hover:text-teal-blue-dark"
                    onClick={handleDismissAll}
                >
                    Dismiss All
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notifications.map((notification, index) => (
                    <NotificationCard notification={notification} key={index} />
                ))}
            </div>
        </div>
    );
};

export default Notification;
