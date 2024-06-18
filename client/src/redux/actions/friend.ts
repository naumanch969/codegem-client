import { User } from "@/interfaces";
import * as api from "../api";
import {
  start,
  end,
  error,
  getSuggestedUsersReducer,
  getFriendsReducer,
  getSentRequestsReducer,
  removeFriendRequestReducer,
  getReceivedRequestsReducer,
  sendFriendRequestReducer,
  acceptFriendRequestReducer,
  rejectFriendRequestReducer,
} from "../reducers/friend";
import { AsyncAction } from "../store";
import { setUsersCountSlice, setUsersSlice } from "../reducers/userSlice";

export const getSuggestedUsers = (loading: boolean = false, query: string): AsyncAction =>
  async (dispatch) => {
    try {
      loading && dispatch(start());
      const { data } = await api.getSuggestedUsers(query);
      dispatch(getSuggestedUsersReducer(data));
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };

export const getFriends = (loading: boolean = false, query: string): AsyncAction =>
  async (dispatch) => {
    try {
      loading && dispatch(start());
      const { data }: { data: { count: number; result: User[] } } = await api.getFriends(query);
      dispatch(getFriendsReducer({ result: data.result, count: data.count }));
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const searchFriends = (loading: boolean = false, query: string): AsyncAction =>
  async (dispatch) => {
    try {
      loading && dispatch(start());
      const { data }: { data: { count: number; result: User[] } } = await api.searchFriends(query);
      dispatch(getFriendsReducer({ result: data.result, count: data.count }));
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const searchUsers = (loading: boolean = false, query: string): AsyncAction =>
  async (dispatch) => {
    try {
      loading && dispatch(start());
      const { data }: { data: { count: number; result: User[] } } = await api.searchUsers(query);
      dispatch(setUsersCountSlice(data.count))
      dispatch(setUsersSlice(data.result))
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };

export const getSentRequests = (loading: boolean = false, query: string): AsyncAction =>
  async (dispatch) => {
    try {
      loading && dispatch(start());
      const { data } = await api.getSentRequests(query);
      dispatch(getSentRequestsReducer(data));
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };

export const getReceivedRequests = (loading: boolean = false, query: string): AsyncAction =>
  async (dispatch) => {
    try {
      loading && dispatch(start());
      const { data } = await api.getReceivedRequests(query);
      dispatch(getReceivedRequestsReducer(data));
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };

export const sendFriendRequest = (receiverId: string): AsyncAction =>
  async (dispatch) => {
    try {
      const { data } = await api.sendFriendRequest(receiverId);
      dispatch(sendFriendRequestReducer(data));
    } catch (err: any) {
      const e = err?.response?.data;
      var errorMessage;
      e?.message ? (errorMessage = e.message) : (errorMessage = err.message);
      dispatch(error(errorMessage));
    }
  };

export const acceptFriendRequest = (senderId: string): AsyncAction =>
  async (dispatch) => {
    // in this request, user is the accepter
    try {
      const { data } = await api.acceptFriendRequest(senderId);
      dispatch(acceptFriendRequestReducer(data));
    } catch (err: any) {
      const e = err?.response?.data;
      var errorMessage;
      e?.message ? (errorMessage = e.message) : (errorMessage = err.message);
      dispatch(error(errorMessage));
    }
  };

export const removeFriendRequest = (receiverId: string): AsyncAction =>
  async (dispatch) => {
    try {
      const { data } = await api.removeFriendRequest(receiverId);
      dispatch(removeFriendRequestReducer(data));
    } catch (err: any) {
      const e = err?.response?.data;
      var errorMessage;
      e?.message ? (errorMessage = e.message) : (errorMessage = err.message);
      dispatch(error(errorMessage));
    }
  };

export const rejectFriendRequest = (receiverId: string): AsyncAction =>
  async (dispatch) => {
    try {
      const { data } = await api.rejectFriendRequest(receiverId);
      dispatch(rejectFriendRequestReducer(data));
    } catch (err: any) {
      const e = err?.response?.data;
      var errorMessage;
      e?.message ? (errorMessage = e.message) : (errorMessage = err.message);
      dispatch(error(errorMessage));
    }
  };
