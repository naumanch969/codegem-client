import express from "express";
const router = express.Router();
import {
  createSettings,
  deleteCollection,
  getSettings,
  updateSettings,
} from "../controllers/setting.js";
import { verifyToken } from "../middleware/auth.js";

router.get("/get/all", verifyToken, getSettings);

router.post("/create", createSettings);

router.put("/update", verifyToken, updateSettings);

router.delete("/delete-collection", verifyToken, deleteCollection);

export default router;