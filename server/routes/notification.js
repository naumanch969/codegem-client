import express from "express"
const router = express.Router();
import { getNotifications } from "../controllers/notification.js"


router.get('/get/all', getNotifications)


export default router