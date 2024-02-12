import Cookie from "js-cookie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment, Notification, User } from "../../interfaces";

interface InitialState {
  isFetching: boolean;
  error: string;
  notifications: Notification[];
  currentNotification: Notification | null;
}

const initialState: InitialState = {
  notifications: [],
  isFetching: false,
  error: "",
  currentNotification: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    start: (state) => {
      state.isFetching = true;
    },
    end: (state) => {
      state.isFetching = false;
    },
    error: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    getNotificationsReducer: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },
    getNotificationReducer: (state, action: PayloadAction<Notification>) => {
      state.currentNotification = action.payload;
    },
    createNotificationReducer: (state, action: PayloadAction<Notification>) => {
      state.notifications = [action.payload, ...state.notifications];
    },
    markAsReadReducer: (
      state,
      action: PayloadAction<{ notificationId: string }>
    ) => {
      state.notifications = state.notifications.map(
        (notification: Notification) =>
          (notification =
            notification._id == action.payload.notificationId
              ? { ...notification, isRead: true }
              : notification)
      );
    },
    markAllAsReadReducer: (
      state,
      action: PayloadAction<{ loggedUserId: string }>
    ) => {
      state.notifications = state.notifications.map(
        (notification: Notification) =>
          (notification =
            (notification.user as User)._id == action.payload.loggedUserId ||
            (notification.user as string) == action.payload.loggedUserId
              ? { ...notification, isRead: true }
              : notification)
      );
    },
    deleteNotificationReducer: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification._id != action.payload //action.payload = notificationId
      );
    },
    deleteNotificationsReducer: (state) => {
      state.notifications = [];
    },
  },
});

export default notificationSlice.reducer;
export const {
  start,
  end,
  error,
  getNotificationsReducer,
  getNotificationReducer,
  createNotificationReducer,
  markAllAsReadReducer,
  markAsReadReducer,
  deleteNotificationReducer,
  deleteNotificationsReducer,
} = notificationSlice.actions;
