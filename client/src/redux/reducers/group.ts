import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Code, Group } from '../../interfaces'

interface InitialState {
    isFetching: boolean,
    error: string,
    groups: Group[],
    userGroups: Group[],
    filteredGroups: Group[],
    currentGroup: Group | null
}

const initialState: InitialState = {
    groups: [],
    userGroups: [],
    filteredGroups: [],
    isFetching: false,
    error: '',
    currentGroup: null
}

const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        start: (state) => { state.isFetching = true; },
        end: (state) => { state.isFetching = false; },
        error: (state, action: PayloadAction<string>) => { state.isFetching = false; state.error = (action.payload || 'Something went wrong!') },


        getGroupReducer: (state, action: PayloadAction<Group>) => {
            state.currentGroup = action.payload
        },
        getGroupsReducer: (state, action: PayloadAction<Group[]>) => {
            state.groups = action.payload
        },
        getUserGroupsReducer: (state, action: PayloadAction<Group[]>) => {
            state.userGroups = action.payload
        },
        createGroupReducer: (state, action: PayloadAction<Group>) => {
            state.groups = [action.payload, ...state.groups]
        },
        createGroupCodeReducer: (state, action: PayloadAction<{ groupId: string, code: Code }>) => {
            console.log('action',action.payload)
            if (state.currentGroup?._id?.toString() == action.payload.groupId.toString()) {
                state.currentGroup = { ...state.currentGroup,codes: [action.payload.code, ...state.currentGroup.codes]  }
            }
            state.groups = state.groups.map(group => group = group._id == action.payload.groupId ? { ...group, codes: [action.payload.code, ...group.codes] } : group)
        },
        updateGroupReducer: (state, action: PayloadAction<Group>) => {
            if (state.currentGroup?._id == action.payload._id) {
                state.currentGroup = action.payload
            }
            state.groups = state.groups.map(group => group = group._id == action.payload._id ? action.payload : group)
        },
        joinGroupReducer: (state, action: PayloadAction<{ groupId: string, loggedUserId: string }>) => {
            if (state.currentGroup?._id?.toString() == action.payload.groupId.toString()) {
                state.currentGroup = { ...state.currentGroup, members: [...state.currentGroup.members, action.payload.loggedUserId] }
            }
            state.groups = state.groups.map(group => group = group._id == action.payload.groupId ? { ...group, members: [...group.members, action.payload.loggedUserId] } : group)
        },
        leaveGroupReducer: (state, action: PayloadAction<{ groupId: string, loggedUserId: string }>) => {
            if (state.currentGroup?._id?.toString() == action.payload.groupId.toString()) {
                state.currentGroup = { ...state.currentGroup, members: state.currentGroup.members.filter(memberId => memberId != action.payload.loggedUserId) }
            }
            state.groups = state.groups.map(group => group = group._id == action.payload.groupId ? { ...group, members: group.members.filter(memberId => memberId != action.payload.loggedUserId) } : group)
        },
        deleteGroupReducer: (state, action: PayloadAction<Group>) => {
            state.groups = state.groups.filter(group => group._id != action.payload._id)
        },
    }
})

export default groupSlice.reducer
export const { start, end, error, getGroupReducer, getGroupsReducer, getUserGroupsReducer, createGroupCodeReducer, createGroupReducer, joinGroupReducer, leaveGroupReducer, updateGroupReducer, deleteGroupReducer, } = groupSlice.actions