import Cookie from "js-cookie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment, Streak } from "../../interfaces";

interface InitialState {
  isFetching: boolean;
  error: string;
  streaks: Streak[];
  filteredStreaks: Streak[];
  currentStreak: Streak | null;
  count: number;
}

const initialState: InitialState = {
  streaks: [],
  filteredStreaks: [],
  isFetching: false,
  error: "",
  currentStreak: null,
  count: 20,
};

const streakSlice = createSlice({
  name: "streak",
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
      const streakId = action.payload;
      const stringifiedUser = Cookie.get("streak.connect");
      const user = stringifiedUser ? JSON.parse(stringifiedUser) : null;
      state.filteredStreaks = state.filteredStreaks.map(
        (streak) =>
          (streak =
            streak?._id == streakId
              ? { ...streak, likes: [...streak?.likes, user._id] }
              : streak)
      );
    },

    filter: (state, action: PayloadAction<string>) => {
      const filter = action.payload;
      switch (filter) {
        case "all":
          state.filteredStreaks = state.streaks;
          break;
        case "recommended":
          state.filteredStreaks = state.streaks;
          break;
        case "latest": {
          const sortedArray = state.filteredStreaks
            .slice()
            .sort(
              (a, b) =>
                (a.createdAt as Date)?.getTime()! -
                (b.createdAt as Date)?.getTime()!
            );
          state.filteredStreaks = sortedArray;
          break;
        }
        case "related":
          state.filteredStreaks = state.streaks;
          break;
        case "famous":
          const sortedArray = state.filteredStreaks
            .slice()
            .sort((a, b) => b.likes.length - a.likes.length);
          state.filteredStreaks = sortedArray;
          break;
      }
    },

    ALike: (state, action: PayloadAction<Streak>) => {
      const streakStreak = action.payload;
      state.streaks = state.streaks.map(
        (streak) =>
          (streak = streak?._id == streakStreak?._id ? action.payload : streak)
      );
    },

    getStreakReducer: (state, action: PayloadAction<Streak>) => {
      state.currentStreak = action.payload;
    },
    getStreaksReducer: (
      state,
      action: PayloadAction<{ result: Streak[]; count?: number }>
    ) => {
      state.streaks = action.payload.result;
      if (action.payload.count) state.count = action.payload.count;
    },
    getUserStreaksReducer: (
      state,
      action: PayloadAction<{ result: Streak[]; count?: number }>
    ) => {
      state.streaks = action.payload.result;
      if (action.payload.count) state.count = action.payload.count;
    },
    getCommentsReducer: (
      state,
      action: PayloadAction<{ streakId: string; comments: Comment[] }>
    ) => {
      state.streaks = state.streaks.map(
        (streak) =>
          (streak =
            streak._id == action.payload.streakId
              ? { ...streak, comments: action.payload.comments }
              : streak)
      );
    },
    createStreakReducer: (state, action: PayloadAction<Streak>) => {
      state.streaks = [action.payload, ...state.streaks];
    },
    updateStreakReducer: (state, action: PayloadAction<Streak>) => {
      state.streaks = state.streaks.map(
        (streak) =>
          (streak = streak._id == action.payload._id ? action.payload : streak)
      );
    },
    shareStreakReducer: (
      state,
      action: PayloadAction<{
        streak: Streak;
        friendIds: string[];
      }>
    ) => {
      state.streaks = state.streaks.map(
        (streak) =>
          (streak =
            streak._id == action.payload.streak._id
              ? {
                  ...streak,
                  shares: [...streak.shares, ...action.payload.friendIds],
                }
              : streak)
      );
    },
    shareStreakInGroupsReducer: (
      state,
      action: PayloadAction<{
        streak: Streak;
        groupIds: string[];
      }>
    ) => {
      state.streaks = state.streaks.map(
        (streak) =>
          (streak =
            streak._id == action.payload.streak._id
              ? {
                  ...streak,
                  shares: [...streak.shares, ...action.payload.groupIds],
                }
              : streak)
      );
    },
    likeStreakReducer: (
      state,
      action: PayloadAction<{ streakId: string; loggedUserId: string }>
    ) => {
      const streakId = action.payload.streakId;
      state.streaks = state.streaks.map(
        (streak) =>
          (streak =
            streak._id == streakId
              ? {
                  ...streak,
                  likes: streak.likes.includes(action.payload.loggedUserId)
                    ? streak.likes.filter(
                        (l) => l != action.payload.loggedUserId
                      )
                    : streak.likes.concat(action.payload.loggedUserId),
                }
              : streak)
      );
    },
    commentStreakReducer: (state, action: PayloadAction<Comment>) => {
      state.streaks = state.streaks.map(
        (streak) =>
          (streak =
            streak._id == action.payload.postId
              ? { ...streak, comments: [action.payload, ...streak.comments] }
              : streak)
      );
    },
    deleteStreakReducer: (state, action: PayloadAction<Streak>) => {
      state.streaks = state.streaks.filter(
        (streak) => streak._id != action.payload._id
      );
    },
  },
});

export default streakSlice.reducer;
export const {
  start,
  end,
  error,
  like,
  filter,
  ALike,
  getStreakReducer,
  getStreaksReducer,
  getUserStreaksReducer,
  createStreakReducer,
  shareStreakReducer,
  shareStreakInGroupsReducer,
  updateStreakReducer,
  likeStreakReducer,
  commentStreakReducer,
  deleteStreakReducer,
  getCommentsReducer,
} = streakSlice.actions;
