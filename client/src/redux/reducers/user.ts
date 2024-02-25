import Cookie from "js-cookie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces";

interface InitialState {
  isFetching: boolean;
  error: string;
  users: User[];
  liked: User[];
  saved: User[];
  loggedUserToken: String | null;
  loggedUser: User | null;
  currentUser: User | null;
  accounts: User | [];
  count: number;
}

const stringifiedToken = Cookie.get("code.connect");
const stringifiedUser = localStorage.getItem("profile");
const stringifiedAccounts = Cookie.get("accounts");

const initialState: InitialState = {
  isFetching: false,
  error: "",
  users: [],
  liked: [],
  saved: [],
  currentUser: null,
  loggedUserToken: stringifiedToken ? JSON.parse(stringifiedToken) : null,
  loggedUser: stringifiedUser ? JSON.parse(stringifiedUser) : null,
  accounts: stringifiedAccounts ? JSON.parse(stringifiedAccounts) : [],
  count: 20,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    start: (state) => {
      state.isFetching = true;
    },
    end: (state) => {
      state.isFetching = false;
    },
    error: (state, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    setLoggedUserToken: (state, action: PayloadAction<any>) => {
      state.loggedUserToken = action.payload;
    },
    getUsersReducer: (
      state,
      action: PayloadAction<{ count: number; result: User[] }>
    ) => {
      state.users = action.payload.result;
      state.count = action.payload.count;
    },
    getUserReducer: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    getProfileReducer: (state, action: PayloadAction<User>) => {
      state.loggedUser = action.payload;
    },
    editPersonalDetailsReducer: (
      state,
      action: PayloadAction<{
        type: "interests" | "hobbies" | "books" | "programming";
        values: string[];
      }>
    ) => {
      state.loggedUser = {
        ...state.loggedUser!,
        [action.payload.type]: action.payload.values,
      };
    },
    registerReducer: (state, action: PayloadAction<User>) => {
      state.users = [...state.users, action.payload];
    },
    loginReducer: (state, action: PayloadAction<User>) => {
      state.loggedUser = action.payload;
    },
    changePasswordReducer: (state) => {
      return state;
    },
    sendForgetPasswordOTPReducer: (state) => {
      return state;
    },
    setNewPasswordReducer: (state) => {
      return state;
    },
    logoutReducer: (state) => {
      state.loggedUser = null;
    },
  },
});

export default userSlice.reducer;
export const {
  start,
  end,
  error,
  getUsersReducer,
  getUserReducer,
  getProfileReducer,
  editPersonalDetailsReducer,
  registerReducer,
  loginReducer,
  logoutReducer,
  changePasswordReducer,
  sendForgetPasswordOTPReducer,
  setNewPasswordReducer,
  setLoggedUserToken,
} = userSlice.actions;
