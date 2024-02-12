import express from "express";
const router = express.Router();

import { verifyToken } from "../middleware/auth.js";
import { getComments } from "../controllers/comment.js";

router.get("/:postId", getComments);

export default router;
