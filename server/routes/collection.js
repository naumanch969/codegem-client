import express from "express"
const router = express.Router();
import { getCollections, getCollection,getUserCollections, createCollections, updateCollections, deleteCollection, deleteWholeCollection } from "../controllers/collection.js"
import { verifyToken } from "../middleware/auth.js";


router.get('/get/all', verifyToken, getCollections)
router.get('/get/user/:userId', verifyToken, getUserCollections)
router.get('/get/single/:collectionId', verifyToken, getCollection)
router.post('/create', verifyToken, createCollections)
router.put('/update/:collectionId', verifyToken, updateCollections)
router.delete('/delete/:collectionId', verifyToken, deleteCollection)
router.delete('/delete-whole-collection', verifyToken, deleteWholeCollection)


export default router