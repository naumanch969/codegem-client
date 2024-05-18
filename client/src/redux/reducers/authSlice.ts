import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '@/interfaces';
import * as api from '../api'
import toast from 'react-hot-toast';
import Cookie from 'js-cookie'

interface AuthState { isLoading: boolean; error: { message: string; code: string } | null; }

export const register = createAsyncThunk<User, User>('register', async (userCredentials) => {
    try {
        const { data: { token, message, result }, } = await api.register(userCredentials);
        Cookie.set("code.connect", JSON.stringify(token)); // just for development
        localStorage.setItem("email", JSON.stringify({ email: userCredentials.email })); // for verifyRegisterationEmail
        // AFTER: navigate("/auth/verify_register_otp");
        // AFTER: store user in state.user
        toast.success(message)
        return result as User;
    } catch (error) {
        toast.error('Something went wrong!')
        throw error as string;
    }
});

export const verifyRegisterationEmail = createAsyncThunk<boolean, string>('verifyRegisterationEmail', async (otp) => {
    try {
        const email = JSON.parse(localStorage.getItem("email") || "{}"); // setup during registeration
        const userData = { email: email?.email, otp };
        const { data: { message }, } = await api.verifyRegisterationEmail(userData);
        localStorage.removeItem("email");
        toast.success(message)
        // AFTER:
        // const connect = Cookie.get("code.connect");
        // if (connect) {
        //     navigate("/");
        // } else {
        //     navigate("/auth/login");
        // }
        return true;
    } catch (error) {
        toast.error('Something went wrong!')
        throw error as string;
    }
});

export const login = createAsyncThunk<User, { username: string, password: string }>('login', async (userCredentials) => {
    try {
        const { data: { token, message, result } } = await api.login(userCredentials);
        toast.success(message)
        Cookie.set("code.connect", JSON.stringify(token));
        localStorage.setItem("profile", JSON.stringify(result));
        // AFTER
        // dispatch(setLoggedUserToken(token));
        // dispatch(loginReducer(result));
        // navigate("/");
        return result;
    } catch (error) {
        toast.error('Something went wrong!')
        throw error as string;
    }
});

export const changePassword = createAsyncThunk<boolean, { oldPassword: string, newPassword: string }>('changePassword', async (userCredentials) => {
    try {
        const { data: { message }, } = await api.changePassword(userCredentials);
        toast.success(message);
        // AFTER:
        // dispatch(changePasswordReducer());
        // navigate("/");
        return true
    } catch (error) {
        toast.error('Something went wrong!')
        throw error as string;
    }
});

export const sendOTP = createAsyncThunk<boolean, string>('sendOTP', async (email) => {
    try {
        const { data: { message } } = await api.sendOTP(email);
        toast.success(message);
        localStorage.setItem("email", JSON.stringify({ email }));
        // AFTER:
        // dispatch(sendForgetPasswordOTPReducer())
        // navigate("/auth/verify_otp");
        return true
    } catch (error) {
        toast.error('Something went wrong!')
        throw error as string;
    }
});

export const verifyOTP = createAsyncThunk<boolean, string>('verifyOTP', async (otp) => {
    try {
        const email = JSON.parse(localStorage.getItem("email") || "{}");
        const userData = { email: email?.email, otp };
        const { data: { message }, } = await api.verifyOTP(userData);
        toast.success(message);
        localStorage.setItem("emailVerified", JSON.stringify({ isVerified: true }));
        // AFTER:
        // navigate("/auth/new_password");
        return true
    } catch (error) {
        toast.error('Something went wrong!')
        throw error as string;
    }
});

export const setNewPassword = createAsyncThunk<boolean, string>('verifyOTP', async (password) => {
    try {
        const email = JSON.parse(localStorage.getItem("email") || "{}");
        const userData = { email: email?.email, password };
        const emailVerified = JSON.parse(localStorage.getItem("emailVerified") || "{}");
        if (!emailVerified) return;
        const { data: { message } } = await api.setNewPassword(userData);
        toast.success(message);
        localStorage.removeItem("email");
        localStorage.removeItem("emailVerified");
        // AFTER:
        // dispatch(setNewPasswordReducer())
        // navigate("/auth/login");
        return true
    } catch (error) {
        toast.error('Something went wrong!')
        throw error;
    }
});

export const logout = createAsyncThunk<boolean>('setNewPassword', async () => {
    try {
        Cookie.remove("code.connect");
        localStorage.removeItem("profile");
        // AFTER: 
        // dispatch(logoutReducer());
        // dispatch(setLoggedUserToken(null)); // to remove token from the state
        // navigate("/auth/login");
        return true
    } catch (error) {
        toast.error('Something went wrong!')
        throw error;
    }
});



const initialState: AuthState = { isLoading: false, error: null, };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = { message: action.error.message || '', code: action.error.code || '' };
            })
    },
});

export default authSlice.reducer;
export const selectAuth = (state: RootState) => state.auth;
export const { resetState: resetAuthState } = authSlice.actions;
