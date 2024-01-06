import { Dispatch } from 'redux';
import { start, end, error, getGroupReducer, getUserGroupsReducer, getGroupsReducer, createGroupReducer, joinGroupReducer, updateGroupReducer, deleteGroupReducer, leaveGroupReducer } from "../reducers/group";
import * as api from '../api';
import { useNavigate } from 'react-router-dom';

export const getGroup = (groupId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        const { data } = await api.getGroup(groupId);
        dispatch(getGroupReducer(data));
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};

export const getUserGroups = (userId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        const { data } = await api.getUserGroups(userId);
        dispatch(getUserGroupsReducer(data));
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};
export const getGroups = (loading:boolean = false) => async (dispatch: Dispatch) => {
    try {
        loading && dispatch(start());
        const { data } = await api.getGroups();
        dispatch(getGroupsReducer(data));
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};

export const createGroup = (groupData: any, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        const { data } = await api.createGroup(groupData);
        dispatch(createGroupReducer(data));
        setOpen(false);
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};

export const updateGroup = (groupId: string, groupData: any, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        const { data } = await api.updateGroup(groupId, groupData);
        dispatch(updateGroupReducer(data));
        setOpen(false);
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};
export const joinGroup = (groupId: string, loggedUserId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        await api.joinGroup(groupId);
        dispatch(joinGroupReducer({ groupId, loggedUserId }));
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};
export const leaveGroup = (groupId: string, loggedUserId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        await api.leaveGroup(groupId);
        dispatch(leaveGroupReducer({ groupId, loggedUserId }));
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};

export const deleteGroup = (groupId: string, navigate: ReturnType<typeof useNavigate>) => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        const { data } = await api.deleteGroup(groupId);
        navigate('/groups')
        dispatch(deleteGroupReducer(data));
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};