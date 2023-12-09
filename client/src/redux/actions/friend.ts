import * as api from '../api'
import { start, end, error, getSuggestedUsersReducer, getFriendsReducer, getSentRequestsReducer, removeFriendRequestReducer, getReceivedRequestsReducer, sendFriendRequestReducer, acceptFriendRequestReducer,rejectFriendRequestReducer } from '../reducers/friend'
import { AsyncAction } from '../store'

export const getSuggestedUsers = (): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getSuggestedUsers()
        dispatch(getSuggestedUsersReducer(data))
        dispatch(end())
    }
    catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message))
    }
}

export const getFriends = (): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getFriends()
        console.log('data', data)
        dispatch(getFriendsReducer(data))
        dispatch(end())
    }
    catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message))
    }
}

export const getSentRequests = (): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getSentRequests()
        dispatch(getSentRequestsReducer(data))
        dispatch(end())
    }
    catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message))
    }
}

export const getReceivedRequests = (): AsyncAction => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getReceivedRequests()
        dispatch(getReceivedRequestsReducer(data))
        dispatch(end())
    }
    catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message))
    }
}

export const sendFriendRequest = (receiverId: string): AsyncAction => async (dispatch) => {
    try {
        const { data } = await api.sendFriendRequest(receiverId)
        dispatch(sendFriendRequestReducer(data))
    } catch (err: any) {
        const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}

export const acceptFriendRequest = (senderId: string): AsyncAction => async (dispatch) => {      // in this request, user is the accepter
    try {
        const { data } = await api.acceptFriendRequest(senderId)
        dispatch(acceptFriendRequestReducer(data))
    } catch (err: any) {
        const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}

export const removeFriendRequest = (receiverId: string): AsyncAction => async (dispatch) => {
    try {
        const { data } = await api.removeFriendRequest(receiverId)
        dispatch(removeFriendRequestReducer(data))
    } catch (err: any) {
        const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}

export const rejectFriendRequest = (receiverId: string): AsyncAction => async (dispatch) => {
    try {
        const { data } = await api.rejectFriendRequest(receiverId)
        dispatch(rejectFriendRequestReducer(data))
    } catch (err: any) {
        const e = err?.response?.data
        var errorMessage;
        e?.message ? errorMessage = e.message : errorMessage = err.message
        dispatch(error(errorMessage))
    }
}