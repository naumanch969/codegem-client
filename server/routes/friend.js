import express from 'express'
const router = express.Router()

import { verifyToken } from '../middleware/auth.js'
import { getSuggestedUsers, getFriends, getSentRequests, getReceivedRequests, sendFriendRequest, rejectFriendRequest,removeFriendRequest, acceptFriendRequest, searchFriends, searchUsers, } from '../controllers/friend.js'

router.get('/suggested-users', verifyToken, getSuggestedUsers);
router.get('/all', verifyToken, getFriends);
router.get('/search', verifyToken, searchFriends);
router.get('/search-user', verifyToken, searchUsers);
router.get('/sent-requests', verifyToken, getSentRequests);
router.get('/received-requests', verifyToken, getReceivedRequests);

router.put('/request/send/:receiverId', verifyToken, sendFriendRequest)
router.put('/request/reject/:senderId', verifyToken, rejectFriendRequest)
router.put('/request/remove/:receiverId', verifyToken, removeFriendRequest)
router.put('/request/accept/:senderId', verifyToken, acceptFriendRequest)

export default router
