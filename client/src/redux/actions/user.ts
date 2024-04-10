import * as api from "../api";
import {
  start,
  end,
  error,
  getUsersReducer,
  getUserReducer,
  getProfileReducer,
  editPersonalDetailsReducer,
  deleteUserReducer,
} from "../reducers/user";
import { AsyncAction } from "../store";
import { User } from "../../interfaces";
import { useNavigate } from "react-router-dom";

export const getUsers =
  (loading: boolean = false, query: string): AsyncAction =>
  async (dispatch) => {
    try {
      loading && dispatch(start());
      const { data } = await api.getUsers();
      dispatch(getUsersReducer(data));
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
export const deleteUser =
  (userId: string, navigate: ReturnType<typeof useNavigate>): AsyncAction =>
  async (dispatch) => {
    try {
      dispatch(start());
      await api.deleteUser(userId);
      dispatch(deleteUserReducer(userId));
      navigate("/friends");
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
