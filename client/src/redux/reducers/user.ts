import Cookie from 'js-cookie'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../interfaces'

interface InitialState {
    isFetching: boolean,
    error: string,
    users: User[],
    liked: User[],
    saved: User[],
    currentUser: User | null,
    loggedUser: User | null,
    accounts: User | [],
}

const stringifiedUser = Cookie.get('code.connect')
const stringifiedAccounts = Cookie.get('accounts')


const initialState: InitialState = {
    isFetching: false,
    error: '',
    users: [],
    liked: [],
    saved: [],
    currentUser: null,
    loggedUser: stringifiedUser ? JSON.parse(stringifiedUser) : null,
    accounts: stringifiedAccounts ? JSON.parse(stringifiedAccounts) : [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        start: (state) => { state.isFetching = true },
        end: (state) => { state.isFetching = false },
        error: (state, action: PayloadAction<string>) => { state.isFetching = false; state.error = action.payload  },

        getAllUsersReducer: (state, action: PayloadAction<User[]>) => { state.users = action.payload },
        getUserReducer: (state, action: PayloadAction<User>) => { state.currentUser = action.payload },
        getProfileReducer: (state, action: PayloadAction<User>) => { state.loggedUser = action.payload },
        registerReducer: (state, action: PayloadAction<User>) => { state.users = [...state.users, action.payload] },
        loginReducer: (state, action: PayloadAction<User>) => { state.loggedUser = action.payload },
        changePasswordReducer: (state) => { return state; },
        sendForgetPasswordOTPReducer: (state) => { return state; },
        setNewPasswordReducer: (state) => { return state; },
        logoutReducer: (state) => { state.loggedUser = null },

    }

})

export default userSlice.reducer
export const {
    start,
    end,
    error,
    getAllUsersReducer,
    getUserReducer,
    getProfileReducer,
    registerReducer,
    loginReducer,
    logoutReducer,
    changePasswordReducer,
    sendForgetPasswordOTPReducer,
    setNewPasswordReducer,
} = userSlice.actions