import { start, end, error, getCodeReducer, getCodesReducer, getUserCodesReducer, createCodeReducer, updateCodeReducer, likeCodeReducer, commentCodeReducer, deleteCodeReducer, } from "../reducers/code";
import * as api from '../api'

export const getCode = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getCode()
        dispatch(getCodeReducer(data))
        dispatch(end())
    }
    catch (err) {
        dispatch(error(err.message))
    }
}
export const getCodes = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getCodes()
        dispatch(getCodesReducer(data))
        dispatch(end())
    }
    catch (err) {
        dispatch(error(err.message))
    }
}
export const getUserCodes = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.getCodes()
        dispatch(getUserCodesReducer(data))
        dispatch(end())
    }
    catch (err) {
        dispatch(error(err.message))
    }
}
export const createCode = (codeData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        console.log(codeData)
        const { data } = await api.createCode(codeData)
        console.log(data.result)
        dispatch(createCodeReducer(data))
        setOpen(false)
        dispatch(end())
    }
    catch (err) {
        dispatch(error(err.message))
    }
}
export const updateCode = (codeId, codeData, setOpen) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.updateCode(codeId, codeData)
        dispatch(updateCodeReducer(data))
        setOpen(false)
        dispatch(end())
    }
    catch (err) {
        dispatch(error(err.message))
    }
}
export const likeCode = (codeId) => async (dispatch) => {
    try {
        const { data } = await api.likeCode(codeId)
        dispatch(likeCodeReducer(data))
    }
    catch (err) {
        dispatch(error(err.message))
    }
}
export const commentCode = () => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.commentCode()
        dispatch(commentCodeReducer(data))
        dispatch(end())
    }
    catch (err) {
        dispatch(error(err.message))
    }
}
export const deleteCode = (codeId) => async (dispatch) => {
    try {
        dispatch(start())
        const { data } = await api.deleteCode(codeId)
        dispatch(deleteCodeReducer(data))
        dispatch(end())
    }
    catch (err) {
        dispatch(error(err.message))
    }
}