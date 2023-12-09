import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Code, Collection } from '../../interfaces'

interface InitialState {
    isFetching: boolean,
    error: string,
    collections: Collection[],
    userCollections: Collection[],
    filteredCollections: Collection[],
    currentCollection: Collection | null
}

const initialState: InitialState = {
    collections: [],
    userCollections: [],
    filteredCollections: [],
    isFetching: false,
    error: '',
    currentCollection: null
}

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        start: (state) => { state.isFetching = true; },
        end: (state) => { state.isFetching = false; },
        error: (state, action: PayloadAction<string>) => { state.isFetching = false; state.error = action.payload },


        getCollectionReducer: (state, action: PayloadAction<Collection>) => {
            state.currentCollection = action.payload
        },
        getCollectionsReducer: (state, action: PayloadAction<Collection[]>) => {
            state.collections = action.payload
        },
        getUserCollectionsReducer: (state, action: PayloadAction<Collection[]>) => {
            state.userCollections = action.payload
        },
        createCollectionReducer: (state, action: PayloadAction<Collection>) => {
            state.userCollections = [action.payload, ...state.userCollections]
        },
        saveCodeReducer: (state, action: PayloadAction<{ code: Code }>) => {
            state.userCollections = state.userCollections.map(collection => collection = collection.name == 'Saved' ? { ...collection, codes: [action.payload.code, ...collection.codes] } : collection)
        },
        saveCodeInCollectionsReducer: (state, action: PayloadAction<{ code: Code, collectionIds: string[] }>) => {
            state.userCollections = state.userCollections.map(collection => collection = action.payload.collectionIds.includes(collection._id) ? { ...collection, codes: [action.payload.code, ...collection.codes] } : collection)
        },
        updateCollectionReducer: (state, action: PayloadAction<Collection>) => {
            state.userCollections = state.userCollections.map(collection => collection = collection._id == action.payload._id ? action.payload : collection)
        },
        deleteCollectionReducer: (state, action: PayloadAction<Collection>) => {
            state.userCollections = state.userCollections.filter(collection => collection._id != action.payload._id)
        },
    }
})

export default collectionSlice.reducer
export const { start, end, error, getCollectionReducer, getCollectionsReducer, getUserCollectionsReducer, saveCodeReducer, saveCodeInCollectionsReducer, createCollectionReducer, updateCollectionReducer, deleteCollectionReducer, } = collectionSlice.actions