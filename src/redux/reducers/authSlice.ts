import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '@/interfaces';
import * as api from '../api'
import toast from 'react-hot-toast';
import Cookies from "js-cookie";
import { setLoggedUserSlice, setLoggedUserTokenSlice } from "@/redux/reducers/userSlice";
import { useNavigate } from 'react-router-dom'

interface AuthState { isLoading: boolean; error: { message: string; code: string } | null; }

export const register = createAsyncThunk<{ result: User, token: string }, User>('register', async (userCredentials) => {
    try {
        const { data: { token, message, result }, } = await api.register(userCredentials);
        toast.success(message)
        return { result, token };
    } catch (error) {
        toast.error('Something went wrong!')
        throw error as string;
    }
});

export const verifyRegisterationEmail = createAsyncThunk<boolean, string>('verifyRegisterationEmail', async (otp) => {
    try {
        const email = JSON.parse(localStorage.getItem("email") || "{}"); // Setup during registeration
        const userData = { email: email?.email, otp };
        const { data: { message }, } = await api.verifyRegisterationEmail(userData);
        toast.success(message)
        return true;
    } catch (error) {
        console.error(error)
        toast.error('Something went wrong!')
        throw error as string;
    }
});

export const login = createAsyncThunk<{ result: User, token: string }, { username: string, password: string }>('login', async (userCredentials) => {
    try {
        const { data: { token, message, result } } = await api.login(userCredentials);
        
        toast.success(message)
        return { result, token };
    } catch (error) {
        toast.error('Something went wrong!')
        throw error as string;
    }
});

export const changePassword = createAsyncThunk<boolean, { oldPassword: string, newPassword: string }>('changePassword', async (userCredentials) => {
    try {
        const { data: { message }, } = await api.changePassword(userCredentials);
        toast.success(message);
        return true
    } catch (error) {
        toast.error('Something went wrong!')
        throw error as string;
    }
});

export const sendOTP = createAsyncThunk('sendOTP', async (email: string) => {
    try {
        const { data: { message } } = await api.sendOTP(email);
        toast.success(message);
        return
    } catch (error) {
        toast.error('Something went wrong!')
        throw error as string;
    }
});

export const resendOTP = createAsyncThunk('resendOTP', async () => {
    try {
        const email = JSON.parse(localStorage.getItem("email") || "{}");
        const { data: { message }, } = await api.sendOTP(email.email);
        toast.success(message);
        return;
    }
    catch (error) {
        toast.error('Something went wrong!')
        throw error as string;
    }
})

export const verifyOTP = createAsyncThunk<boolean, string>('verifyOTP', async (otp) => {
    try {
        const email = JSON.parse(localStorage.getItem("email") || "{}");
        const userData = { email: email?.email, otp };
        const { data: { message }, } = await api.verifyOTP(userData);
        toast.success(message);
        return true
    } catch (error) {
        toast.error('Something went wrong!')
        throw error as string;
    }
});

export const setNewPassword = createAsyncThunk('setNewPassword', async (password: string) => {
    try {
        const email = JSON.parse(localStorage.getItem("email") || "{}");
        const userData = { email: email?.email, password };
        const emailVerified = JSON.parse(localStorage.getItem("emailVerified") || "{}");
        if (!emailVerified) return;
        const { data: { message } } = await api.setNewPassword(userData);
        toast.success(message);
        return true
    } catch (error) {
        toast.error('Something went wrong!')
        throw error;
    }
});

export const logout = createAsyncThunk('setNewPassword', async (navigate: ReturnType<typeof useNavigate>, { dispatch }) => {
    try {
        Cookies.remove("code.connect");
        localStorage.clear();
        dispatch(setLoggedUserSlice(null));
        dispatch(setLoggedUserTokenSlice(null)); // to remove token from the state
        navigate("/auth/login");
        return
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
