import express from "express"
const router = express.Router();
import { getGroups, getGroup, getUserGroups, joinGroup, createGroups, updateGroups, deleteGroup, deleteWholeGroup, leaveGroup } from "../controllers/group.js"
import { verifyToken } from "../middleware/auth.js";


router.get('/get/all', verifyToken, getGroups)
router.get('/get/user/:userId', verifyToken, getUserGroups)
router.get('/get/single/:groupId', verifyToken, getGroup)

router.post('/create', verifyToken, createGroups)

router.put('/update/:groupId', verifyToken, updateGroups)
router.put('/join/:groupId', verifyToken, joinGroup)
router.put('/leave/:groupId', verifyToken, leaveGroup)

router.delete('/delete/:groupId', verifyToken, deleteGroup)
router.delete('/delete-whole-group', verifyToken, deleteWholeGroup)


export default router