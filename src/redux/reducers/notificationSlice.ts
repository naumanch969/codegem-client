import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Notification, User } from "../../interfaces";
import * as api from "../api";
import toast from "react-hot-toast";

interface InitialState {
  isFetching: boolean;
  error: string;
  notifications: Notification[];
  currentNotification: Notification | null;
}


export const getNotification = createAsyncThunk<Notification, string>('notification/getNotification', async (notificationId: string, { dispatch }) => {
  try {
    const { data } = await api.getNotification(notificationId);
    return data
  } catch (err: any) {
    console.error(err)
  }
});

export const getNotifications = createAsyncThunk<Notification[], undefined>('notification/getNotifications', async (_, { dispatch }) => {
  try {
    const { data } = await api.getNotifications();
    return data
  } catch (err: any) {
    console.error(err)
  }
});

export const markAsRead = createAsyncThunk<string, string>('notification/markAsRead', async (notificationId, { rejectWithValue }) => {
  try {
    await api.markAsRead(notificationId);
    return notificationId;
  } catch (err: any) {
    toast.error('Something went wrong');
    return rejectWithValue(err?.response?.data?.message || err?.message);
  }
}
);

export const markAllAsRead = createAsyncThunk<string, string>('notification/markAllAsRead', async (loggedUserId, { rejectWithValue }) => {
  try {
    await api.markAllAsRead();
    return loggedUserId
  } catch (err: any) {
    toast.error('Something went wrong!')
    return rejectWithValue(err?.response?.data?.message || err?.message)
  }
})

export const deleteNotification = createAsyncThunk<string, string>('notification/deleteNotification', async (notificationId, { rejectWithValue }) => {
  try {
    await api.deleteNotification(notificationId);
    return notificationId
  } catch (err: any) {
    toast.error('Something went wrong!')
    return rejectWithValue(err?.response?.data?.message || err?.message)
  }
})

export const deleteNotifications = createAsyncThunk('notification/deleteNotifications', async (_, { rejectWithValue }) => {
  try {
    await api.deleteNotifications();
  } catch (err: any) {
    toast.error('Something went wrong!')
    return rejectWithValue(err?.response?.data?.message || err?.message)
  }
}
)

const initialState: InitialState = {
  notifications: [],
  isFetching: false,
  error: "",
  currentNotification: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotification.fulfilled, (state, action) => {
        state.currentNotification = action.payload;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        state.notifications = state.notifications.map(
          notification => notification = notification._id == action.payload ? { ...notification, isRead: true } : notification
        );
      })
      .addCase(markAllAsRead.fulfilled, (state, action) => {
        state.notifications = state.notifications.map(
          notification =>
          (notification =
            (notification.user as User)._id == action.payload ||
              (notification.user as string) == action.payload ? { ...notification, isRead: true } : notification)

        )
      })
      .addCase(deleteNotifications.fulfilled, (state, action) => {
        state.notifications = []
      })
  }
});

export default notificationSlice.reducer;