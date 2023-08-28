import {

    register,
    login,
 
} from "../controllers/auth.js"

import express from "express"

const router = express.Router()

router.post('/register', register)
router.put('/login', login)


export default router