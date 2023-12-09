import { Dispatch } from 'redux';
import { start, end, error, getCollectionReducer,getUserCollectionsReducer, getCollectionsReducer, createCollectionReducer, updateCollectionReducer, deleteCollectionReducer } from "../reducers/collection";
import * as api from '../api';

export const getCollection = (collectionId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        const { data } = await api.getCollection(collectionId);
        dispatch(getCollectionReducer(data));
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};

export const getUserCollections = (userId:string) => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        const { data } = await api.getUserCollections(userId);
        dispatch(getUserCollectionsReducer(data));
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};
export const getCollections = () => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        const { data } = await api.getCollections();
        dispatch(getCollectionsReducer(data));
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};

export const createCollection = (collectionData: any, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        const { data } = await api.createCollection(collectionData);
        dispatch(createCollectionReducer(data));
        setOpen(false);
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};

export const updateCollection = (collectionId: string, collectionData: any, setOpen: React.Dispatch<React.SetStateAction<boolean>>) => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        const { data } = await api.updateCollection(collectionId, collectionData);
        dispatch(updateCollectionReducer(data));
        setOpen(false);
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};

export const deleteCollection = (collectionId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(start());
        const { data } = await api.deleteCollection(collectionId);
        dispatch(deleteCollectionReducer(data));
        dispatch(end());
    } catch (err: any) {
        err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
    }
};