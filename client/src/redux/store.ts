import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";

import codeReducer from "./reducers/code";
import friendReducer from "./reducers/friend";
import userReducer from "./reducers/userSlice";
import authReducer from "./reducers/authSlice";
import collectionReducer from "./reducers/collection";
import groupReducer from "./reducers/group";
import generalReducer from "./reducers/general";
import streakReducer from "./reducers/streak";
import challengeReducer from "./reducers/challenge";
import notificationReducer from "./reducers/notification";
import settingReducer from "./reducers/settingSlice";

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
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>;
export type AsyncAction = ThunkAction<void, RootState, null, AnyAction>;