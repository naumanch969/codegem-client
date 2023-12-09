import axios from 'axios'
import Cookie from 'js-cookie'
import { Code, Collection, Group, User } from '../../interfaces'
import { baseURL } from '../../constant'

const API = axios.create({ baseURL })
API.interceptors.request.use((req) => {
    const stringifiedUser = Cookie.get('code.connect')
    if (stringifiedUser) {
        const token = JSON.parse(stringifiedUser)
        if (req.headers) {
            req.headers.authtoken = token;
        }
    }
    return req
})



// friends
export const sendFriendRequest = (receiverId: string) => API.put(`/friend/request/send/${receiverId}`)
export const rejectFriendRequest = (receiverId: string) => API.put(`/friend/request/reject/${receiverId}`)
export const removeFriendRequest = (receiverId: string) => API.put(`/friend/request/remove/${receiverId}`)
export const acceptFriendRequest = (senderId: string) => API.put(`/friend/request/accept/${senderId}`)
export const getSuggestedUsers = () => API.get('/friend/suggested-users')
export const getFriends = () => API.get('/friend/all')
export const getSentRequests = () => API.get('/friend/sent-requests')
export const getReceivedRequests = () => API.get('/friend/received-requests')

// users
export const getAllUsers = () => API.get(`/user/get/all`)
export const getUser = (userId: string) => API.get(`/user/get/single/${userId}`)
export const register = (userData: User) => API.post('/auth/register', userData)
export const verifyRegisterationEmail = ({ email, otp }: { email: string, otp: string }) => API.post('/auth/verify_register_otp', { email, otp })
export const login = (userData: { username: string, password: string }) => API.put('/auth/login', userData)
export const sendOTP = (email: string) => API.put('/auth/send_otp', { email })
export const verifyOTP = ({ email, otp }: { email: string, otp: string }) => API.put('/auth/verify_otp', { email, otp })
export const setNewPassword = ({ email, password }: { email: string, password: string }) => API.put('/auth/newpassword', { email, password })
export const changePassword = (userData: any) => API.put('/auth/change_password', userData)

// CODE 
export const getCode = (id: string) => API.get(`/code/get/single/${id}`)
export const getCodes = () => API.get(`/code/get/all`)
export const getUserCodes = (userId: string) => API.get(`/code/get/user/${userId}`)
export const getLikedCodes = () => API.get(`/code/get/liked`)
export const getSavedCodes = () => API.get(`/code/get/saved`)
export const createCode = (codeData: Code) => API.post("/code/create", codeData)
export const updateCode = (id: string, codeData: Code) => API.put(`/code/update/${id}`, codeData)
export const shareCode = (codeId: string, shareWith: string[]) => API.put(`/code/share/${codeId}`, { shareWith })
export const shareCodeInGroups = (codeId: string, groupIds: string[]) => API.put(`/code/share-in-groups/${codeId}`, { groupIds })
export const saveCode = (codeId: string) => API.put(`/code/save/${codeId}`)
export const saveCodeInCollections = (codeId: string, collections: string[]) => API.put(`/code/save-in-collections/${codeId}`, { collections })
export const likeCode = (id: string) => API.put(`/code/like/${id}`)
export const commentCode = (id: string, comment: any) => API.put(`/code/comment/${id}`, comment)
export const deleteCode = (id: string) => API.delete(`/code/delete/${id}`)

export const getCollections = () => API.get(`/collection/get/all`)
export const getUserCollections = (userId: string) => API.get(`/collection/get/user/${userId}`)
export const getCollection = (collectionId: string) => API.get(`/collection/get/single/${collectionId}`)
export const createCollection = (collectionData: Collection) => API.post(`/collection/create`, collectionData)
export const updateCollection = (collectionId: string, collectionData: Collection) => API.put(`/collection/update/${collectionId}`, collectionData)
export const deleteCollection = (collectionId: string) => API.delete(`/collection/delete/${collectionId}`)

export const getGroups = () => API.get(`/group/get/all`)
export const getUserGroups = (userId: string) => API.get(`/group/get/user/${userId}`)
export const getGroup = (groupId: string) => API.get(`/group/get/single/${groupId}`)
export const createGroup = (groupData: Group) => API.post(`/group/create`, groupData)
export const updateGroup = (groupId: string, groupData: Group) => API.put(`/group/update/${groupId}`, groupData)
export const joinGroup = (groupId: string) => API.put(`/group/join/${groupId}`)
export const leaveGroup = (groupId: string) => API.put(`/group/leave/${groupId}`)
export const deleteGroup = (groupId: string) => API.delete(`/group/delete/${groupId}`)