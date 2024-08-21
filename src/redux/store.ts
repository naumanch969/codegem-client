import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

import codeReducer from "./reducers/code";
import friendReducer from "./reducers/friendSlice";
import userReducer from "./reducers/userSlice";
import authReducer from "./reducers/authSlice";
import collectionReducer from "./reducers/collection";
import groupReducer from "./reducers/group";
import generalReducer from "./reducers/general";
import streakReducer from "./reducers/streak";
import challengeReducer from "./reducers/challenge";
import notificationReducer from "./reducers/notificationSlice";
import settingReducer from "./reducers/settingSlice";
import chatReducer from "./reducers/chatSlice";

const reducer = combineReducers({
  auth: authReducer,
  friend: friendReducer,
  code: codeReducer,
  collection: collectionReducer,
  user: userReducer,
  group: groupReducer,
  general: generalReducer,
  streak: streakReducer,
  challenge: challengeReducer,
  notification: notificationReducer,
  setting: settingReducer,
  chat: chatReducer,
});

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

});

export type RootState = ReturnType<typeof reducer>;
export type AsyncAction = ThunkAction<void, RootState, null, AnyAction>;