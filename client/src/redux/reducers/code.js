import { createSlice } from '@reduxjs/toolkit'
import { codeCodes } from '../../pages/Codes/data';
import Cookie from 'js-cookie'

const codeSlice = createSlice({
  name: 'code',
  initialState: {
    codes: [],
    filteredCodes: [],
    isFetching: false,
    error: null,
    currentCode: null
  },
  reducers: {
    start: (state) => { state.isFetching = true; state.error = null },
    end: (state) => { state.isFetching = false; state.error = null },
    error: (state, action) => { state.isFetching = false; state.error = (action.payload || 'Something went wrong!') },

    like: (state, action) => {
      const codeId = action.payload
      const user = JSON.parse(Cookie.get('profile'))
      state.filteredCodes = state.filteredCodes.map(code => code = code?._id == codeId ? { ...code, likes: [...code?.likes, user._id] } : code)
    },

    filter: (state, action) => {
      const filter = action.payload
      switch (filter) {
        case 'all':
          state.filteredCodes = state.codes
          break
        case 'recommended':
          state.filteredCodes = state.codes
          break
        case 'latest': {
          const sortedArray = state.filteredCodes.slice().sort((a, b) => a.createdAt - b.createdAt)
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

    ALike: (state, action) => {
      const codeCode = action.payload
      state.codes = state.codes.map(code => code = code?._id == codecode?._id ? action.payload : code)
    },

    getCodeReducer: (state, action) => {
      state.currentCode = action.payload
    },
    getCodesReducer: (state, action) => {
      state.codes = action.payload
    },
    getUserCodesReducer: (state, action) => {
      state.codes = action.payload
    },
    createCodeReducer: (state, action) => {
      state.codes = [action.payload, ...action.payload]
    },
    updateCodeReducer: (state, action) => {
      state.codes = state.codes.map(code => code = code._id == action.payload._id ? action.payload : code)
    },
    likeCodeReducer: (state, action) => {
      state.codes = state.codes.map(code => code = code._id == action.payload._id ? action.payload : code)
    },
    commentCodeReducer: (state, action) => {
      state.codes = state.codes.map(code => code = code._id == action.payload._id ? action.payload : code)
    },
    deleteCodeReducer: (state, action) => {
      state.codes = state.codes.filter(code => code._id != action.payload._id)
    },
  }
})

export default codeSlice.reducer
export const { start, end, error, like, filter, ALike, getCodeReducer, getCodesReducer, getUserCodesReducer, createCodeReducer, updateCodeReducer, likeCodeReducer, commentCodeReducer, deleteCodeReducer, } = codeSlice.actions