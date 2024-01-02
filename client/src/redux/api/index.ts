import axios from "axios";
import Cookie from "js-cookie";
import { Code, Collection, Group, User } from "../../interfaces";
import { baseURL } from "../../constant";

// const API = axios.create({ baseURL: process.env.REACT_APP_BASEURL })
const API = axios.create({ baseURL });
API.interceptors.request.use((req) => {
  const stringifiedUser = Cookie.get("code.connect");
  if (stringifiedUser) {
    const token = JSON.parse(stringifiedUser);
    if (req.headers) {
      req.headers.authtoken = token;
    }
  }
  return req;
});

// GENERAL
export const uploadImage = (formData: FormData) =>
  API.post(`/upload_image`, formData);
export const deleteImage = (filename: string) =>
  API.delete(`/delete_image/${filename}`);

// friends
export const sendFriendRequest = (receiverId: string) =>
  API.put(`/friend/request/send/${receiverId}`);
export const rejectFriendRequest = (receiverId: string) =>
  API.put(`/friend/request/reject/${receiverId}`);
export const removeFriendRequest = (receiverId: string) =>
  API.put(`/friend/request/remove/${receiverId}`);
export const acceptFriendRequest = (senderId: string) =>
  API.put(`/friend/request/accept/${senderId}`);
export const getSuggestedUsers = () => API.get(`/friend/suggested-users`);
export const getFriends = () => API.get(`/friend/all`);
export const getSentRequests = () => API.get(`/friend/sent-requests`);
export const getReceivedRequests = () => API.get(`/friend/received-requests`);

// users
export const getAllUsers = () => API.get(`/user/get/all`);
export const getUser = (userId: string) =>
  API.get(`/user/get/single/${userId}`);
export const getProfile = () => API.get(`/user/get/profile`);
export const updateProfile = (profileData: User) =>
  API.put(`/user/update/profile`, profileData);
export const register = (userData: User) =>
  API.post(`/auth/register`, userData);
export const verifyRegisterationEmail = ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => API.post(`/auth/verify_register_otp`, { email, otp });
export const login = (userData: { username: string; password: string }) =>
  API.put(`/auth/login`, userData);
export const sendOTP = (email: string) => API.put(`/auth/send_otp`, { email });
export const verifyOTP = ({ email, otp }: { email: string; otp: string }) =>
  API.put(`/auth/verify_otp`, { email, otp });
export const setNewPassword = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => API.put(`/auth/newpassword`, { email, password });
export const changePassword = (userData: any) =>
  API.put(`/auth/change_password`, userData);

// CODE
export const getCode = (id: string) => API.get(`/code/get/single/${id}`);
export const getCodes = () => API.get(`/code/get/all`);
export const getUserCodes = (userId: string) =>
  API.get(`/code/get/user/${userId}`);
export const getLikedCodes = () => API.get(`/code/get/liked`);
export const getSavedCodes = () => API.get(`/code/get/saved`);
export const createCode = (codeData: Code) =>
  API.post(`/code/create`, codeData);
export const updateCode = (id: string, codeData: Code) =>
  API.put(`/code/update/${id}`, codeData);
export const shareCode = (codeId: string, shareWith: string[]) =>
  API.put(`/code/share/${codeId}`, { shareWith });
export const shareCodeInGroups = (codeId: string, groupIds: string[]) =>
  API.put(`/code/share-in-groups/${codeId}`, { groupIds });
export const saveCode = (codeId: string) => API.put(`/code/save/${codeId}`);
export const saveCodeInCollections = (codeId: string, collections: string[]) =>
  API.put(`/code/save-in-collections/${codeId}`, { collections });
export const likeCode = (id: string) => API.put(`/code/like/${id}`);
export const commentCode = (id: string, comment: any) =>
  API.put(`/code/comment/${id}`, comment);
export const deleteCode = (id: string) => API.delete(`/code/delete/${id}`);

// CHALLENGE
export const getChallenge = (id: string) =>
  API.get(`/challenge/get/single/${id}`);
export const getChallenges = () => API.get(`/challenge/get/all`);
export const getUserChallenges = (userId: string) =>
  API.get(`/challenge/get/user/${userId}`);
export const getLikedChallenges = () => API.get(`/challenge/get/liked`);
export const getSavedChallenges = () => API.get(`/challenge/get/saved`);
export const createChallenge = (challengeData: Code) =>
  API.post(`/challenge/create`, challengeData);
export const updateChallenge = (id: string, challengeData: Code) =>
  API.put(`/challenge/update/${id}`, challengeData);
export const shareChallenge = (challengeId: string, shareWith: string[]) =>
  API.put(`/challenge/share/${challengeId}`, { shareWith });
export const shareChallengeInGroups = (
  challengeId: string,
  groupIds: string[]
) => API.put(`/challenge/share-in-groups/${challengeId}`, { groupIds });
export const saveChallenge = (challengeId: string) =>
  API.put(`/challenge/save/${challengeId}`);
export const saveChallengeInCollections = (
  challengeId: string,
  collections: string[]
) => API.put(`/challenge/save-in-collections/${challengeId}`, { collections });
export const likeChallenge = (id: string) => API.put(`/challenge/like/${id}`);
export const commentChallenge = (id: string, comment: any) =>
  API.put(`/challenge/comment/${id}`, comment);
export const deleteChallenge = (id: string) =>
  API.delete(`/challenge/delete/${id}`);

// STREAK
export const getStreak = (id: string) => API.get(`/streak/get/single/${id}`);
export const getStreaks = () => API.get(`/streak/get/all`);
export const getUserStreaks = (userId: string) =>
  API.get(`/streak/get/user/${userId}`);
export const getLikedStreaks = () => API.get(`/streak/get/liked`);
export const getSavedStreaks = () => API.get(`/streak/get/saved`);
export const createStreak = (streakData: Code) =>
  API.post(`/streak/create`, streakData);
export const updateStreak = (id: string, streakData: Code) =>
  API.put(`/streak/update/${id}`, streakData);
export const shareStreak = (streakId: string, shareWith: string[]) =>
  API.put(`/streak/share/${streakId}`, { shareWith });
export const shareStreakInGroups = (streakId: string, groupIds: string[]) =>
  API.put(`/streak/share-in-groups/${streakId}`, { groupIds });
export const saveStreak = (streakId: string) =>
  API.put(`/streak/save/${streakId}`);
export const saveStreakInCollections = (
  streakId: string,
  collections: string[]
) => API.put(`/streak/save-in-collections/${streakId}`, { collections });
export const likeStreak = (id: string) => API.put(`/streak/like/${id}`);
export const commentStreak = (id: string, comment: any) =>
  API.put(`/streak/comment/${id}`, comment);
export const deleteStreak = (id: string) => API.delete(`/streak/delete/${id}`);

// Collections
export const getCollections = () => API.get(`/collection/get/all`);
export const getUserCollections = (userId: string) =>
  API.get(`/collection/get/user/${userId}`);
export const getCollection = (collectionId: string) =>
  API.get(`/collection/get/single/${collectionId}`);
export const createCollection = (collectionData: Collection) =>
  API.post(`/collection/create`, collectionData);
export const updateCollection = (
  collectionId: string,
  collectionData: Collection
) => API.put(`/collection/update/${collectionId}`, collectionData);
export const deleteCollection = (collectionId: string) =>
  API.delete(`/collection/delete/${collectionId}`);

export const getGroups = () => API.get(`/group/get/all`);
export const getUserGroups = (userId: string) =>
  API.get(`/group/get/user/${userId}`);
export const getGroup = (groupId: string) =>
  API.get(`/group/get/single/${groupId}`);
export const createGroup = (groupData: Group) =>
  API.post(`/group/create`, groupData);
export const updateGroup = (groupId: string, groupData: Group) =>
  API.put(`/group/update/${groupId}`, groupData);
export const joinGroup = (groupId: string) => API.put(`/group/join/${groupId}`);
export const leaveGroup = (groupId: string) =>
  API.put(`/group/leave/${groupId}`);
export const deleteGroup = (groupId: string) =>
  API.delete(`/group/delete/${groupId}`);
