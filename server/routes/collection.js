import express from "express"
const router = express.Router();
import { getCollections } from "../controllers/collection.js"


router.get('/get/all', getCollections)


export default router