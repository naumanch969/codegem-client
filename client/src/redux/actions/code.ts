import { Dispatch } from 'redux';
import { start, end, error, getCodeReducer, getCodesReducer, getUserCodesReducer, createCodeReducer, shareCodeInGroupsReducer, shareCodeReducer, updateCodeReducer, likeCodeReducer, commentCodeReducer, deleteCodeReducer } from "../reducers/code";
import { createGroupCodeReducer } from "../reducers/group";
import { saveCodeReducer, saveCodeInCollectionsReducer } from "../reducers/collection";
import * as api from '../api';
import { Code } from '../../interfaces';

export const getCode = (codeId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        const { data } = await api.getCode(codeId);
        dispatch(getCodeReducer(data));
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};

export const getCodes = () => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        const { data } = await api.getCodes();
        dispatch(getCodesReducer(data));
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};
export const getSavedCodes = () => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        const { data } = await api.getSavedCodes();
        dispatch(getCodesReducer(data));
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};

export const getUserCodes = (userId:string) => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        const { data } = await api.getUserCodes(userId);
        dispatch(getUserCodesReducer(data));
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};

export const createCode = (codeData: any, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        const { data } = await api.createCode(codeData);
        if (codeData.groupId) {
            dispatch(createGroupCodeReducer({ groupId: codeData.groupId as string, code: data }));
        }
        else {
            dispatch(createCodeReducer(data));
        }
        setOpen(false);
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};

export const updateCode = (codeId: string, codeData: any, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        const { data } = await api.updateCode(codeId, codeData);
        dispatch(updateCodeReducer(data));
        setOpen(false);
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};
export const shareCode = (code: Code, shareWith: string[], loggedUserId: string, setOpen: any) => async (dispatch: Dispatch) => {
    try {
        await api.shareCode(code._id as string, shareWith);
        const formatedShareWith = shareWith.map(userId => { return { from: loggedUserId, to: userId, sharedAt: String(Date.now()) } })
        dispatch(shareCodeReducer({ code, shareWith: formatedShareWith }));
        setOpen(false)
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};
export const shareCodeInGroups = (code: Code, groupIds: string[], loggedUserId: string, setOpen: any) => async (dispatch: Dispatch) => {
    try {
        await api.shareCodeInGroups(code._id as string, groupIds);
        const formatedGroupObjs = groupIds.map(groupId => { return { from: loggedUserId, group: groupId, sharedAt: String(Date.now()) } })
        dispatch(shareCodeInGroupsReducer({ code, groupObjs: formatedGroupObjs }));
        setOpen(false)
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};
export const saveCode = (code: Code) => async (dispatch: Dispatch) => {
    try {
        await api.saveCode(code._id as string);
        dispatch(saveCodeReducer({ code }));
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};
export const saveCodeInCollections = (code: Code, collections: string[], setOpen: any) => async (dispatch: Dispatch) => {
    try {
        await api.saveCodeInCollections(code._id as string, collections);
        dispatch(saveCodeInCollectionsReducer({ code, collectionIds: collections }));
        setOpen(false)
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};
export const likeCode = (codeId: string) => async (dispatch: Dispatch) => {
    try {
        const { data } = await api.likeCode(codeId);
        dispatch(likeCodeReducer(codeId));
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};

export const commentCode = (codeId: string, comment: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        const { data } = await api.commentCode(codeId, comment);
        dispatch(commentCodeReducer(data));
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};

export const deleteCode = (codeId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        const { data } = await api.deleteCode(codeId);
        dispatch(deleteCodeReducer(data));
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};