import express from "express"
const router = express.Router();
import { getGroups } from "../controllers/group.js"


router.get('/get/all', getGroups)


export default router