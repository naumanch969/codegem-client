import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

import codeReducer from './reducers/code'
import friendReducer from './reducers/friend'
import userReducer from './reducers/user'
import collectionReducer from './reducers/collection'
import groupReducer from './reducers/group'

const reducer = combineReducers({
    friend: friendReducer,
    code: codeReducer,
    collection: collectionReducer,
    user: userReducer,
    group: groupReducer,
})

export const store = configureStore({
    reducer
})


export type RootState = ReturnType<typeof reducer>;

// Define the async action creator type
export type AsyncAction = ThunkAction<void, RootState, null, AnyAction>;
