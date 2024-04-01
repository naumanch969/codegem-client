import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Challenge, Code, Collection, Streak } from "../../interfaces";

interface InitialState {
  isFetching: boolean;
  error: string;
  categories: string[];
  collections: Collection[];
  popularCollections: Collection[];
  userCollections: Collection[];
  filteredCollections: Collection[];
  currentCollection: Collection | null;
  count: number;
}

const initialState: InitialState = {
  collections: [],
  popularCollections: [],
  categories: [],
  userCollections: [],
  filteredCollections: [],
  isFetching: false,
  error: "",
  currentCollection: null,
  count: 20,
};

const collectionSlice = createSlice({
  name: "collection",
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

    getCollectionReducer: (state, action: PayloadAction<Collection>) => {
      state.currentCollection = action.payload;
    },
    getCollectionCategoriesReducer: (
      state,
      action: PayloadAction<string[]>
    ) => {
      state.categories = action.payload;
    },
    getCollectionCodesReducer: (state, action: PayloadAction<Code[]>) => {
      state.currentCollection = {
        ...state.currentCollection!,
        codes: action.payload,
      };
    },
    getCollectionStreaksReducer: (state, action: PayloadAction<Streak[]>) => {
      state.currentCollection = {
        ...state.currentCollection!,
        streaks: action.payload,
      };
    },
    getCollectionChallengesReducer: (
      state,
      action: PayloadAction<Challenge[]>
    ) => {
      state.currentCollection = {
        ...state.currentCollection!,
        challenges: action.payload,
      };
    },
    getCollectionsReducer: (
      state,
      action: PayloadAction<{ result: Collection[]; count?: number }>
    ) => {
      state.collections = action.payload.result;
      if (action.payload.count) state.count = action.payload.count;
    },
    getPopularCollectionsReducer: (
      state,
      action: PayloadAction<{ result: Collection[] }>
    ) => {
      state.popularCollections = action.payload.result;
    },
    getUserCollectionsReducer: (
      state,
      action: PayloadAction<{ result: Collection[]; count?: number }>
    ) => {
      state.userCollections = action.payload.result;
      if (action.payload.count) state.count = action.payload.count;
    },
    createCollectionReducer: (state, action: PayloadAction<Collection>) => {
      state.userCollections = [action.payload, ...state.userCollections];
    },
    createCollectionCodeReducer: (state, action: PayloadAction<Code>) => {
      state.currentCollection = {
        ...state.currentCollection!,
        codes: [action.payload, ...state.currentCollection?.codes!],
      };
    },
    createCollectionStreakReducer: (state, action: PayloadAction<Streak>) => {
      state.currentCollection = {
        ...state.currentCollection!,
        streaks: [action.payload, ...state.currentCollection?.streaks!],
      };
    },
    createCollectionChallengeReducer: (
      state,
      action: PayloadAction<Challenge>
    ) => {
      state.currentCollection = {
        ...state.currentCollection!,
        challenges: [action.payload, ...state.currentCollection?.challenges!],
      };
    },
    saveCodeReducer: (state, action: PayloadAction<{ code: Code }>) => {
      state.userCollections = state.userCollections.map(
        (collection) =>
          (collection =
            collection.name == "Saved"
              ? {
                  ...collection,
                  codes: [action.payload.code, ...collection.codes],
                }
              : collection)
      );
    },
    unsaveCodeReducer: (state, action: PayloadAction<{ code: Code }>) => {
      state.userCollections = state.userCollections.map(
        (collection) =>
          (collection =
            collection.name == "Saved"
              ? {
                  ...collection,
                  codes: collection.codes.filter(
                    (ch) => ch._id != action.payload.code._id
                  ),
                }
              : collection)
      );
    },
    saveCodeInCollectionsReducer: (
      state,
      action: PayloadAction<{ code: Code; collectionIds: string[] }>
    ) => {
      state.userCollections = state.userCollections.map(
        (collection) =>
          (collection = action.payload.collectionIds.includes(collection._id)
            ? {
                ...collection,
                codes: [action.payload.code, ...collection.codes],
              }
            : collection)
      );
    },
    saveStreakReducer: (state, action: PayloadAction<{ streak: Streak }>) => {
      state.userCollections = state.userCollections.map(
        (collection) =>
          (collection =
            collection.name == "Saved"
              ? {
                  ...collection,
                  streaks: [action.payload.streak, ...collection.streaks],
                }
              : collection)
      );
    },
    unsaveStreakReducer: (state, action: PayloadAction<{ streak: Streak }>) => {
      state.userCollections = state.userCollections.map(
        (collection) =>
          (collection =
            collection.name == "Saved"
              ? {
                  ...collection,
                  streaks: collection.streaks.filter(
                    (ch) => ch._id != action.payload.streak._id
                  ),
                }
              : collection)
      );
    },
    saveStreakInCollectionsReducer: (
      state,
      action: PayloadAction<{ streak: Streak; collectionIds: string[] }>
    ) => {
      state.userCollections = state.userCollections.map(
        (collection) =>
          (collection = action.payload.collectionIds.includes(collection._id)
            ? {
                ...collection,
                streaks: [action.payload.streak, ...collection.streaks],
              }
            : collection)
      );
    },
    saveChallengeReducer: (
      state,
      action: PayloadAction<{ challenge: Challenge }>
    ) => {
      state.userCollections = state.userCollections.map(
        (collection) =>
          (collection =
            collection.name == "Saved"
              ? {
                  ...collection,
                  challenges: [
                    action.payload.challenge,
                    ...collection.challenges,
                  ],
                }
              : collection)
      );
    },
    unsaveChallengeReducer: (
      state,
      action: PayloadAction<{ challenge: Challenge }>
    ) => {
      state.userCollections = state.userCollections.map(
        (collection) =>
          (collection =
            collection.name == "Saved"
              ? {
                  ...collection,
                  challenges: collection.challenges.filter(
                    (ch) => ch._id != action.payload.challenge._id
                  ),
                }
              : collection)
      );
    },
    saveChallengeInCollectionsReducer: (
      state,
      action: PayloadAction<{ challenge: Challenge; collectionIds: string[] }>
    ) => {
      state.userCollections = state.userCollections.map(
        (collection) =>
          (collection = action.payload.collectionIds.includes(collection._id)
            ? {
                ...collection,
                challenges: [
                  action.payload.challenge,
                  ...collection.challenges,
                ],
              }
            : collection)
      );
    },
    updateCollectionReducer: (state, action: PayloadAction<Collection>) => {
      state.userCollections = state.userCollections.map(
        (collection) =>
          (collection =
            collection._id == action.payload._id ? action.payload : collection)
      );
    },
    shareCollectionReducer: (
      state,
      action: PayloadAction<{ collection: Collection; friendIds: string[] }>
    ) => {
      state.collections = state.collections.map(
        (c) =>
          (c =
            c._id == action.payload.collection._id
              ? {
                  ...c,
                  shares: [...c.shares, ...action.payload.friendIds],
                }
              : c)
      );
    },
    starCollectionReducer: (
      state,
      action: PayloadAction<{ collectionId: string; loggedUserId: string }>
    ) => {
      const collectionId = action.payload.collectionId;
      const userId = action.payload.loggedUserId;
      state.collections = state.collections.map(
        (c) =>
          (c =
            c._id == collectionId
              ? {
                  ...c,
                  stars: c.stars.some((id) => id == userId)
                    ? c.stars.filter((l) => l != userId)
                    : c.stars.concat(userId),
                }
              : c)
      );
      state.currentCollection = {
        ...state.currentCollection!,
        stars: state.currentCollection!.stars.includes(userId)
          ? state.currentCollection!.stars.filter((l) => l != userId)
          : state.currentCollection!.stars.concat(userId),
      };
    },
    deleteCollectionReducer: (state, action: PayloadAction<Collection>) => {
      state.userCollections = state.userCollections.filter(
        (collection) => collection._id != action.payload._id
      );
    },
  },
});

export default collectionSlice.reducer;
export const {
  start,
  end,
  error,
  getCollectionReducer,
  getPopularCollectionsReducer,
  getCollectionCodesReducer,
  getCollectionStreaksReducer,
  getCollectionChallengesReducer,
  getCollectionsReducer,
  getUserCollectionsReducer,
  getCollectionCategoriesReducer,

  saveCodeReducer,
  unsaveCodeReducer,
  saveCodeInCollectionsReducer,

  saveStreakReducer,
  unsaveStreakReducer,
  saveStreakInCollectionsReducer,

  saveChallengeReducer,
  saveChallengeInCollectionsReducer,
  unsaveChallengeReducer,

  createCollectionReducer,
  createCollectionCodeReducer,
  createCollectionStreakReducer,
  createCollectionChallengeReducer,

  updateCollectionReducer,
  shareCollectionReducer,
  starCollectionReducer,
  deleteCollectionReducer,
} = collectionSlice.actions;
