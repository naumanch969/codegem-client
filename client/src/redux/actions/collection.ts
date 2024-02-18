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
  shareCollectionReducer,
  updateCollectionReducer,
  deleteCollectionReducer,
  starCollectionReducer,
} from "../reducers/collection";
import * as api from "../api";
import { Challenge, Code, Collection, Streak } from "../../interfaces";

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
export const getCollections =
  (loading: boolean = false, query: string) =>
  async (dispatch: Dispatch) => {
    try {
      loading && dispatch(start());
      const { data }: { data: { result: Collection[]; count: number } } =
        await api.getCollections(query);
      dispatch(
        getCollectionsReducer({ result: data.result, count: data.count })
      );
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const getUserCollections =
  (loading: boolean = false, userId: string, query: string) =>
  async (dispatch: Dispatch) => {
    try {
      loading && dispatch(start());
      const { data }: { data: { result: Collection[]; count: number } } =
        await api.getUserCollections(userId, query);
      dispatch(
        getUserCollectionsReducer({ result: data.result, count: data.count })
      );
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const createCollection =
  (collectionData: any, onClose: () => void, toast: any) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      const { data } = await api.createCollection(collectionData);
      dispatch(createCollectionReducer(data));
      onClose();
      toast.success("Success! Collection created.");
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
      toast.error(err.response.data.message || "OOPS, Something went wrong!");
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
    onClose: () => void,
    toast: any
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      const { data } = await api.updateCollection(collectionId, collectionData);
      dispatch(updateCollectionReducer(data));
      onClose();
      toast.success("Success! Collection updated.");
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
      toast.error(err.response.data.message || "OOPS, Something went wrong!");
    }
  };
export const shareCollection =
  (collection: Collection, friendIds: string[], setOpen: any) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(shareCollectionReducer({ collection, friendIds }));
      await api.shareCollection(collection._id as string, friendIds);
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    } finally {
      setOpen(false);
    }
  };
export const starCollection =
  (collectionId: string, loggedUserId: string) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(starCollectionReducer({ collectionId, loggedUserId }));
      await api.starCollection(collectionId as string);
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const shareCollectionInGroups =
  (code: Collection, groupIds: string[], loggedUserId: string, setOpen: any) =>
  async (dispatch: Dispatch) => {
    // try {
    //   dispatch(shareCollectionInGroupsReducer({ code, groupIds }));
    //   await api.shareCodeInGroups(code._id as string, groupIds);
    //   setOpen(false);
    // } catch (err: any) {
    //   err.response?.data?.message
    //     ? dispatch(error(err.response.data.message))
    //     : dispatch(error(err.message));
    // }
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
