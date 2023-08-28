import { Visibility } from '@mui/icons-material';
import React from 'react'

const NotificationCard = ({ notification }) => {

    const handleMarkAsRead = (id) => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notification =>
                notification.id === id ? { ...notification, isRead: true } : notification
            )
        );
    };

    const handleDeleteNotification = (id) => {
        setNotifications(prevNotifications =>
            prevNotifications.filter(notification => notification.id !== id)
        );
    };


    return (
        <div
            className={`p-4 border rounded shadow-lg ${notification.isRead ? 'bg-white' : 'bg-light-gray'
                } hover:scale-105 transition-all duration-300`}
        >
            <p className={`text-lg font-semibold ${notification.isRead ? 'text-gray-800' : 'text-teal-blue'
                } mb-3`}>
                {notification.text}
            </p>
            <p className={`text-gray-500 ${notification.isRead ? 'text-gray-600' : 'text-teal-blue'
                } mb-3`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dolor vitae risus cursus vestibulum.
            </p>
            <div className="flex justify-between items-center">
                <button onClick={() => handleDeleteNotification(notification.id)} className="text-red-500 hover:text-red-700">
                    Delete
                </button>
                {!notification.isRead && (
                    <button onClick={() => handleMarkAsRead(notification.id)} className="text-teal-blue hover:text-teal-blue-dark">
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