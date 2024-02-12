import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Challenge, Code, Comment, Streak } from "../../interfaces";

interface InitialState {
  isFetching: boolean;
  error: string;
  comments: Comment[];
  userComments: Comment[];
  filteredComments: Comment[];
  currentComment: Comment | null;
}

const initialState: InitialState = {
  comments: [],
  userComments: [],
  filteredComments: [],
  isFetching: false,
  error: "",
  currentComment: null,
};

const commentSlice = createSlice({
  name: "comment",
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

    getCommentReducer: (state, action: PayloadAction<Comment>) => {
      state.currentComment = action.payload;
    },
    
  },
});

export default commentSlice.reducer;
export const {
  start,
  end,
  error,
  getCommentReducer, 
} = commentSlice.actions;
