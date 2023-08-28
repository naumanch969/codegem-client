import Cookie from 'js-cookie'
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isFetching: false,
        error: '',
        users: [],
        liked: [],
        saved: [],
        currentUser: null,
        loggedUser: Cookie.get('codegem_profile') ? JSON.parse(Cookie.get('codegem_profile')) : null,
        accounts: Cookie.get('accounts') ? JSON.parse(Cookie.get('accounts')) : [],
    },
    reducers: {
        start: (state) => { state.isFetching = true; state.error = null },
        end: (state) => { state.isFetching = false; state.error = null },
        error: (state, action) => { state.isFetching = false; state.error = (action.payload || 'Something went wrong!') },

        getAllUsersReducer: (state, action) => {
            state.users = action.payload
        },
        registerReducer: (state, action) => {
            state.users = [...state.users, action.payload]
        },
        loginReducer: (state, action) => {
            state.loggedUser = action.payload
        },
        logoutReducer: (state, action) => {
            state.loggedUser = null
        },
        sendFriendRequestReducer: (state, action) => {
            state.users = state.users.map(user => user._id == action.payload.sender._id ? action.payload.sender : user)
            state.users = state.users.map(user => user._id == action.payload.receiver._id ? action.payload.receiver : user)
        },
        acceptFriendRequestReducer: (state, action) => {
            state.users = state.users.map(user => user._id == action.payload.sender._id ? action.payload.sender : user)
            state.users = state.users.map(user => user._id == action.payload.accepter._id ? action.payload.accepter : user)
        },
    }

})

export default userSlice.reducer
export const {
    start,
    end,
    error,
    getAllUsersReducer,
    registerReducer,
    loginReducer,
    logoutReducer,
    sendFriendRequestReducer,
    acceptFriendRequestReducer,
} = userSlice.actions