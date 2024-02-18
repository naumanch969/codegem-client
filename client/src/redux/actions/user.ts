import * as api from "../api";
import {
  start,
  end,
  error,
  getAllUsersReducer,
  getUserReducer,
  getProfileReducer,
  editPersonalDetailsReducer,
} from "../reducers/user";
import { AsyncAction } from "../store";
import { User } from "../../interfaces";

export const getAllUsers = (): AsyncAction => async (dispatch) => {
  try {
    dispatch(start());
    const { data } = await api.getAllUsers();
    dispatch(getAllUsersReducer(data));
    dispatch(end());
  } catch (err: any) {
    err.response?.data?.message
      ? dispatch(error(err.response.data.message))
      : dispatch(error(err.message));
  }
};
export const getUser =
  (userId: string): AsyncAction =>
  async (dispatch) => {
    try {
      dispatch(start());
      const { data } = await api.getUser(userId);
      dispatch(getUserReducer(data));
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const getProfile = (): AsyncAction => async (dispatch) => {
  try {
    dispatch(start());
    const { data } = await api.getProfile();
    localStorage.setItem("profile", JSON.stringify(data));
    dispatch(getProfileReducer(data));
    dispatch(end());
  } catch (err: any) {
    err.response?.data?.message
      ? dispatch(error(err.response.data.message))
      : dispatch(error(err.message));
  }
};
export const updateProfile =
  (profileData: any): AsyncAction =>
  async (dispatch) => {
    try {
      dispatch(start());
      const { data } = await api.updateProfile(profileData);
      dispatch(getProfileReducer(data));
      dispatch(end());
    } catch (error) {
      console.log(error);
    }
  };
export const editPersonalDetails =
  (
    type: "interests" | "hobbies" | "books" | "programming",
    values: string[]
  ): AsyncAction =>
  async (dispatch) => {
    try {
      dispatch(start());
      const { data } = await api.editPersonalDetails(type, values);
      dispatch(editPersonalDetailsReducer({ type, values }));
      dispatch(end());
    } catch (error) {
      console.log(error);
    }
  };
