import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { User } from '../../interfaces';
import * as api from '../api'
import Cookies from 'js-cookie';

interface InitialState {
    isFetching: boolean;
    error: string;
    users: User[];
    liked: User[];
    saved: User[];
    loggedUserToken: String | null;
    loggedUser: User | null;
    currentUser: User | null;
    accounts: User | [];
    count: number;
}

const stringifiedToken = Cookies.get("code.connect");
const stringifiedUser = localStorage.getItem("profile");
const stringifiedAccounts = Cookies.get("accounts");

const initialState: InitialState = {
    isFetching: false,
    error: "",
    users: [],
    liked: [],
    saved: [],
    currentUser: null,
    loggedUserToken: stringifiedToken ? JSON.parse(stringifiedToken) : null,
    loggedUser: stringifiedUser ? JSON.parse(stringifiedUser) : null,
    accounts: stringifiedAccounts ? JSON.parse(stringifiedAccounts) : [],
    count: 20,
};


export const getUsers = createAsyncThunk<{ result: User[], count: number }, string>('user/getUsers', async (query) => {
    try {
        const { data } = await api.getUsers(query)
        return data
    } catch (error) {
        console.error('Error getUsers', error)
        toast.error('Something went wrong!')
    }
})
export const getUser = createAsyncThunk<User, string>('user/getUser', async (userId) => {
    try {
        const { data } = await api.getUser(userId)
        return data
    } catch (error) {
        console.error('Error getUser', error)
        toast.error('Something went wrong!')
    }
})
export const getProfile = createAsyncThunk<User, undefined>('user/getProfile', async () => {
    try {
        const { data } = await api.getProfile()
        localStorage.setItem("profile", JSON.stringify(data));
        return data
    } catch (error) {
        console.error('Error getProfile', error)
        toast.error('Something went wrong!')
    }
})
export const updateProfile = createAsyncThunk<any, any>('user/updateProfile', async (formData) => {
    try {
        const { data } = await api.updateProfile(formData)
        console.log('dat', data)
        return data
    } catch (error) {
        console.error('Error updateProfile', error)
        toast.error('Something went wrong!')
    }
})
export const deleteUser = createAsyncThunk<any, string>('user/deleteUser', async (userId) => {
    try {
        await api.deleteUser(userId)
        return userId
    } catch (error) {
        console.error('Error deleteUser', error)
        toast.error('Something went wrong!')
    }
})
export const editPersonalDetails = createAsyncThunk<any, { type: "interests" | "hobbies" | "books" | "programming", values: string[] }>('user/editPersonalDetails', async ({ type, values }) => {
    try {
        await api.editPersonalDetails(type, values)
        return { type, values }
    } catch (error) {
        console.error('Error editPersonalDetails', error)
        toast.error('Something went wrong!')
    }
})


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetState: () => initialState,
        setLoggedUserSlice: (state, action: PayloadAction<User | null>) => {
            state.loggedUser = action.payload;
        },
        setLoggedUserTokenSlice: (state, action: PayloadAction<string | null>) => {
            state.loggedUserToken = action.payload;
        },
        setUsersSlice: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        setUsersCountSlice: (state, action: PayloadAction<number>) => {
            state.count = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.isFetching = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.currentUser = action.payload;
                state.isFetching = false
            })
            .addCase(getUser.rejected, (state) => {
                state.isFetching = false
            })
            .addCase(getUsers.pending, (state) => {
                state.isFetching = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.users = action.payload.result;
                state.count = action.payload.count;
                state.isFetching = false
            })
            .addCase(getUsers.rejected, (state) => {
                state.isFetching = false
            })
            .addCase(getProfile.pending, (state) => {
                state.isFetching = true
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loggedUser = action.payload;
                state.isFetching = false
            })
            .addCase(getProfile.rejected, (state) => {
                state.isFetching = false
            })
            .addCase(updateProfile.pending, (state) => {
                state.isFetching = true
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loggedUser = action.payload;
                state.isFetching = false
            })
            .addCase(updateProfile.rejected, (state) => {
                state.isFetching = false
            })
            .addCase(deleteUser.pending, (state) => {
                state.isFetching = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((u) => u._id != action.payload);
                state.isFetching = false
            })
            .addCase(deleteUser.rejected, (state) => {
                state.isFetching = false
            })
            .addCase(editPersonalDetails.pending, (state) => {
                state.isFetching = true
            })
            .addCase(editPersonalDetails.fulfilled, (state, action) => {
                state.loggedUser = { ...state.loggedUser!, [action.payload.type]: action.payload.values, };
                state.isFetching = false
            })
            .addCase(editPersonalDetails.rejected, (state) => {
                state.isFetching = false
            })
            .addCase(userActions.resetState, (state) => {
                state.currentUser = null;
                state.isFetching = false;
            })
            .addDefaultCase((state) => state);
    },
});

export default userSlice.reducer;
export const { resetState, setLoggedUserSlice, setLoggedUserTokenSlice, setUsersCountSlice, setUsersSlice } = userSlice.actions;
export const { actions: userActions } = userSlice;
