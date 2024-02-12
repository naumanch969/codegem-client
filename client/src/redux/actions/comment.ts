import { Dispatch } from "redux";
import { start, end, error, getCommentReducer } from "../reducers/comment";
import { getCommentsReducer as getCodeCommentsReducer } from "../reducers/code";
import { getCommentsReducer as getStreakCommentsReducer } from "../reducers/streak";
import { getCommentsReducer as getChallengeCommentsReducer } from "../reducers/challenge";
import * as api from "../api";

export const getComments =
  (
    postId: string,
    postType: "code" | "streak" | "challenge",
    setLoading: any
  ) =>
  async (dispatch: Dispatch) => {
    try {
      setLoading(true);
      const { data } = await api.getComments(postId, postType);
      if (postType == "code") {
        dispatch(getCodeCommentsReducer({ codeId: postId, comments: data }));
      } else if (postType == "streak") {
        dispatch(
          getStreakCommentsReducer({ streakId: postId, comments: data })
        );
      } else {
        dispatch(
          getChallengeCommentsReducer({ challengeId: postId, comments: data })
        );
      }
    } catch (err: any) {
      err.response?.data?.message
        ? dispatch(error(err.response.data.message))
        : dispatch(error(err.message));
    } finally {
      setLoading(false);
    }
  };
