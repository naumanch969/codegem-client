import React from 'react'
import { Notification } from '../../interfaces';
import { useDispatch } from 'react-redux';
import { deleteNotification, markAsRead } from '../../redux/reducers/notificationSlice';
import { Button } from '@/components/ui/button';
import { Trash, View } from 'lucide-react';
import { Tooltip } from '@mui/material';

const NotificationCard = ({ notification }: { notification: Notification }) => {

    const dispatch = useDispatch()

    const handleMarkAsRead = () => {
        dispatch<any>(markAsRead(notification._id))

    };

    const handleDeleteNotification = () => {
        dispatch<any>(deleteNotification(notification._id))
    };


    return (
        <div className={`p-4 flex flex-col justify-between border rounded shadow-lg ${notification.isRead ? 'bg-white' : 'bg-light-gray'} transition-all duration-300`} >
            <div className="flex flex-col gap-0 5">
                <p className={`text-lg font-semibold ${notification.isRead ? 'text-gray-800' : 'text-copper'} mb-3`}>
                    {notification.title}
                </p>
                <p className={`text-gray-500 flex-1 ${notification.isRead ? 'text-gray-600' : 'text-copper'} mb-3`}>
                    {notification.description}
                </p>
            </div>
            <div className="flex justify-end items-center gap-2">
                {!notification.isRead && (
                    <Tooltip title='Mark as read' placement='top' >
                        <Button variant='outline' size='sm' onClick={handleMarkAsRead} >
                            <View size={20} />
                        </Button>
                    </Tooltip>
                )}
                <Tooltip title='Mark as read' placement='top' >
                    <Button variant='destructive' size='sm' onClick={handleDeleteNotification}>
                        <Trash size={20} />
                    </Button>
                </Tooltip>
            </div>
        </div>
    )
}

export default NotificationCard

NotificationCard.Skeleton = function () {
    return (
        <div className={`w-full animate-pulse flex flex-col gap-y-3 justify-between p-4 border rounded shadow-lg bg-light-gray`}>
            <span className="h-6 w-full bg-warm-gray-dark rounded" />
            <span className="h-6 w-full bg-warm-gray-dark rounded" />
            <div className="flex justify-end items-center gap-2 w-full h-4 ">
                <span className="h-4 w-[30%] bg-warm-gray-dark rounded" />
                <span className="h-4 w-[30%] bg-warm-gray-dark rounded" />
            </div>
        </div>
    )
}