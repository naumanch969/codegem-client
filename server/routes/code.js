import express from "express";
const router = express.Router();
import {
  getCodes,
  getUserCodes,
  getSavedCodes,
  createCode,
  shareCode,
  shareCodeInGroups,
  saveCode,
  saveCodeInCollections,
  updateCode,
  likeCode,
  commentCode,
  deleteCode,
  deleteCodeCollection,
  getLikedCodes,
} from "../controllers/code.js";
import { verifyToken } from "../middleware/auth.js";

router.get("/get/all", getCodes);
router.get("/get/user/:userId", verifyToken, getUserCodes);
router.get("/get/saved", verifyToken, getSavedCodes); // get logged user' saved codes
router.get("/get/liked", verifyToken, getLikedCodes); // get logged user' liked codes

router.post("/create", verifyToken, createCode);

router.put("/update/:codeId", verifyToken, updateCode);
router.put("/like/:codeId", verifyToken, likeCode);
router.put("/save/:codeId", verifyToken, saveCode);
router.put("/save-in-collections/:codeId", verifyToken, saveCodeInCollections);
router.put("/share/:codeId", verifyToken, shareCode);
router.put("/share-in-groups/:codeId", verifyToken, shareCodeInGroups);
router.put("/comment/:codeId", verifyToken, commentCode);

router.delete("/delete/:codeId", verifyToken, deleteCode);
router.delete("/delete-collection", verifyToken, deleteCodeCollection);

export default router;
