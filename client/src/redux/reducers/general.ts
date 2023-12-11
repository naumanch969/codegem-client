import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    isFetching: boolean,
    error: string,
    url: string
}

const initialState: InitialState = {
    isFetching: false,
    error: '',
    url: ''
}

const generalSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        start: (state) => { state.isFetching = true, state.error = '' },
        end: (state) => { state.isFetching = false, state.error = '' },
        error: (state, action) => { state.isFetching = false, state.error = action.payload },
        uploadImageReducer: (state, action) => { state.url = action.payload },
        deleteImageReducer: (state) => { state.url = '' },
    }
})

export const { start, end, error, uploadImageReducer, deleteImageReducer } = generalSlice.actions
export default generalSlice.reducer