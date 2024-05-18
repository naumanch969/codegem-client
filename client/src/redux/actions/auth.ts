import * as api from "../api";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { start, end, error, setLoggedUserToken, loginReducer, logoutReducer, changePasswordReducer, } from "../reducers/user";
import { AsyncAction } from "../store";
import { User } from "../../interfaces";

export const register = (userData: User, navigate: ReturnType<typeof useNavigate>, setSnackbarText: any): AsyncAction => async (dispatch) => {
  try {
    dispatch(start());
    const { data: { token, message }, } = await api.register(userData);
    setSnackbarText(message);
    Cookie.set("code.connect", JSON.stringify(token)); // just for development
    localStorage.setItem("email", JSON.stringify({ email: userData.email })); // for verifyRegisterationEmail
    navigate("/auth/verify_register_otp");
    dispatch(end());
  } catch (err: any) {
    err.response?.data?.message
      ? dispatch(error(err.response.data.message))
      : err.response?.data?.message ? dispatch(error(err.response.data.message)) : dispatch(error(err.message));
  }
};
export const verifyRegisterationEmail = (otp: string, navigate: ReturnType<typeof useNavigate>, setSnackbarText: any): AsyncAction => async (dispatch) => {
  try {
    dispatch(start());
    const email = JSON.parse(localStorage.getItem("email") || "{}"); // setup during registeration
    const userData = { email: email?.email, otp };
    const {
      data: { message },
    } = await api.verifyRegisterationEmail(userData);
    setSnackbarText(message);
    localStorage.removeItem("email");
    const connect = Cookie.get("code.connect");
    if (connect) {
      navigate("/");
    } else {
      navigate("/auth/login");
    }
    dispatch(end());
  } catch (err: any) {
    err.response?.data?.message
      ? dispatch(error(err.response.data.message))
      : dispatch(error(err.message));
  }
};
export const login = (userData: { username: string; password: string }, navigate: ReturnType<typeof useNavigate>, setSnackbarText: any): AsyncAction => async (dispatch) => {
  try {
    dispatch(start());
    const { data } = await api.login(userData);
    const { token, message, result } = data;
    setSnackbarText(message);
    Cookie.set("code.connect", JSON.stringify(token)); // just for development
    localStorage.setItem("profile", JSON.stringify(result)); // to keep track of user data
    dispatch(setLoggedUserToken(token));
    dispatch(loginReducer(result));
    navigate("/");
    dispatch(end());
  } catch (err: any) {
    err.response?.data?.message
      ? dispatch(error(err.response.data.message))
      : dispatch(error(err.message));
  }
};
export const changePassword = (userData: any, navigate: ReturnType<typeof useNavigate>, setSnackbarText: any): AsyncAction => async (dispatch) => {
  try {
    dispatch(start());
    const { data: { message }, } = await api.changePassword(userData);
    setSnackbarText(message);
    dispatch(changePasswordReducer());
    navigate("/");
    dispatch(end());
  } catch (err: any) {
    err.response?.data?.message
      ? dispatch(error(err.response.data.message))
      : dispatch(error(err.message));
  }
};
export const sendOTP = (email: string, navigate: ReturnType<typeof useNavigate>, setSnackbarText: any): AsyncAction => async (dispatch) => {
  try {
    dispatch(start());
    const { data: { message } } = await api.sendOTP(email);
    setSnackbarText(message);
    localStorage.setItem("email", JSON.stringify({ email }));
    // dispatch(sendForgetPasswordOTPReducer())
    navigate("/auth/verify_otp");
    dispatch(end());
  } catch (err: any) {
    err.response?.data?.message
      ? dispatch(error(err.response.data.message))
      : dispatch(error(err.message));
  }
};
export const resendOTP =
  (setSnackbarText: any): AsyncAction =>
    async (dispatch) => {
      try {
        dispatch(start());
        const email = JSON.parse(localStorage.getItem("email") || "{}");
        const { data: { message }, } = await api.sendOTP(email.email);
        setSnackbarText(message);
        // dispatch(sendForgetPasswordOTPReducer())
        dispatch(end());
      } catch (err: any) {
        err.response?.data?.message
          ? dispatch(error(err.response.data.message))
          : dispatch(error(err.message));
      }
    };
export const verifyOTP =
  (otp: string, navigate: ReturnType<typeof useNavigate>, setSnackbarText: any): AsyncAction =>
    async (dispatch) => {
      try {
        dispatch(start());
        const email = JSON.parse(localStorage.getItem("email") || "{}");
        const userData = { email: email?.email, otp };
        const { data: { message }, } = await api.verifyOTP(userData);
        setSnackbarText(message);
        localStorage.setItem("emailVerified", JSON.stringify({ isVerified: true }));
        navigate("/auth/new_password");
        dispatch(end());
      } catch (err: any) {
        err.response?.data?.message
          ? dispatch(error(err.response.data.message))
          : dispatch(error(err.message));
      }
    };
export const setNewPassword = (password: any, navigate: ReturnType<typeof useNavigate>, setSnackbarText: any): AsyncAction => async (dispatch) => {
  try {
    dispatch(start());
    const email = JSON.parse(localStorage.getItem("email") || "{}");
    const userData = { email: email?.email, password };
    const emailVerified = JSON.parse(
      localStorage.getItem("emailVerified") || "{}"
    );
    if (!emailVerified) return;
    const {
      data: { message },
    } = await api.setNewPassword(userData);
    setSnackbarText(message);
    localStorage.removeItem("email");
    localStorage.removeItem("emailVerified");
    // dispatch(setNewPasswordReducer())
    navigate("/auth/login");
    dispatch(end());
  } catch (err: any) {
    err.response?.data?.message
      ? dispatch(error(err.response.data.message))
      : dispatch(error(err.message));
  }
};
export const logout = (navigate: ReturnType<typeof useNavigate>): AsyncAction => async (dispatch) => {
  try {
    dispatch(start());
    Cookie.remove("code.connect");
    localStorage.removeItem("profile");
    dispatch(logoutReducer());
    dispatch(setLoggedUserToken(null)); // to remove token from the state
    navigate("/auth/login");
    dispatch(end());
  } catch (err: any) {
    err.response?.data?.message
      ? dispatch(error(err.response.data.message))
      : dispatch(error(err.message));
  }
};
