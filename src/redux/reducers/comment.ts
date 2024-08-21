import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "../../interfaces";
import { getCommentsReducer as getCodeCommentsReducer } from "../reducers/code";
import { getCommentsReducer as getStreakCommentsReducer } from "../reducers/streak";
import { getCommentsReducer as getChallengeCommentsReducer } from "../reducers/challenge";
import * as api from "../api";

interface InitialState {
  isFetching: boolean;
  error: string;
  comments: Comment[];
  userComments: Comment[];
  filteredComments: Comment[];
  currentComment: Comment | null;
}

export const getComments = createAsyncThunk<Comment[], { postId: string, postType: "code" | "streak" | "challenge" }>('comment/getComments', async ({ postId, postType }, { dispatch }) => {
  try {
    const { data } = await api.getComments(postId, postType);
    if (postType == "code") {
      dispatch(getCodeCommentsReducer({ codeId: postId, comments: data }));
    } else if (postType == "streak") {
      dispatch(getStreakCommentsReducer({ streakId: postId, comments: data }));
    } else {
      dispatch(getChallengeCommentsReducer({ challengeId: postId, comments: data }));
    }

    return data
  } catch (err: any) {
    return err.response?.data?.message || err.message
  }
})


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
    getCommentReducer: (state, action: PayloadAction<Comment>) => {
      state.currentComment = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.fulfilled, (state, action) => { })
  },
});

export default commentSlice.reducer;
export const { getCommentReducer, } = commentSlice.actions;
