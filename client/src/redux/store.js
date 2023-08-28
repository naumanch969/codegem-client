import { configureStore, combineReducers } from '@reduxjs/toolkit'

import codeReducer from './reducers/code'
import userReducer from './reducers/user'

const reducer = combineReducers({
    code:codeReducer,
    user:userReducer,
})

export const store = configureStore({
    reducer
})