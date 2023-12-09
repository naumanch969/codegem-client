import Cookie from 'js-cookie'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Code } from '../../interfaces'

interface InitialState {
  isFetching: boolean,
  error: string,
  codes: Code[],
  filteredCodes: Code[],
  currentCode: Code | null
}

const initialState: InitialState = {
  codes: [],
  filteredCodes: [],
  isFetching: false,
  error: '',
  currentCode: null
}

const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    start: (state) => { state.isFetching = true; },
    end: (state) => { state.isFetching = false; },
    error: (state, action: PayloadAction<string>) => { state.isFetching = false; state.error = action.payload },

    like: (state, action: PayloadAction<string>) => {
      const codeId = action.payload
      const stringifiedUser = Cookie.get('code.connect')
      const user = stringifiedUser ? JSON.parse(stringifiedUser) : null
      state.filteredCodes = state.filteredCodes.map(code => code = code?._id == codeId ? { ...code, likes: [...code?.likes, user._id] } : code)
    },

    filter: (state, action: PayloadAction<string>) => {
      const filter = action.payload
      switch (filter) {
        case 'all':
          state.filteredCodes = state.codes
          break
        case 'recommended':
          state.filteredCodes = state.codes
          break
        case 'latest': {
          const sortedArray = state.filteredCodes.slice().sort((a, b) => a.createdAt?.getTime()! - b.createdAt?.getTime()!);
          state.filteredCodes = sortedArray
          break
        }
        case 'related':
          state.filteredCodes = state.codes
          break
        case 'famous':
          const sortedArray = state.filteredCodes.slice().sort((a, b) => b.likes.length - a.likes.length)
          state.filteredCodes = sortedArray
          break
      }
    },

    ALike: (state, action: PayloadAction<Code>) => {
      const codeCode = action.payload
      state.codes = state.codes.map(code => code = code?._id == codeCode?._id ? action.payload : code)
    },

    getCodeReducer: (state, action: PayloadAction<Code>) => {
      state.currentCode = action.payload
    },
    getCodesReducer: (state, action: PayloadAction<Code[]>) => {
      state.codes = action.payload
    },
    getUserCodesReducer: (state, action: PayloadAction<Code[]>) => {
      state.codes = action.payload
    },
    createCodeReducer: (state, action: PayloadAction<Code>) => {
      state.codes = [action.payload, ...state.codes]
    },
    updateCodeReducer: (state, action: PayloadAction<Code>) => {
      state.codes = state.codes.map(code => code = code._id == action.payload._id ? action.payload : code)
    },
    shareCodeReducer: (state, action: PayloadAction<{ code: Code, shareWith: { from: string, to: string, sharedAt: string }[] }>) => {
      state.codes = state.codes.map(code => code = code._id == action.payload.code._id ? { ...code, shares: [...code.shares, ...action.payload.shareWith] } : code)
    },
    shareCodeInGroupsReducer: (state, action: PayloadAction<{ code: Code, groupObjs: { from: string, group: string, sharedAt: string }[] }>) => {
      state.codes = state.codes.map(code => code = code._id == action.payload.code._id ? { ...code, groups: [...code.groups, ...action.payload.groupObjs] } : code)
    },
    likeCodeReducer: (state, action: PayloadAction<string>) => {
      const stringifiedUser = Cookie.get('code.connect')
      const loggedUser = stringifiedUser ? JSON.parse(stringifiedUser) : null
      const codeId = action.payload
      state.codes = state.codes.map((code) =>
        code = code._id == codeId
          ? { ...code, likes: code.likes.includes(loggedUser._id) ? code.likes.filter(l => l != loggedUser._id) : code.likes.concat(loggedUser._id) }
          : code
      )
    },
    commentCodeReducer: (state, action: PayloadAction<Code>) => {
      state.codes = state.codes.map(code => code = code._id == action.payload._id ? action.payload : code)
    },
    deleteCodeReducer: (state, action: PayloadAction<Code>) => {
      state.codes = state.codes.filter(code => code._id != action.payload._id)
    },
  }
})

export default codeSlice.reducer
export const { start, end, error, like, filter, ALike, getCodeReducer, getCodesReducer, getUserCodesReducer, createCodeReducer, shareCodeReducer, shareCodeInGroupsReducer, updateCodeReducer, likeCodeReducer, commentCodeReducer, deleteCodeReducer, } = codeSlice.actions