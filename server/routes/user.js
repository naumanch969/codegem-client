import {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    deleteUserCollection,

} from "../controllers/user.js"

import express from "express"
 
const router = express.Router()

router.get('/get/all', getAllUsers)
router.get('/get/single/:userId', getUser)
router.delete('/update', updateUser)
router.delete('/delete', deleteUser)

router.delete('/delete-collection', deleteUserCollection)


export default router