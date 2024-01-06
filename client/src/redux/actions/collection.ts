import { Dispatch } from "redux";
import {
  start,
  end,
  error,
  getCollectionReducer,
  getUserCollectionsReducer,
  getCollectionsReducer,
  getCollectionCodesReducer,
  getCollectionStreaksReducer,
  getCollectionChallengesReducer,
  createCollectionStreakReducer,
  createCollectionChallengeReducer,
  createCollectionReducer,
  createCollectionCodeReducer,
  updateCollectionReducer,
  deleteCollectionReducer,
} from "../reducers/collection";
import * as api from "../api";
import { Challenge, Code, Streak } from "../../interfaces";

export const getCollection =
  (collectionId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      const { data } = await api.getCollection(collectionId);
      dispatch(getCollectionReducer(data));
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };

export const getCollectionCodes =
  (collectionId: string, setLoading?: any) => async (dispatch: Dispatch) => {
    try {
      setLoading && setLoading(true);
      const { data } = await api.getCollectionCodes(collectionId);
      dispatch(getCollectionCodesReducer(data));
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    } finally {
      setLoading && setLoading(false);
    }
  };

export const getCollectionStreaks =
  (collectionId: string, setLoading?: any) => async (dispatch: Dispatch) => {
    try {
      setLoading && setLoading(true);
      const { data } = await api.getCollectionStreaks(collectionId);
      dispatch(getCollectionStreaksReducer(data));
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    } finally {
      setLoading && setLoading(false);
    }
  };

export const getCollectionChallenges =
  (collectionId: string, setLoading?: any) => async (dispatch: Dispatch) => {
    try {
      setLoading && setLoading(true);
      const { data } = await api.getCollectionChallenges(collectionId);
      dispatch(getCollectionChallengesReducer(data));
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    } finally {
      setLoading && setLoading(false);
    }
  };

export const getUserCollections =
  (userId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      const { data } = await api.getUserCollections(userId);
      dispatch(getUserCollectionsReducer(data));
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const getCollections = () => async (dispatch: Dispatch) => {
  try {
    dispatch(start());
    const { data } = await api.getCollections();
    dispatch(getCollectionsReducer(data));
    dispatch(end());
  } catch (err: any) {
    err.response?.data?.message
      ? dispatch(error(err.response.data.message))
      : dispatch(error(err.message));
  }
};

export const createCollection =
  (
    collectionData: any,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      const { data } = await api.createCollection(collectionData);
      dispatch(createCollectionReducer(data));
      setOpen(false);
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };

export const createCollectionCode =
  (collectionId: string, codeData: Code, setOpen: any) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      await api.createCollectionCode(collectionId, codeData);
      dispatch(createCollectionCodeReducer(codeData));
      setOpen(false);
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const createCollectionStreak =
  (collectionId: string, streakData: Streak, setOpen: any) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      await api.createCollectionStreak(collectionId, streakData);
      dispatch(createCollectionStreakReducer(streakData));
      setOpen(false);
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const createCollectionChallenge =
  (collectionId: string, challengeData: Challenge, setOpen: any) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      await api.createCollectionChallenge(collectionId, challengeData);
      dispatch(createCollectionChallengeReducer(challengeData));
      setOpen(false);
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };

export const updateCollection =
  (
    collectionId: string,
    collectionData: any,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      const { data } = await api.updateCollection(collectionId, collectionData);
      dispatch(updateCollectionReducer(data));
      setOpen(false);
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };

export const deleteCollection =
  (collectionId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      const { data } = await api.deleteCollection(collectionId);
      dispatch(deleteCollectionReducer(data));
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
