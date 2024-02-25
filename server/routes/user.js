import {
  getUsers,
  getUser,
  getProfile,
  updateUser,
  editPersonalDetails,
  deleteUser,
  deleteUserCollection,
  updateProfile,
} from "../controllers/user.js";

import { verifyToken } from "../middleware/auth.js";
import express from "express";

const router = express.Router();

router.get("/get/all", verifyToken, getUsers);
router.get("/get/single/:userId", getUser);
router.get("/get/profile", verifyToken, getProfile);
router.put("/update/profile", verifyToken, updateProfile);
router.put("/update/personal-details", verifyToken, editPersonalDetails);
router.put("/update/:userId", updateUser);
router.delete("/delete", deleteUser);

router.delete("/delete-collection", deleteUserCollection);

export default router;
