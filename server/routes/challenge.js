import express from "express";
const router = express.Router();
import {
  getChallenges,
  getUserChallenges,
  getSavedChallenges,
  createChallenge,
  shareChallenge,
  shareChallengeInGroups,
  saveChallenge,
  saveChallengeInCollections,
  updateChallenge,
  likeChallenge,
  commentChallenge,
  deleteChallenge,
  deleteChallengeCollection,
  getLikedChallenges,
} from "../controllers/challenge.js";
import { verifyToken } from "../middleware/auth.js";

router.get("/get/all", getChallenges);
router.get("/get/user/:userId", verifyToken, getUserChallenges);
router.get("/get/saved", verifyToken, getSavedChallenges); // get logged user' saved challenges
router.get("/get/liked", verifyToken, getLikedChallenges); // get logged user' liked challenges

router.post("/create", verifyToken, createChallenge);

router.put("/update/:challengeId", verifyToken, updateChallenge);
router.put("/like/:challengeId", verifyToken, likeChallenge);
router.put("/save/:challengeId", verifyToken, saveChallenge);
router.put("/save-in-collections/:challengeId", verifyToken, saveChallengeInCollections);
router.put("/share/:challengeId", verifyToken, shareChallenge);
router.put("/share-in-groups/:challengeId", verifyToken, shareChallengeInGroups);
router.put("/comment/:challengeId", verifyToken, commentChallenge);

router.delete("/delete/:challengeId", verifyToken, deleteChallenge);
router.delete("/delete-collection", verifyToken, deleteChallengeCollection);

export default router;
