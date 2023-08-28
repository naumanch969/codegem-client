import axios from 'axios'
import Cookie from 'js-cookie'

const API = axios.create({ baseURL: 'http://localhost:5000' })
API.interceptors.request.use((req) => {
    if (Cookie.get('codegem_profile')) {
        const { token } = JSON.parse(Cookie.get('codegem_profile'))
        req.headers.authtoken = token
    }
    return req
})



// friends
export const sendFriendRequest = (receiverId, type, content) => { return API.put(`/user/friend/send-request/${receiverId}`, { content, type }) }
export const removeFriendRequest = (receiverId) => { return API.put(`/user/friend/remove-request/${receiverId}`) }
export const acceptFriendRequest = (senderId) => { return API.put(`/user/friend/accept-request/${senderId}`) }


// users
export const getAllUsers = () => { return API.get(`/user/get/all`) }
export const register = (userData) => API.post('/auth/register', userData)
export const login = (userData) => API.put('/auth/login', userData)

// CODE 
export const getCode = (id) => { return API.get(`/code/get/single/${id}`) }
export const getCodes = () => { return API.get(`/code/get/all`) }
export const getLikedCodes = () => { return API.get(`/code/get/liked`) }
export const getSavedCodes = () => { return API.get(`/code/get/saved`) }
export const createCode = (codeData) => { return API.post("/code/create", codeData) }
export const updateCode = (id, codeData) => { return API.put(`/code/update/${id}`, codeData) }
export const likeCode = (id) => { return API.put(`/code/like/${id}`) }
export const commentCode = (id, comment) => { return API.put(`/code/comment/${id}`, comment) }
export const deleteCode = (id) => { return API.delete(`/code/delete/${id}`) }