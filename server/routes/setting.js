import express from "express"
const router = express.Router();
import { getSettings } from "../controllers/setting.js"


router.get('/get/all', getSettings)


export default router