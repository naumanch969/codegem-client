import express from "express";
const router = express.Router();
import {
  getStreaks,
  getUserStreaks,
  getSavedStreaks,
  createStreak,
  shareStreak,
  shareStreakInGroups,
  saveStreak,
  saveStreakInCollections,
  updateStreak,
  likeStreak,
  commentStreak,
  deleteStreak,
  deleteStreakCollection,
  getLikedStreaks,
} from "../controllers/streak.js";
import { verifyToken } from "../middleware/auth.js";

router.get("/get/all", verifyToken, getStreaks);
router.get("/get/user/:userId", verifyToken, getUserStreaks);
router.get("/get/saved", verifyToken, getSavedStreaks); // get logged user' saved streaks
router.get("/get/liked", verifyToken, getLikedStreaks); // get logged user' liked streaks

router.post("/create", verifyToken, createStreak);

router.put("/update/:streakId", verifyToken, updateStreak);
router.put("/like/:streakId", verifyToken, likeStreak);
router.put("/save/:streakId", verifyToken, saveStreak);
router.put("/save-in-collections/:streakId", verifyToken, saveStreakInCollections);
router.put("/share/:streakId", verifyToken, shareStreak);
router.put("/share-in-groups/:streakId", verifyToken, shareStreakInGroups);
router.put("/comment/:streakId", verifyToken, commentStreak);

router.delete("/delete/:streakId", verifyToken, deleteStreak);
router.delete("/delete-collection", verifyToken, deleteStreakCollection);

export default router;
