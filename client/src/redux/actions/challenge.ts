import { Dispatch } from "redux";
import {
  start,
  end,
  error,
  getChallengeReducer,
  getChallengesReducer,
  getUserChallengesReducer,
  createChallengeReducer,
  shareChallengeInGroupsReducer,
  shareChallengeReducer,
  updateChallengeReducer,
  likeChallengeReducer,
  commentChallengeReducer,
  deleteChallengeReducer,
} from "../reducers/challenge";
import { createGroupChallengeReducer } from "../reducers/group";
import {
  saveChallengeReducer,
  saveChallengeInCollectionsReducer,
  unsaveChallengeReducer,
} from "../reducers/collection";
import * as api from "../api";
import { Challenge, User } from "../../interfaces";
import { RootState } from "../store";
import { useSelector } from "react-redux";

export const getChallenge =
  (challengeId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      const { data } = await api.getChallenge(challengeId);
      dispatch(getChallengeReducer(data));
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };

export const getChallenges =
  (loading: boolean = false, query: string) =>
  async (dispatch: Dispatch) => {
    try {
      loading && dispatch(start());
      const { data }: { data: { result: Challenge[]; count: number } } =
        await api.getChallenges(query);
      dispatch(
        getChallengesReducer({ result: data.result, count: data.count })
      );
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const getSavedChallenges = () => async (dispatch: Dispatch) => {
  try {
    dispatch(start());
    const { data } = await api.getSavedChallenges();
    dispatch(getChallengesReducer(data));
    dispatch(end());
  } catch (err: any) {
    err.response?.data?.message
      ? dispatch(error(err.response.data.message))
      : dispatch(error(err.message));
  }
};

export const getUserChallenges =
  (loading: boolean = false, query: string) =>
  async (dispatch: Dispatch) => {
    try {
      loading && dispatch(start());
      const { data }: { data: { result: Challenge[]; count: number } } =
        await api.getUserChallenges(query);
      dispatch(
        getUserChallengesReducer({ result: data.result, count: data.count })
      );
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const createChallenge =
  (challengeData: any, onClose: () => void, toast: any) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      const { data } = await api.createChallenge(challengeData);
      if (challengeData.groupId) {
        dispatch(
          createGroupChallengeReducer({
            groupId: challengeData.groupId as string,
            challenge: data,
          })
        );
      } else {
        dispatch(createChallengeReducer(data));
      }
      onClose();
      toast.success("Success! Challenge created.");
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
      toast.error(err.response.data.message || "OOPS, Something went wrong!");
    }
  };

export const updateChallenge =
  (challengeId: string, challengeData: any, onClose: () => void, toast: any) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      const { data } = await api.updateChallenge(challengeId, challengeData);
      dispatch(updateChallengeReducer(data));
      onClose();
      toast.success("Success! Challenge updated.");
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
      toast.error(err.response.data.message || "OOPS, Something went wrong!");
    }
  };
export const shareChallenge =
  (challenge: Challenge, friendIds: string[], setOpen: any) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(shareChallengeReducer({ challenge, friendIds }));
      await api.shareChallenge(challenge._id as string, friendIds);
      setOpen(false);
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const shareChallengeInGroups =
  (
    challenge: Challenge,
    groupIds: string[],
    setOpen: any
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(shareChallengeInGroupsReducer({ challenge, groupIds }));
      await api.shareChallengeInGroups(challenge._id as string, groupIds);
      setOpen(false);
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const saveChallenge =
  (challenge: Challenge, type: "save" | "unsave") =>
  async (dispatch: Dispatch) => {
    try {
      type == "save"
        ? dispatch(saveChallengeReducer({ challenge }))
        : dispatch(unsaveChallengeReducer({ challenge }));
      await api.saveChallenge(challenge._id as string);
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const saveChallengeInCollections =
  (challenge: Challenge, collections: string[], setOpen: any) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(
        saveChallengeInCollectionsReducer({
          challenge,
          collectionIds: collections,
        })
      );
      await api.saveChallengeInCollections(
        challenge._id as string,
        collections
      );
      setOpen(false);
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const likeChallenge =
  (challengeId: string, loggedUserId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(likeChallengeReducer({ challengeId, loggedUserId }));
      await api.likeChallenge(challengeId);
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };

export const commentChallenge =
  (codeId: string, content: string, loggedUser: User) =>
  async (dispatch: Dispatch) => {
    try {
      await api.commentChallenge(codeId, content);
      dispatch(
        commentChallengeReducer({ postId: codeId, content, user: loggedUser! })
      );
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };

export const deleteChallenge =
  (challengeId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      const { data } = await api.deleteChallenge(challengeId);
      dispatch(deleteChallengeReducer(data));
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
