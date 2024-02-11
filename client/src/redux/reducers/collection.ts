import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Challenge, Code, Collection, Streak } from "../../interfaces";

interface InitialState {
  isFetching: boolean;
  error: string;
  collections: Collection[];
  userCollections: Collection[];
  filteredCollections: Collection[];
  currentCollection: Collection | null;
}

const initialState: InitialState = {
  collections: [],
  userCollections: [],
  filteredCollections: [],
  isFetching: false,
  error: "",
  currentCollection: null,
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
    getCollectionsReducer: (state, action: PayloadAction<Collection[]>) => {
      state.collections = action.payload;
    },
    getUserCollectionsReducer: (state, action: PayloadAction<Collection[]>) => {
      state.userCollections = action.payload;
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
  getCollectionCodesReducer,
  getCollectionStreaksReducer,
  getCollectionChallengesReducer,
  getCollectionsReducer,
  getUserCollectionsReducer,

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
  deleteCollectionReducer,
} = collectionSlice.actions;
