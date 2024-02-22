import express from "express";
const router = express.Router();
import {
  getGroups,
  getGroup,
  getUserGroups,
  joinGroup,
  createGroups,
  updateGroups,
  deleteGroup,
  deleteWholeGroup,
  leaveGroup,
  createGroupChallenge,
  createGroupStreak,
  createGroupCode,
  getGroupCodes,
  getGroupStreaks,
  getGroupChallenges,
  searchGroups,
} from "../controllers/group.js";
import { verifyToken } from "../middleware/auth.js";

router.get("/get/all", verifyToken, getGroups);
router.get("/get/search", verifyToken, searchGroups);
router.get("/get/user/:userId", verifyToken, getUserGroups);
router.get("/get/single/:groupId", verifyToken, getGroup);
router.get("/get/codes/:collectionId", verifyToken, getGroupCodes);
router.get("/get/streaks/:collectionId", verifyToken, getGroupStreaks);
router.get("/get/challenges/:collectionId", verifyToken, getGroupChallenges);

router.post("/create", verifyToken, createGroups);
router.post("/code/create/:collectionId", verifyToken, createGroupCode);
router.post("/streak/create/:collectionId", verifyToken, createGroupStreak);
router.post(
  "/challenge/create/:collectionId",
  verifyToken,
  createGroupChallenge
);

router.put("/update/:groupId", verifyToken, updateGroups);
router.put("/join/:groupId", verifyToken, joinGroup);
router.put("/leave/:groupId", verifyToken, leaveGroup);

router.delete("/delete/:groupId", verifyToken, deleteGroup);
router.delete("/delete-whole-group", verifyToken, deleteWholeGroup);

export default router;
