import express from "express"
const router = express.Router();
import { getCodes, getUserCodes, createCode, updateCode, likeCode, commentCode, deleteCode, deleteCodeCollection, getLikedCodes,  } from "../controllers/code.js"
import { verifyToken } from "../middleware/auth.js"


router.get('/get/all', verifyToken, getCodes)
router.get('/get/user', verifyToken, getUserCodes)
router.get('/get/liked', verifyToken, getLikedCodes)

router.post('/create', verifyToken, createCode)

router.put('/update/:codeId', verifyToken, updateCode)
router.put('/like/:codeId', verifyToken, likeCode)
router.put('/comment/:codeId', verifyToken, commentCode)
router.delete('/delete/:codeId', verifyToken, deleteCode)
router.delete('/delete-collection', verifyToken, deleteCodeCollection)


export default router