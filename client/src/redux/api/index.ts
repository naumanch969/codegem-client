import axios from "axios";
import Cookie from "js-cookie";
import { Challenge, Chat, Code, Collection, Group, Message, Setting, Streak, User, } from "../../interfaces";
import { baseURL } from "../../constant";

// const API = axios.create({ baseURL: process.env.REACT_APP_BASEURL })
const API = axios.create({ baseURL });
API.interceptors.request.use((req) => {
  const stringifiedUser = Cookie.get("code.connect");
  if (stringifiedUser && stringifiedUser != 'undefined') {
    const token = JSON.parse(stringifiedUser);
    if (req.headers) {
      req.headers.authtoken = token;
    }
  }
  return req;
});

// GENERAL
export const uploadImage = (formData: FormData) => API.post(`/upload_image`, formData);
export const deleteImage = (filename: string) => API.delete(`/delete_image/${filename}`);

// friends
export const sendFriendRequest = (receiverId: string) => API.put(`/friend/request/send/${receiverId}`);
export const rejectFriendRequest = (receiverId: string) => API.put(`/friend/request/reject/${receiverId}`);
export const removeFriendRequest = (receiverId: string) => API.put(`/friend/request/remove/${receiverId}`);
export const acceptFriendRequest = (senderId: string) => API.put(`/friend/request/accept/${senderId}`);
export const getSuggestedUsers = (query: string) => API.get(`/friend/suggested-users${query}`);
export const getFriends = (query: string) => API.get(`/friend/all${query}`);
export const searchFriends = (query: string) => API.get(`/friend/search${query}`);
export const searchUsers = (query: string) => API.get(`/friend/search-user${query}`);
export const getSentRequests = (query: string) => API.get(`/friend/sent-requests${query}`);
export const getReceivedRequests = (query: string) => API.get(`/friend/received-requests${query}`);

// auth
export const register = (userData: User) => API.post(`/auth/register`, userData);
export const verifyRegisterationEmail = ({ email, otp, }: { email: string; otp: string; }) => API.post(`/auth/verify_register_otp`, { email, otp });
export const login = (userData: { username: string; password: string }) => API.put(`/auth/login`, userData);
export const sendOTP = (email: string) => API.put(`/auth/send_otp`, { email });
export const verifyOTP = ({ email, otp }: { email: string; otp: string }) => API.put(`/auth/verify_otp`, { email, otp });
export const setNewPassword = ({ email, password, }: { email: string; password: string; }) => API.put(`/auth/newpassword`, { email, password });
export const changePassword = (userData: { oldPassword: string, newPassword: string }) => API.put(`/auth/change_password`, userData);

// users
export const getUsers = (query: string) => API.get(`/user/get/all${query}`);
export const getUser = (userId: string) => API.get(`/user/get/single/${userId}`);
export const getProfile = () => API.get(`/user/get/profile`);
export const updateProfile = (profileData: any) => API.put(`/user/update/profile`, profileData);
export const editPersonalDetails = (type: "interests" | "hobbies" | "books" | "programming", values: string[]) => API.put(`/user/update/personal-details?type=${type}`, { values });
export const deleteUser = (userId: string) => API.delete(`/user/delete/${userId}`);

// CODE
export const getCode = (id: string) => API.get(`/code/get/single/${id}`);
export const getCodes = (query: string) => API.get(`/code/get/all${query}`);
export const getUserCodes = (userId: string) => API.get(`/code/get/user/${userId}`);
export const getLikedCodes = () => API.get(`/code/get/liked`);
export const getSavedCodes = () => API.get(`/code/get/saved`);
export const createCode = (codeData: Code) => API.post(`/code/create`, codeData);
export const updateCode = (id: string, codeData: Code) => API.put(`/code/update/${id}`, codeData);
export const shareCode = (codeId: string, friendIds: string[]) => API.put(`/code/share/${codeId}`, { friendIds });
export const shareCodeInGroups = (codeId: string, groupIds: string[]) => API.put(`/code/share-in-groups/${codeId}`, { groupIds });
export const saveCode = (codeId: string) => API.put(`/code/save/${codeId}`);
export const saveCodeInCollections = (codeId: string, collections: string[]) => API.put(`/code/save-in-collections/${codeId}`, { collections });
export const likeCode = (id: string) => API.put(`/code/like/${id}`);
export const commentCode = (id: string, content: string) => API.put(`/code/comment/${id}`, { content });
export const deleteCode = (id: string) => API.delete(`/code/delete/${id}`);

// CHALLENGE
export const getChallenge = (id: string) => API.get(`/challenge/get/single/${id}`);
export const getChallenges = (query: string) => API.get(`/challenge/get/all${query}`);
export const searchChallenge = (query: string) => API.get(`/challenge/get/search${query}`);
export const getUserChallenges = (userId: string) => API.get(`/challenge/get/user/${userId}`);
export const getLikedChallenges = () => API.get(`/challenge/get/liked`);
export const getSavedChallenges = () => API.get(`/challenge/get/saved`);
export const createChallenge = (challengeData: Code) => API.post(`/challenge/create`, challengeData);
export const updateChallenge = (id: string, challengeData: Code) => API.put(`/challenge/update/${id}`, challengeData);
export const shareChallenge = (challengeId: string, friendIds: string[]) => API.put(`/challenge/share/${challengeId}`, { friendIds });
export const shareChallengeInGroups = (challengeId: string, groupIds: string[]) => API.put(`/challenge/share-in-groups/${challengeId}`, { groupIds });
export const saveChallenge = (challengeId: string) => API.put(`/challenge/save/${challengeId}`);
export const saveChallengeInCollections = (challengeId: string, collections: string[]) => API.put(`/challenge/save-in-collections/${challengeId}`, { collections });
export const likeChallenge = (id: string) => API.put(`/challenge/like/${id}`);
export const commentChallenge = (id: string, content: string) => API.put(`/challenge/comment/${id}`, { content });
export const deleteChallenge = (id: string) => API.delete(`/challenge/delete/${id}`);

// STREAK
export const getStreak = (id: string) => API.get(`/streak/get/single/${id}`);
export const getStreaks = (query: string) => API.get(`/streak/get/all${query}`);
export const getUserStreaks = (userId: string) => API.get(`/streak/get/user/${userId}`);
export const getLikedStreaks = () => API.get(`/streak/get/liked`);
export const getSavedStreaks = () => API.get(`/streak/get/saved`);
export const createStreak = (streakData: Code) => API.post(`/streak/create`, streakData);
export const updateStreak = (id: string, streakData: Code) => API.put(`/streak/update/${id}`, streakData);
export const shareStreak = (streakId: string, friendIds: string[]) => API.put(`/streak/share/${streakId}`, { friendIds });
export const shareStreakInGroups = (streakId: string, groupIds: string[]) => API.put(`/streak/share-in-groups/${streakId}`, { groupIds });
export const saveStreak = (streakId: string) => API.put(`/streak/save/${streakId}`);
export const saveStreakInCollections = (streakId: string, collections: string[]) => API.put(`/streak/save-in-collections/${streakId}`, { collections });
export const likeStreak = (id: string) => API.put(`/streak/like/${id}`);
export const commentStreak = (id: string, content: any) => API.put(`/streak/comment/${id}`, { content });
export const deleteStreak = (id: string) => API.delete(`/streak/delete/${id}`);

// Collections
export const getComments = (id: string, postType: "code" | "streak" | "challenge") => API.get(`/comment/${id}?postType=${postType}`);

// Collections
export const getCollections = (query: string) => API.get(`/collection/get/all${query}`);
export const getCollectionCategories = () => API.get(`/collection/get/categories`);
export const getUserCollections = (query: string, userId: string) => API.get(`/collection/get/user/${userId}${query}`);
export const getCollection = (collectionId: string) => API.get(`/collection/get/single/${collectionId}`);
export const getCollectionCodes = (collectionId: string) => API.get(`/collection/get/codes/${collectionId}`);
export const getCollectionStreaks = (collectionId: string) => API.get(`/collection/get/streaks/${collectionId}`);
export const getCollectionChallenges = (collectionId: string) => API.get(`/collection/get/challenges/${collectionId}`);
export const createCollection = (collectionData: Collection) => API.post(`/collection/create`, collectionData);
export const createCollectionCode = (collectionId: string, codeData: Code) => API.post(`/collection/code/create/${collectionId}`, codeData);
export const createCollectionStreak = (collectionId: string, streakData: Streak) => API.post(`/collection/streak/create/${collectionId}`, streakData);
export const createCollectionChallenge = (collectionId: string, challengeData: Challenge) => API.post(`/collection/challenge/create/${collectionId}`, challengeData);
export const updateCollection = (collectionId: string, collectionData: Collection) => API.put(`/collection/update/${collectionId}`, collectionData);
export const shareCollection = (collectionId: string, friendIds: string[]) => API.put(`/collection/share/${collectionId}`, { friendIds });
export const starCollection = (collectionId: string) => API.put(`/collection/star/${collectionId}`);
export const deleteCollection = (collectionId: string) => API.delete(`/collection/delete/${collectionId}`);

export const getGroups = (query: string) => API.get(`/group/get/all${query}`);
export const getUserGroups = (userId: string) => API.get(`/group/get/user/${userId}`);
export const getGroup = (groupId: string) => API.get(`/group/get/single/${groupId}`);
export const getGroupCodes = (groupId: string) => API.get(`/group/get/codes/${groupId}`);
export const getGroupStreaks = (groupId: string) => API.get(`/group/get/streaks/${groupId}`);
export const getGroupChallenges = (groupId: string) => API.get(`/group/get/challenges/${groupId}`);
export const createGroup = (groupData: Group) => API.post(`/group/create`, groupData);
export const createGroupCode = (groupid: string, codeData: Code) => API.post(`/group/code/create/${groupid}`, codeData);
export const createGroupStreak = (groupId: string, streakData: Streak) => API.post(`/group/streak/create/${groupId}`, streakData);
export const createGroupChallenge = (groupId: string, challengeData: Challenge) => API.post(`/group/challenge/create/${groupId}`, challengeData);
export const updateGroup = (groupId: string, groupData: Group) => API.put(`/group/update/${groupId}`, groupData);
export const joinGroup = (groupId: string) => API.put(`/group/join/${groupId}`);
export const leaveGroup = (groupId: string) => API.put(`/group/leave/${groupId}`);
export const deleteGroup = (groupId: string) => API.delete(`/group/delete/${groupId}`);

// NOTIFICATIONS
export const getNotifications = () => API.get(`/notification/get/all`);
export const getNotification = (notifiationId: string) => API.get(`/notification/get/single/${notifiationId}`);
export const createNotification = (notificationData: Notification) => API.post(`/notification/create`, notificationData);
export const markAsRead = (notificationId: string) => API.post(`/notification/mark_read/${notificationId}`);
export const markAllAsRead = () => API.post(`/notification/mark_read/all`);
export const deleteNotification = (notificationId: string) => API.delete(`/notification/delete/single/${notificationId}`);
export const deleteNotifications = () => API.delete(`/notification/delete/all`);

// Settings
export const getSettings = () => API.get(`/setting/get/all`);
export const updateSettings = (formData: Setting) => API.put(`/setting/update`, formData);

// Chat
export const getChats = () => API.get(`/chat/all`)
export const getMessages = (chatId: string) => API.get(`/chat/messages/${chatId}`)
export const getUnreadMessageCount = (chatId: string) => API.get(`/chat/unread/${chatId}`)
export const getChat = (chatId: string) => API.get(`/chat/single/${chatId}`)
export const createChat = (chat: Chat) => API.post(`/chat/single`, chat)
export const updateChat = (chatId: string, chat: Chat) => API.put(`/chat/single/${chatId}`, chat)
export const sendMessage = (chatId: string, message: Message) => API.put(`/chat/message/${chatId}`, message)
export const markMessageAsRead = (chatId: string, messageId: string) => API.put(`/chat/mark-as-read/${chatId}/${messageId}`)
export const markAllMessagesAsRead = (chatId: string) => API.put(`/chat/mark-all-as-read/${chatId}`)