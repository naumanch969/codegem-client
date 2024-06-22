import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { User } from '../../interfaces';
import * as api from '../api'
import { setUsersCountSlice, setUsersSlice } from './userSlice';

interface InitialState {
    isFetching: boolean;
    error: string;
    sentRequests: User[];
    receivedRequests: User[];
    suggestedUsers: User[];
    friends: User[];
    count: { friends: number, sentRequests: number, receivedRequests: number, suggestedUsers: number };
}
const initialState: InitialState = {
    isFetching: false,
    error: "",
    suggestedUsers: [],
    friends: [],
    sentRequests: [],
    receivedRequests: [],
    count: { friends: 0, sentRequests: 0, receivedRequests: 0, suggestedUsers: 0 }
};


export const getSuggestedUsers = createAsyncThunk('friend/getSuggestedUsers', async (query: string) => {
    try {
        const { data } = await api.getSuggestedUsers(query);
        return data
    } catch (error) {
        console.error(error)
        toast.error('Something went wrong!')
    }
})
export const getFriends = createAsyncThunk('friend/getFriends', async (query: string) => {
    try {
        const { data }: { data: { count: number; result: User[] } } = await api.getFriends(query);
        return { result: data.result, count: data.count }
    } catch (error) {
        console.error(error)
        toast.error('Something went wrong!')
    }
})
export const searchFriends = createAsyncThunk('friend/searchFriends', async (query: string) => {
    try {
        const { data }: { data: { count: number; result: User[] } } = await api.searchFriends(query);
        return { result: data.result, count: data.count }
    } catch (error) {
        console.error(error)
        toast.error('Something went wrong!')
    }
})
export const searchUsers = createAsyncThunk('friend/searchUsers', async (query: string, { dispatch }) => {
    try {
        const { data }: { data: { count: number; result: User[] } } = await api.searchUsers(query);
        dispatch(setUsersCountSlice(data.count))
        dispatch(setUsersSlice(data.result))
        return
    } catch (error) {
        console.error(error)
        toast.error('Something went wrong!')
    }
})
export const getSentRequests = createAsyncThunk('friend/getSentRequests', async (query: string) => {
    try {
        const { data } = await api.getSentRequests(query);
        return data
    } catch (error) {
        console.error(error)
        toast.error('Something went wrong!')
    }
})
export const getReceivedRequests = createAsyncThunk('friend/getReceivedRequests', async (query: string) => {
    try {
        const { data } = await api.getReceivedRequests(query);
        return data
    }
    catch (error) {
        console.error(error)
        toast.error('Somethign went wrong!')
    }
})
export const sendFriendRequest = createAsyncThunk('friend/sendFriendRequest', async (receiverId: string) => {
    try {
        const { data } = await api.sendFriendRequest(receiverId);
        return data
    } catch (error) {
        console.error(error)
        toast.error('Something went wrong!')
    }
})
export const acceptFriendRequest = createAsyncThunk('friend/acceptFriendRequest', async (senderId: string) => {
    try {
        const { data } = await api.acceptFriendRequest(senderId);
        return data
    } catch (error) {
        console.error(error)
        toast.error('Something went wrong!')
    };
})
export const removeFriendRequest = createAsyncThunk('friend/removeFriendRequest', async (receiverId: string) => {
    try {
        const { data } = await api.removeFriendRequest(receiverId);
        return data
    } catch (error) {
        console.error(error)
        toast.error('Something went wrong!')
    }
})
export const rejectFriendRequest = createAsyncThunk('friend/rejectFriendRequest', async (receiverId: string) => {
    try {
        const { data } = await api.rejectFriendRequest(receiverId);
        return data
    } catch (error) {
        console.error(error)
        toast.error('Something went wrong!')
    }
})

const friendSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSuggestedUsers.fulfilled, (state, action) => {
                if (action.payload?.result)
                    state.suggestedUsers = action.payload?.result;
                if (action.payload?.count)
                    state.count = { ...state.count, friends: action.payload.count };
            })
            .addCase(getFriends.fulfilled, (state, action) => {
                if (action.payload?.result)
                    state.friends = action.payload.result;
                if (action.payload?.count)
                    state.count = { ...state.count, friends: action.payload.count };
            })
            .addCase(searchFriends.fulfilled, (state, action) => {
                if (action.payload?.result)
                    state.friends = action.payload.result;
                if (action.payload?.count)
                    state.count = { ...state.count, friends: action.payload.count };
            })
            .addCase(getSentRequests.fulfilled, (state, action) => {
                if (action.payload?.result)
                    state.sentRequests = action.payload.result;
                if (action.payload?.count)
                    state.count = { ...state.count, sentRequests: action.payload.count };
            })
            .addCase(getReceivedRequests.fulfilled, (state, action) => {
                if (action.payload?.result)
                    state.receivedRequests = action.payload.result;
                if (action.payload?.count)
                    state.count = { ...state.count, receivedRequests: action.payload.count };
            })
            .addCase(sendFriendRequest.fulfilled, (state, action) => {
                state.sentRequests = [...state.sentRequests, action.payload];
                state.suggestedUsers = state.suggestedUsers.filter((user) => user._id != action.payload._id);
            })
            .addCase(acceptFriendRequest.fulfilled, (state, action) => {
                state.receivedRequests = state.receivedRequests.filter((user) => user._id != action.payload._id);
                state.friends = [...state.friends, action.payload];
            })
            .addCase(removeFriendRequest.fulfilled, (state, action) => {
                state.sentRequests = state.sentRequests.filter((user) => user._id != action.payload._id); // here sender is loggedUser
            })
            .addCase(rejectFriendRequest.fulfilled, (state, action) => {
                state.receivedRequests = state.receivedRequests.filter((user) => user._id != action.payload._id);
            })
            .addDefaultCase((state) => state);
    },
});

export default friendSlice.reducer;
export const { resetState } = friendSlice.actions;
export const { actions: userActions } = friendSlice;
