import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Challenge, Code, Group, Streak } from "../../interfaces";

interface InitialState {
  isFetching: boolean;
  error: string;
  groups: Group[];
  userGroups: Group[];
  filteredGroups: Group[];
  currentGroup: Group | null;
  count: number;
}

const initialState: InitialState = {
  groups: [],
  userGroups: [],
  filteredGroups: [],
  isFetching: false,
  error: "",
  currentGroup: null,
  count: 20, // no of docs in db collection
};

const groupSlice = createSlice({
  name: "group",
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

    getGroupReducer: (state, action: PayloadAction<Group>) => {
      state.currentGroup = action.payload;
    },
    getGroupsReducer: (
      state,
      action: PayloadAction<{ result: Group[]; count?: number }>
    ) => {
      state.groups = action.payload.result;
      if (action.payload.count) state.count = action.payload.count;
    },
    getUserGroupsReducer: (
      state,
      action: PayloadAction<{ result: Group[]; count?: number }>
    ) => {
      state.userGroups = action.payload.result;
      if (action.payload.count) state.count = action.payload.count;
    },
    getGroupCodesReducer: (state, action: PayloadAction<Code[]>) => {
      state.currentGroup = {
        ...state.currentGroup!,
        codes: action.payload,
      };
    },
    getGroupStreaksReducer: (state, action: PayloadAction<Streak[]>) => {
      state.currentGroup = {
        ...state.currentGroup!,
        streaks: action.payload,
      };
    },
    getGroupChallengesReducer: (state, action: PayloadAction<Challenge[]>) => {
      state.currentGroup = {
        ...state.currentGroup!,
        challenges: action.payload,
      };
    },
    createGroupReducer: (state, action: PayloadAction<Group>) => {
      state.groups = [action.payload, ...state.groups];
    },
    createGroupCodeReducer: (
      state,
      action: PayloadAction<{ code: Code; groupId?: string }>
    ) => {
      state.currentGroup = {
        ...state.currentGroup!,
        codes: [action.payload.code, ...state.currentGroup?.codes!],
      };
    },
    createGroupStreakReducer: (
      state,
      action: PayloadAction<{ streak: Streak; groupId?: string }>
    ) => {
      state.currentGroup = {
        ...state.currentGroup!,
        streaks: [action.payload.streak, ...state.currentGroup?.streaks!],
      };
    },
    createGroupChallengeReducer: (
      state,
      action: PayloadAction<{ challenge: Challenge; groupId?: string }>
    ) => {
      state.currentGroup = {
        ...state.currentGroup!,
        challenges: [
          action.payload.challenge,
          ...state.currentGroup?.challenges!,
        ],
      };
    },
    updateGroupReducer: (state, action: PayloadAction<Group>) => {
      if (state.currentGroup?._id == action.payload._id) {
        state.currentGroup = action.payload;
      }
      state.groups = state.groups.map(
        (group) =>
          (group = group._id == action.payload._id ? action.payload : group)
      );
    },
    joinGroupReducer: (
      state,
      action: PayloadAction<{ groupId: string; loggedUserId: string }>
    ) => {
      if (
        state.currentGroup?._id?.toString() == action.payload.groupId.toString()
      ) {
        state.currentGroup = {
          ...state.currentGroup,
          members: [...state.currentGroup.members, action.payload.loggedUserId],
        };
      }
      state.groups = state.groups.map(
        (group) =>
          (group =
            group._id == action.payload.groupId
              ? {
                  ...group,
                  members: [...group.members, action.payload.loggedUserId],
                }
              : group)
      );
    },
    likeGroupCodeReducer: (
      state,
      action: PayloadAction<{
        groupId: string;
        codeId: string;
        loggedUserId: string;
      }>
    ) => {
      const codeId = action.payload.codeId;
      const groupId = action.payload.groupId;
      const loggedUserId = action.payload.loggedUserId;

      if (state.currentGroup?._id?.toString() == groupId.toString()) {
        state.currentGroup = {
          ...state.currentGroup,
          codes: state.currentGroup.codes.map(
            (code) =>
              (code =
                code._id == codeId
                  ? {
                      ...code,
                      likes: code.likes.includes(loggedUserId)
                        ? code.likes.filter((l) => l != loggedUserId)
                        : code.likes.concat(loggedUserId),
                    }
                  : code)
          ),
        };
      }
      state.groups = state.groups.map(
        (group) =>
          (group =
            group._id == groupId
              ? {
                  ...group,
                  codes: group.codes.map(
                    (code) =>
                      (code =
                        code._id == codeId
                          ? {
                              ...code,
                              likes: code.likes.includes(loggedUserId)
                                ? code.likes.filter((l) => l != loggedUserId)
                                : code.likes.concat(loggedUserId),
                            }
                          : code)
                  ),
                }
              : group)
      );
    },
    likeGroupStreakReducer: (
      state,
      action: PayloadAction<{
        groupId: string;
        streakId: string;
        loggedUserId: string;
      }>
    ) => {
      const { groupId, streakId, loggedUserId } = action.payload;

      // Update currentGroup if its id matches the provided groupId
      if (state.currentGroup?._id?.toString() === groupId.toString()) {
        state.currentGroup = {
          ...state.currentGroup,
          streaks: state.currentGroup.streaks.map((streak) =>
            streak._id === streakId
              ? {
                  ...streak,
                  likes: streak.likes.includes(loggedUserId)
                    ? streak.likes.filter((l) => l !== loggedUserId)
                    : streak.likes.concat(loggedUserId),
                }
              : streak
          ),
        };
      }

      // Update groups array
      state.groups = state.groups.map((group) =>
        group._id === groupId
          ? {
              ...group,
              streaks: group.streaks.map((streak) =>
                streak._id === streakId
                  ? {
                      ...streak,
                      likes: streak.likes.includes(loggedUserId)
                        ? streak.likes.filter((l) => l !== loggedUserId)
                        : streak.likes.concat(loggedUserId),
                    }
                  : streak
              ),
            }
          : group
      );
    }, 
    likeGroupChallengeReducer: (
      state,
      action: PayloadAction<{
        groupId: string;
        challengeId: string;
        loggedUserId: string;
      }>
    ) => {
      const { groupId, challengeId, loggedUserId } = action.payload;

      // Update currentGroup if its id matches the provided groupId
      if (state.currentGroup?._id?.toString() === groupId.toString()) {
        state.currentGroup = {
          ...state.currentGroup,
          challenges: state.currentGroup.challenges.map((challenge) =>
            challenge._id === challengeId
              ? {
                  ...challenge,
                  likes: challenge.likes.includes(loggedUserId)
                    ? challenge.likes.filter((l) => l !== loggedUserId)
                    : challenge.likes.concat(loggedUserId),
                }
              : challenge
          ),
        };
      }

      // Update groups array
      state.groups = state.groups.map((group) =>
        group._id === groupId
          ? {
              ...group,
              challenges: group.challenges.map((challenge) =>
                challenge._id === challengeId
                  ? {
                      ...challenge,
                      likes: challenge.likes.includes(loggedUserId)
                        ? challenge.likes.filter((l) => l !== loggedUserId)
                        : challenge.likes.concat(loggedUserId),
                    }
                  : challenge
              ),
            }
          : group
      );
    },
    leaveGroupReducer: (
      state,
      action: PayloadAction<{ groupId: string; loggedUserId: string }>
    ) => {
      if (
        state.currentGroup?._id?.toString() == action.payload.groupId.toString()
      ) {
        state.currentGroup = {
          ...state.currentGroup,
          members: state.currentGroup.members.filter(
            (memberId) => memberId != action.payload.loggedUserId
          ),
        };
      }
      state.groups = state.groups.map(
        (group) =>
          (group =
            group._id == action.payload.groupId
              ? {
                  ...group,
                  members: group.members.filter(
                    (memberId) => memberId != action.payload.loggedUserId
                  ),
                }
              : group)
      );
    },
    deleteGroupReducer: (state, action: PayloadAction<Group>) => {
      state.groups = state.groups.filter(
        (group) => group._id != action.payload._id
      );
    },
  },
});

export default groupSlice.reducer;
export const {
  start,
  end,
  error,
  getGroupReducer,
  getGroupsReducer,
  getUserGroupsReducer,
  getGroupCodesReducer,
  getGroupStreaksReducer,
  getGroupChallengesReducer,
  createGroupCodeReducer,
  createGroupStreakReducer,
  createGroupChallengeReducer,
  createGroupReducer,
  joinGroupReducer,
  likeGroupCodeReducer,
  likeGroupStreakReducer,
  likeGroupChallengeReducer,
  leaveGroupReducer,
  updateGroupReducer,
  deleteGroupReducer,
} = groupSlice.actions;
