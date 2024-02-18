import React, { useEffect } from 'react';
import NotificationCard from '../../Notifications/NotificationCard';
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications } from '@/redux/actions/notification';
import { Notification } from '@/interfaces';
import { RootState } from '@/redux/store';

const Notifications = () => {

  const { notifications, isFetching }: { notifications: Notification[], isFetching: boolean } = useSelector((state: RootState) => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch<any>(getNotifications())
  }, [])

  const handleMarkAsRead = (id: string) => {

  };

  const handleDeleteNotification = (id: string) => {

  };

  const handleMarkAllAsRead = () => {

  };

  const handleDismissAll = () => {

  };

  return (
    <div className="mx-auto p-4 w-full ">
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
        {
          isFetching
            ?
            Array(6).fill('').map((_, index) => (
              <NotificationCard.Skeleton key={index} />
            ))
            :
            notifications.map((notification, index) => (
              <NotificationCard notification={notification} key={index} />
            ))
        }
      </div>
    </div>
  );
};

export default Notifications;
