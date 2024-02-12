import { Visibility } from '@mui/icons-material';
import React from 'react'
import { Notification } from '../../interfaces';
import { useDispatch } from 'react-redux';
import { deleteNotification, markAsRead } from '../../redux/actions/notification';

const NotificationCard = ({ notification }: { notification: Notification }) => {


    const dispatch = useDispatch()

    const handleMarkAsRead = () => {
        dispatch<any>(markAsRead(notification._id))

    };

    const handleDeleteNotification = () => {
        dispatch<any>(deleteNotification(notification._id))
    };


    return (
        <div
            className={`p-4 border rounded shadow-lg ${notification.isRead ? 'bg-white' : 'bg-light-gray'
                } hover:scale-105 transition-all duration-300`}
        >
            <p className={`text-lg font-semibold ${notification.isRead ? 'text-gray-800' : 'text-teal-blue'
                } mb-3`}>
                {notification.title}
            </p>
            <p className={`text-gray-500 ${notification.isRead ? 'text-gray-600' : 'text-teal-blue'
                } mb-3`}>
                {notification.description}
            </p>
            <div className="flex justify-between items-center">
                <button onClick={handleDeleteNotification} className="text-red-500 hover:text-red-700">
                    Delete
                </button>
                {!notification.isRead && (
                    <button onClick={handleMarkAsRead} className="text-teal-blue hover:text-teal-blue-dark">
                        Mark as Read
                    </button>
                )}
                <button className="text-teal-blue hover:text-teal-blue-dark">
                    <Visibility />
                </button>
            </div>
        </div>
    )
}

export default NotificationCard