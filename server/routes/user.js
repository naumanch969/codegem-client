import {
    getAllUsers,
    getUser,
    deleteUser,
    deleteUserCollection,
    getFriends,
    sendFriendRequest,
    rejectFriendRequest,
    acceptFriendRequest,
} from "../controllers/user.js"

import express from "express"
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/get/all', getAllUsers)
router.get('/get/single/:userId', getUser)
router.delete('/delete-user', deleteUser)

router.put('/friend/get/all', verifyToken, getFriends)
router.put('/friend/request/send/:receiverId', verifyToken, sendFriendRequest)
router.put('/friend/request/reject/:senderId', verifyToken, rejectFriendRequest)
router.put('/friend/request/accept/:senderId', verifyToken, acceptFriendRequest)

router.delete('/delete-collection', deleteUserCollection)


export default router