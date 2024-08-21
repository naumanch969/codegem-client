import Cookie from "js-cookie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Challenge, Comment } from "../../interfaces";

interface InitialState {
  isFetching: boolean;
  error: string;
  challenges: Challenge[];
  filteredChallenges: Challenge[];
  currentChallenge: Challenge | null;
  count: number;
}

const initialState: InitialState = {
  challenges: [],
  filteredChallenges: [],
  isFetching: false,
  error: "",
  currentChallenge: null,
  count: 20,
};

const challengeSlice = createSlice({
  name: "challenge",
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
      const challengeId = action.payload;
      const stringifiedUser = Cookie.get("challenge.connect");
      const user = stringifiedUser ? JSON.parse(stringifiedUser) : null;
      state.filteredChallenges = state.filteredChallenges.map(
        (challenge) =>
          (challenge =
            challenge?._id == challengeId
              ? { ...challenge, likes: [...challenge?.likes, user._id] }
              : challenge)
      );
    },

    filter: (state, action: PayloadAction<string>) => {
      const filter = action.payload;
      switch (filter) {
        case "all":
          state.filteredChallenges = state.challenges;
          break;
        case "recommended":
          state.filteredChallenges = state.challenges;
          break;
        case "latest": {
          const sortedArray = state.filteredChallenges
            .slice()
            .sort(
              (a, b) =>
                (a.createdAt as Date)?.getTime()! -
                (b.createdAt as Date)?.getTime()!
            );
          state.filteredChallenges = sortedArray;
          break;
        }
        case "related":
          state.filteredChallenges = state.challenges;
          break;
        case "famous":
          const sortedArray = state.filteredChallenges
            .slice()
            .sort((a, b) => b.likes.length - a.likes.length);
          state.filteredChallenges = sortedArray;
          break;
      }
    },

    ALike: (state, action: PayloadAction<Challenge>) => {
      const challengeChallenge = action.payload;
      state.challenges = state.challenges.map(
        (challenge) =>
          (challenge =
            challenge?._id == challengeChallenge?._id
              ? action.payload
              : challenge)
      );
    },

    getChallengeReducer: (state, action: PayloadAction<Challenge>) => {
      state.currentChallenge = action.payload;
    },
    getChallengesReducer: (
      state,
      action: PayloadAction<{ result: Challenge[]; count?: number }>
    ) => {
      state.challenges = action.payload.result;
      if (action.payload.count) state.count = action.payload.count;
    },
    getUserChallengesReducer: (
      state,
      action: PayloadAction<{ result: Challenge[]; count?: number }>
    ) => {
      state.challenges = action.payload.result;
      if (action.payload.count) state.count = action.payload.count;
    },
    getCommentsReducer: (
      state,
      action: PayloadAction<{ challengeId: string; comments: Comment[] }>
    ) => {
      state.challenges = state.challenges.map(
        (challenge) =>
          (challenge =
            challenge._id == action.payload.challengeId
              ? { ...challenge, comments: action.payload.comments }
              : challenge)
      );
    },
    createChallengeReducer: (state, action: PayloadAction<Challenge>) => {
      state.challenges = [action.payload, ...state.challenges];
    },
    updateChallengeReducer: (state, action: PayloadAction<Challenge>) => {
      state.challenges = state.challenges.map(
        (challenge) =>
          (challenge =
            challenge._id == action.payload._id ? action.payload : challenge)
      );
    },
    shareChallengeReducer: (
      state,
      action: PayloadAction<{
        challenge: Challenge;
        friendIds: string[];
      }>
    ) => {
      state.challenges = state.challenges.map(
        (challenge) =>
          (challenge =
            challenge._id == action.payload.challenge._id
              ? {
                  ...challenge,
                  shares: [...challenge.shares, ...action.payload.friendIds],
                }
              : challenge)
      );
    },
    shareChallengeInGroupsReducer: (
      state,
      action: PayloadAction<{
        challenge: Challenge;
        groupIds: string[];
      }>
    ) => {
      state.challenges = state.challenges.map(
        (challenge) =>
          (challenge =
            challenge._id == action.payload.challenge._id
              ? {
                  ...challenge,
                  // groups: [...challenge.groups, ...action.payload.groupIds],
                }
              : challenge)
      );
    },
    likeChallengeReducer: (
      state,
      action: PayloadAction<{ challengeId: string; loggedUserId: string }>
    ) => {
      const challengeId = action.payload.challengeId;
      state.challenges = state.challenges.map(
        (challenge) =>
          (challenge =
            challenge._id == challengeId
              ? {
                  ...challenge,
                  likes: challenge.likes.includes(action.payload.loggedUserId)
                    ? challenge.likes.filter(
                        (l) => l != action.payload.loggedUserId
                      )
                    : challenge.likes.concat(action.payload.loggedUserId),
                }
              : challenge)
      );
    },
    commentChallengeReducer: (state, action: PayloadAction<Comment>) => {
      state.challenges = state.challenges.map(
        (challenge) =>
          (challenge =
            challenge._id == action.payload.postId
              ? {
                  ...challenge,
                  comments: [action.payload, ...challenge.comments],
                }
              : challenge)
      );
    },
    deleteChallengeReducer: (state, action: PayloadAction<Challenge>) => {
      state.challenges = state.challenges.filter(
        (challenge) => challenge._id != action.payload._id
      );
    },
  },
});

export default challengeSlice.reducer;
export const {
  start,
  end,
  error,
  like,
  filter,
  ALike,
  getChallengeReducer,
  getChallengesReducer,
  getUserChallengesReducer,
  createChallengeReducer,
  shareChallengeReducer,
  shareChallengeInGroupsReducer,
  updateChallengeReducer,
  likeChallengeReducer,
  commentChallengeReducer,
  deleteChallengeReducer,
  getCommentsReducer,
} = challengeSlice.actions;
