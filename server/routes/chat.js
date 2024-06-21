import express from 'express'

const router = express.Router()

import { verifyToken } from '../middleware/auth.js'
import { getChats, getMessages, getUnreadMessageCount, getChat, createChat, updateChat, sendMessage, markMessageAsRead, markAllMessagesAsRead } from '../controllers/chat.js'

router.get('/all', verifyToken, getChats)
router.get('/messages/:chatId', verifyToken, getMessages)
router.get('/unread/:chatId', verifyToken, getUnreadMessageCount)
router.get('/single/:chatId', verifyToken, getChat)
router.post('/single', verifyToken, createChat)
router.put('/single/:chatId', verifyToken, updateChat)
router.put('/message/:chatId', verifyToken, sendMessage)
router.put('/mark-as-read/:chatId/:messageId', verifyToken, markMessageAsRead)
router.put('/mark-all-as-read/:chatId', verifyToken, markAllMessagesAsRead)

export default router
