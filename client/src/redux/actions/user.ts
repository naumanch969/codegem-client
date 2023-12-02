import * as api from "../api"
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import {
    start,
    end,
    error,
    getAllUsersReducer,
    getUserReducer,
    registerReducer,
    loginReducer,
    logoutReducer,
    getProfileReducer,

} from '../reducers/user'
import { AsyncAction } from "../store"
import { User } from "../../interfaces"


export const getAllUsers = (): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getAllUsers()
        dispatch(getAllUsersReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const getUser = (userId:string): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getUser(userId)
        dispatch(getUserReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const getProfile = (loggedUserId:string): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getUser(loggedUserId)
        dispatch(getProfileReducer(data))
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}




export const register: (userData: User, navigate: ReturnType<typeof useNavigate>) => AsyncAction = (userData, navigate) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.register(userData)
        dispatch(registerReducer(data))
        navigate('/auth/login')
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const login = (userData: User, navigate: ReturnType<typeof useNavigate>): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.login(userData)
        const { token, ...result } = data
        Cookie.set('codegem_profile', JSON.stringify(data))
        dispatch(loginReducer(result))
        navigate('/')
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}
export const logout = (navigate: ReturnType<typeof useNavigate>): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        dispatch(logoutReducer())
        Cookie.remove('codegem_profile')
        navigate('/auth/login')
        dispatch(end())
    } catch (err: any) {
        dispatch(error(err.message))
    }
}

// profile = 'user is logged in'
// 'accounts.length > 1 then show switch account option '
// accounts = 'these accounts have tokens saved in browser'
// 'accounts.length > 1 then show remove account from this device option '
// 'accounts.length = 1 then if user logged out then remove his account from the device as well '
// switchAccount = 'get account info from accounts, and use it for login'
// removeAccount = 'filter account from accounts'