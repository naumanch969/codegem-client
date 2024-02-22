import express from "express";
const router = express.Router();
import {
  getCollections,
  getCollection,
  getCollectionCodes,
  getCollectionStreaks,
  getCollectionChallenges,
  getUserCollections,
  createCollections,
  updateCollections,
  deleteCollection,
  deleteWholeCollection,
  createCollectionCode,
  createCollectionStreak,
  createCollectionChallenge,
  shareCollection,
  starCollection,
  searchCollections,
} from "../controllers/collection.js";
import { verifyToken } from "../middleware/auth.js";

router.get("/get/all", verifyToken, getCollections);
router.get("/get/search", verifyToken, searchCollections);
router.get("/get/user/:userId", verifyToken, getUserCollections);
router.get("/get/single/:collectionId", verifyToken, getCollection);
router.get("/get/codes/:collectionId", verifyToken, getCollectionCodes);
router.get("/get/streaks/:collectionId", verifyToken, getCollectionStreaks);
router.get(
  "/get/challenges/:collectionId",
  verifyToken,
  getCollectionChallenges
);
router.post("/create", verifyToken, createCollections);
router.post("/code/create/:collectionId", verifyToken, createCollectionCode);
router.post(
  "/streak/create/:collectionId",
  verifyToken,
  createCollectionStreak
);
router.post(
  "/challenge/create/:collectionId",
  verifyToken,
  createCollectionChallenge
);
router.put("/update/:collectionId", verifyToken, updateCollections);
router.put("/share/:collectionId", verifyToken, shareCollection);
router.put("/star/:collectionId", verifyToken, starCollection);
router.delete("/delete/:collectionId", verifyToken, deleteCollection);
router.delete("/delete-whole-collection", verifyToken, deleteWholeCollection);

export default router;
