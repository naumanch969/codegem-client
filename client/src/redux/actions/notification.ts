import { Dispatch } from "redux";
import {
  start,
  end,
  error,
  getNotificationsReducer,
  createNotificationReducer,
  markAllAsReadReducer,
  markAsReadReducer,
  deleteNotificationReducer,
  deleteNotificationsReducer,
} from "../reducers/notification";
import * as api from "../api";

export const getNotification =
  (notificationId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      const { data } = await api.getNotification(notificationId);
      dispatch(getNotificationsReducer(data));
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };

export const getNotifications = () => async (dispatch: Dispatch) => {
  try {
    dispatch(start());
    const { data } = await api.getNotifications();
    dispatch(getNotificationsReducer(data));
    dispatch(end());
  } catch (err: any) {
    err.response?.data?.message
      ? dispatch(error(err.response.data.message))
      : dispatch(error(err.message));
  }
};

export const createNotification =
  (
    notificationData: any,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      const { data } = await api.createNotification(notificationData);
      dispatch(createNotificationReducer(data));
      setOpen(false);
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };

export const markAsRead =
  (notificationId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      await api.markAsRead(notificationId);
      dispatch(markAsReadReducer({ notificationId }));
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };

export const markAllAsRead =
  (loggedUserId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      await api.markAllAsRead();
      dispatch(markAllAsReadReducer({ loggedUserId }));
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };

export const deleteNotification =
  (notificationId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      dispatch(deleteNotificationReducer(notificationId));
      await api.deleteNotification(notificationId);
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };

export const deleteNotifications = () => async (dispatch: Dispatch) => {
  try {
    dispatch(start());
    await api.deleteNotifications();
    dispatch(deleteNotificationsReducer());
    dispatch(end());
  } catch (err: any) {
    err.response?.data?.message
      ? dispatch(error(err.response.data.message))
      : dispatch(error(err.message));
  }
};
