import express from "express";
const router = express.Router();
import {
  getNotification,
  getNotifications,
  createNotification,
  markAllAsRead,
  markAsRead,
  deleteNotification,
  deleteAllNotification,
} from "../controllers/notification.js";

import { verifyToken } from "../middleware/auth.js";

router.get("/get/single/:notificationId", verifyToken, getNotification);
router.get("/get/all", verifyToken, getNotifications);

router.post("/create", verifyToken, createNotification);
router.post("/mark_read/all", verifyToken, markAllAsRead);
router.post("/mark_read/:notificationId", verifyToken, markAsRead);

router.delete("/delete/single/:notificationId", verifyToken, deleteNotification);
router.delete("/delete/all", verifyToken, deleteAllNotification);

export default router;
