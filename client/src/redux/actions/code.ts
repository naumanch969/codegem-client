import { Dispatch } from "redux";
import {
  start,
  end,
  error,
  getCodeReducer,
  getCodesReducer,
  getUserCodesReducer,
  createCodeReducer,
  shareCodeInGroupsReducer,
  shareCodeReducer,
  updateCodeReducer,
  likeCodeReducer,
  commentCodeReducer,
  deleteCodeReducer,
} from "../reducers/code";
import { createGroupCodeReducer } from "../reducers/group";
import {
  saveCodeReducer,
  saveCodeInCollectionsReducer,
  unsaveCodeReducer,
} from "../reducers/collection";
import * as api from "../api";
import { Code, User } from "../../interfaces";

export const getCode = (codeId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(start());
    const { data } = await api.getCode(codeId);
    dispatch(getCodeReducer(data));
    dispatch(end());
  } catch (err: any) {
    err.response?.data?.message
      ? dispatch(error(err.response.data.message))
      : dispatch(error(err.message));
  }
};

export const getCodes =
  (loading: boolean = false, query: string) =>
  async (dispatch: Dispatch) => {
    try {
      loading && dispatch(start());
      const { data } = await api.getCodes(query);
      dispatch(getCodesReducer(data));
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const getSavedCodes = () => async (dispatch: Dispatch) => {
  try {
    dispatch(start());
    const { data } = await api.getSavedCodes();
    dispatch(getCodesReducer(data));
    dispatch(end());
  } catch (err: any) {
    err.response?.data?.message
      ? dispatch(error(err.response.data.message))
      : dispatch(error(err.message));
  }
};

export const getUserCodes = (userId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(start());
    const { data } = await api.getUserCodes(userId);
    dispatch(getUserCodesReducer(data));
    dispatch(end());
  } catch (err: any) {
    err.response?.data?.message
      ? dispatch(error(err.response.data.message))
      : dispatch(error(err.message));
  }
};

export const createCode =
  (codeData: any, onClose: () => void) => async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      const { data } = await api.createCode(codeData);
      if (codeData.groupId) {
        dispatch(
          createGroupCodeReducer({
            groupId: codeData.groupId as string,
            code: data,
          })
        );
      } else {
        dispatch(createCodeReducer(data));
      }
      onClose();
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };

export const updateCode =
  (codeId: string, codeData: any, onClose: () => void) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(start());
      const { data } = await api.updateCode(codeId, codeData);
      dispatch(updateCodeReducer(data));
      onClose();
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const shareCode =
  (code: Code, friendIds: string[], loggedUserId: string, setOpen: any) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(shareCodeReducer({ code, friendIds }));
      await api.shareCode(code._id as string, friendIds);
      setOpen(false);
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const shareCodeInGroups =
  (code: Code, groupIds: string[], loggedUserId: string, setOpen: any) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(shareCodeInGroupsReducer({ code, groupIds }));
      await api.shareCodeInGroups(code._id as string, groupIds);
      setOpen(false);
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const saveCode =
  (code: Code, type: "save" | "unsave") => async (dispatch: Dispatch) => {
    try {
      type == "save"
        ? dispatch(saveCodeReducer({ code }))
        : dispatch(unsaveCodeReducer({ code }));
      await api.saveCode(code._id as string);
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const saveCodeInCollections =
  (code: Code, collections: string[], setOpen: any) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(
        saveCodeInCollectionsReducer({ code, collectionIds: collections })
      );
      await api.saveCodeInCollections(code._id as string, collections);
      setOpen(false);
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const likeCode =
  (codeId: string, loggedUserId: string) => async (dispatch: Dispatch) => {
    try {
      dispatch(likeCodeReducer({ codeId, loggedUserId }));
      await api.likeCode(codeId);
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };

export const commentCode =
  (codeId: string, content: string, loggedUser: User) =>
  async (dispatch: Dispatch) => {
    try {
      await api.commentCode(codeId, content);
      dispatch(
        commentCodeReducer({ postId: codeId, content, user: loggedUser! })
      );
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };

export const deleteCode = (codeId: string) => async (dispatch: Dispatch) => {
  try {
    dispatch(start());
    const { data } = await api.deleteCode(codeId);
    dispatch(deleteCodeReducer(data));
    dispatch(end());
  } catch (err: any) {
    err.response?.data?.message
      ? dispatch(error(err.response.data.message))
      : dispatch(error(err.message));
  }
};
