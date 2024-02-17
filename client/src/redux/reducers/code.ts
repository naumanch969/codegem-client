import Cookie from "js-cookie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Code, Comment } from "../../interfaces";

interface InitialState {
  isFetching: boolean;
  error: string;
  codes: Code[];
  filteredCodes: Code[];
  currentCode: Code | null;
  count: number;
}

const initialState: InitialState = {
  codes: [],
  filteredCodes: [],
  isFetching: false,
  error: "",
  currentCode: null,
  count: 10,
};

const codeSlice = createSlice({
  name: "code",
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

    like: (state, action: PayloadAction<string>) => {
      const codeId = action.payload;
      const stringifiedUser = Cookie.get("code.connect");
      const user = stringifiedUser ? JSON.parse(stringifiedUser) : null;
      state.filteredCodes = state.filteredCodes.map(
        (code) =>
          (code =
            code?._id == codeId
              ? { ...code, likes: [...code?.likes, user._id] }
              : code)
      );
    },

    filter: (state, action: PayloadAction<string>) => {
      const filter = action.payload;
      switch (filter) {
        case "all":
          state.filteredCodes = state.codes;
          break;
        case "recommended":
          state.filteredCodes = state.codes;
          break;
        case "latest": {
          const sortedArray = state.filteredCodes.slice();
          // .sort((a, b) => a.createdAt?.getTime()! - b.createdAt?.getTime()!);
          state.filteredCodes = sortedArray;
          break;
        }
        case "related":
          state.filteredCodes = state.codes;
          break;
        case "famous":
          const sortedArray = state.filteredCodes
            .slice()
            .sort((a, b) => b.likes.length - a.likes.length);
          state.filteredCodes = sortedArray;
          break;
      }
    },

    ALike: (state, action: PayloadAction<Code>) => {
      const codeCode = action.payload;
      state.codes = state.codes.map(
        (code) => (code = code?._id == codeCode?._id ? action.payload : code)
      );
    },

    getCodeReducer: (state, action: PayloadAction<Code>) => {
      state.currentCode = action.payload;
    },
    getCodesReducer: (
      state,
      action: PayloadAction<{ result: Code[]; count?: number }>
    ) => {
      state.codes = action.payload.result;
      if (action.payload.count) state.count = action.payload.count;
    },
    getUserCodesReducer: (
      state,
      action: PayloadAction<{ result: Code[]; count?: number }>
    ) => {
      state.codes = action.payload.result;
      if (action.payload.count) state.count = action.payload.count;
    },
    getCommentsReducer: (
      state,
      action: PayloadAction<{ codeId: string; comments: Comment[] }>
    ) => {
      state.codes = state.codes.map(
        (code) =>
          (code =
            code._id == action.payload.codeId
              ? { ...code, comments: action.payload.comments }
              : code)
      );
    },
    createCodeReducer: (state, action: PayloadAction<Code>) => {
      state.codes = [action.payload, ...state.codes];
    },
    updateCodeReducer: (state, action: PayloadAction<Code>) => {
      state.codes = state.codes.map(
        (code) =>
          (code = code._id == action.payload._id ? action.payload : code)
      );
    },
    shareCodeReducer: (
      state,
      action: PayloadAction<{
        code: Code;
        friendIds: string[];
      }>
    ) => {
      state.codes = state.codes.map(
        (code) =>
          (code =
            code._id == action.payload.code._id
              ? {
                  ...code,
                  shares: [...code.shares, ...action.payload.friendIds],
                }
              : code)
      );
    },
    shareCodeInGroupsReducer: (
      state,
      action: PayloadAction<{
        code: Code;
        groupIds: string[];
      }>
    ) => {
      state.codes = state.codes.map(
        (code) =>
          (code =
            code._id == action.payload.code._id
              ? {
                  ...code,
                  // groups: [...code.groups, ...action.payload.groupObjs],
                }
              : code)
      );
    },
    likeCodeReducer: (
      state,
      action: PayloadAction<{ codeId: string; loggedUserId: string }>
    ) => {
      const codeId = action.payload.codeId;
      state.codes = state.codes.map(
        (code) =>
          (code =
            code._id == codeId
              ? {
                  ...code,
                  likes: code.likes.includes(action.payload.loggedUserId)
                    ? code.likes.filter((l) => l != action.payload.loggedUserId)
                    : code.likes.concat(action.payload.loggedUserId),
                }
              : code)
      );
    },
    commentCodeReducer: (state, action: PayloadAction<Comment>) => {
      state.codes = state.codes.map(
        (code) =>
          (code =
            code._id == action.payload.postId
              ? { ...code, comments: [action.payload, ...code.comments] }
              : code)
      );
    },
    deleteCodeReducer: (state, action: PayloadAction<Code>) => {
      state.codes = state.codes.filter(
        (code) => code._id != action.payload._id
      );
    },
  },
});

export default codeSlice.reducer;
export const {
  start,
  end,
  error,
  like,
  filter,
  ALike,
  getCodeReducer,
  getCodesReducer,
  getUserCodesReducer,
  createCodeReducer,
  shareCodeReducer,
  shareCodeInGroupsReducer,
  updateCodeReducer,
  likeCodeReducer,
  commentCodeReducer,
  deleteCodeReducer,
  getCommentsReducer,
} = codeSlice.actions;
