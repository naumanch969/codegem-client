import * as api from "../api";
import {
  start,
  end,
  error,
  uploadImageReducer,
  deleteImageReducer,
} from "../reducers/general";
import { AsyncAction } from "../store";

export const uploadImage =
  (formData: FormData): AsyncAction =>
  async (dispatch) => {
    try {
      dispatch(start());
      const { data } = await api.uploadImage(formData);
      dispatch(uploadImageReducer(data.result));
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
export const deleteImage =
  (filename: string): AsyncAction =>
  async (dispatch) => {
    try {
      dispatch(start());
      const { data } = await api.deleteImage(filename);
      dispatch(deleteImageReducer());
      dispatch(end());
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    }
  };
