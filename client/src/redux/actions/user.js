import * as api from "../api"
import Cookie from 'js-cookie'
import {
    start,
    end,
    error,
    getAllUsersReducer,
    registerReducer,
    loginReducer,
    logoutReducer,
    sendFriendRequestReducer,
    acceptFriendRequestReducer,
} from '../reducers/user'


export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getAllUsers()
        dispatch(getAllUsersReducer(data))
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}




export const register = (userData, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.register(userData)
        dispatch(registerReducer(data))
        navigate('/auth/login')
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const login = (userData, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.login(userData)
        const { token, ...result } = data
        Cookie.set('codegem_profile', JSON.stringify(data))
        dispatch(loginReducer(result))
        navigate('/')
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}
export const logout = (navigate, userState) => async (dispatch) => {
    try {
        dispatch(start())
        dispatch(logoutReducer())
        Cookie.remove('codegem_profile')
        navigate('/auth/login')
        dispatch(end())
    } catch (err) {
        dispatch(error(err.message))
    }
}

export const sendFriendRequest = (receiverId, type, content, userState, setUserState) => async (dispatch) => {
    try {
        const { data } = await api.sendFriendRequest(receiverId, type, content)
        dispatch(sendFriendRequestReducer(data.result))
        const sender = data.result.sender
        const receiver = data.result.receiver
        let accounts = JSON.parse(Cookie.get('accounts'))
        accounts = accounts.map(account => account._id == sender._id ? account = sender : account)
        accounts = accounts.map(account => account._id == receiver._id ? account = receiver : account)
        Cookie.set('profile', JSON.stringify(sender))
        Cookie.set('accounts', JSON.stringify(accounts))
        userState.user = sender
        userState.accounts = accounts
        setUserState({ ...userState })
    } catch (err) {
        const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}

export const acceptFriendRequest = (senderId, userState, setUserState) => async (dispatch) => {      // in this request, user is the accepter
    try {
        const { data } = await api.acceptFriendRequest(senderId)
        if (data.success) {
            dispatch(acceptFriendRequestReducer(data.result))
            const sender = data.result.sender
            const accepter = data.result.accepter
            let accounts = JSON.parse(Cookie.get('accounts'))
            accounts = accounts.map(account => account._id == sender._id ? account = sender : account)
            accounts = accounts.map(account => account._id == accepter._id ? account = accepter : account)
            Cookie.set('profile', JSON.stringify(accepter))
            Cookie.set('accounts', JSON.stringify(accounts))
            userState.user = accepter
            userState.accounts = accounts
            setUserState({ ...userState })
        }
    } catch (err) {
        const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}

export const removeFriendRequest = (receiverId, userState, setUserState) => async (dispatch) => {
    try {
        const { data } = await api.removeFriendRequest(receiverId)
        if (data.success) {
            dispatch(sendFriendRequestReducer(data.result))
            const sender = data.result.sender
            const receiver = data.result.receiver
            let accounts = JSON.parse(Cookie.get('accounts'))
            accounts = accounts.map(account => account._id == sender._id ? account = sender : account)
            accounts = accounts.map(account => account._id == receiver._id ? account = receiver : account)
            Cookie.set('profile', JSON.stringify(sender))
            Cookie.set('accounts', JSON.stringify(accounts))
            userState.user = sender
            userState.accounts = accounts
            setUserState({ ...userState })
        }
    } catch (err) {
        const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}
// profile = 'user is logged in'
// 'accounts.length > 1 then show switch account option '
// accounts = 'these accounts have tokens saved in browser'
// 'accounts.length > 1 then show remove account from this device option '
// 'accounts.length = 1 then if user logged out then remove his account from the device as well '
// switchAccount = 'get account info from accounts, and use it for login'
// removeAccount = 'filter account from accounts'