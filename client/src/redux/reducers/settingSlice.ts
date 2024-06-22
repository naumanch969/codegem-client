import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { Setting } from '../../interfaces';
import * as api from '../api'

interface SettingState {
    setting?: Setting | null;
    isLoading: boolean;
    error: string | null;
}

export const getSettings = createAsyncThunk<Setting, undefined>('settings/getSettings', async () => {
    try {
        const { data } = await api.getSettings()
        return data
    } catch (error) {
        toast.error('Something went wrong!')
        console.error('error getSettings', error)
    }
})
export const updateSettings = createAsyncThunk<Setting, any>('settings/updateSettings', async (formData) => {
    try {
        const { data } = await api.updateSettings(formData)
        return data
    } catch (error) {
        toast.error('Something went wrong!')
        console.error('error updateSettings', error)
    }
})


const initialState: SettingState = {
    setting: null,
    isLoading: false,
    error: null,
};

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        resetState: () => initialState,
        setsettingSlice: (state, action: PayloadAction<Setting>) => {
            state.setting = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSettings.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload)
                    state.setting = action.payload
            })
            .addCase(updateSettings.fulfilled, (state, action) => {
                state.isLoading = false
                if (action.payload)
                    state.setting = action.payload
            })
            .addCase(settingActions.resetState, (state) => {
                state.setting = undefined;
                state.isLoading = false;
                state.error = null;
            })
            .addDefaultCase((state) => state);
    },
});

export default settingSlice.reducer;
export const { resetState, setsettingSlice } = settingSlice.actions;
export const { actions: settingActions } = settingSlice;
