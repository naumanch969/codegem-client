import React, { useState } from 'react';
import { Check, Delete, Visibility, Clear } from '@mui/icons-material';
import NotificationCard from '../../Notifications/NotificationCard';

const Notifications = () => {
  // Sample notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Your post got 10 likes', timestamp: '5 hours ago', isRead: true },
    { id: 2, text: 'New message from User123', timestamp: '2 hours ago', isRead: false },
    { id: 3, text: 'New message from User456', timestamp: '2 hours ago', isRead: false },
    // Add more sample notifications
  ]);

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

  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const handleDismissAll = () => {
    setNotifications([]);
  };

  return (
    <div className="mx-auto p-4">
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

export default Notifications;
