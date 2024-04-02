import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces";

interface InitialState {
  isFetching: boolean;
  error: string;
  sentRequests: User[] | [];
  receivedRequests: User[] | [];
  suggestedUsers: User[] | [];
  friends: User[] | [];
  count: number;
}

const initialState: InitialState = {
  isFetching: false,
  error: "",
  suggestedUsers: [],
  friends: [],
  sentRequests: [],
  receivedRequests: [],
  count: 0,
};

const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    start: (state) => {
      state.isFetching = true;
    },
    end: (state) => {
      state.isFetching = false;
    },
    error: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    getFriendsReducer: (
      state,
      action: PayloadAction<{ count: number; result: User[] }>
    ) => {
      state.friends = action.payload.result;
      state.count = action.payload.count;
    },
    getSuggestedUsersReducer: (state, action: PayloadAction<User[]>) => {
      state.suggestedUsers = action.payload;
    },
    getSentRequestsReducer: (state, action: PayloadAction<User[]>) => {
      state.sentRequests = action.payload;
    },
    getReceivedRequestsReducer: (state, action: PayloadAction<User[]>) => {
      state.receivedRequests = action.payload;
    },
    sendFriendRequestReducer: (state, action: PayloadAction<User>) => {
      state.sentRequests = [...state.sentRequests, action.payload];
      state.suggestedUsers = state.suggestedUsers.filter(
        (user) => user._id != action.payload._id
      );
    },
    acceptFriendRequestReducer: (state, action: PayloadAction<User>) => {
      state.receivedRequests = state.receivedRequests.filter(
        (user) => user._id != action.payload._id
      );
      state.friends = [...state.friends, action.payload];
    },
    removeFriendRequestReducer: (state, action: PayloadAction<User>) => {
      state.sentRequests = state.sentRequests.filter(
        (user) => user._id != action.payload._id
      ); // here sender is loggedUser
    },
    rejectFriendRequestReducer: (state, action: PayloadAction<User>) => {
      state.receivedRequests = state.receivedRequests.filter(
        (user) => user._id != action.payload._id
      );
    },
  },
});

export const {
  start,
  end,
  error,
  getSuggestedUsersReducer,
  getFriendsReducer,
  getReceivedRequestsReducer,
  getSentRequestsReducer,
  removeFriendRequestReducer,
  sendFriendRequestReducer,
  rejectFriendRequestReducer,
  acceptFriendRequestReducer,
} = friendSlice.actions;
export default friendSlice.reducer;
