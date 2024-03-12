import express from 'express'
import { register, verifyRegisterOTP, login, changePassword, verifyOTP, sendOTP, setNewPassword } from '../controllers/auth.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/verify_register_otp', verifyRegisterOTP)
router.put('/login', login)
router.put('/send_otp', sendOTP)
router.put('/verify_otp', verifyOTP)
router.put('/newpassword', setNewPassword)
router.put('/change_password', verifyToken, changePassword)


export default router