import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { join, dirname } from "path";
import { fileURLToPath } from "url";

import generalRoutes from "./routes/general.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import friendRoutes from "./routes/friend.js";
import notificationRoutes from "./routes/notification.js";
import codeRoutes from "./routes/code.js";
import groupRoutes from "./routes/group.js";
import collectionRoutes from "./routes/collection.js";
import settingRoutes from "./routes/setting.js";
import streakRoutes from "./routes/streak.js";
import challengeRoutes from "./routes/challenge.js";
import commentRoutes from "./routes/comment.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const CONNECTION_URL = process.env.ATLAS_URL;
// const CONNECTION_URL = process.env.COMPASS_URL;

app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

// serving static files | images
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/uploads", express.static(join(__dirname, "uploads")));

app.use("/", generalRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/friend", friendRoutes);
app.use("/notification", notificationRoutes);
app.use("/group", groupRoutes);
app.use("/collection", collectionRoutes);
app.use("/setting", settingRoutes);
app.use("/code", codeRoutes);
app.use("/streak", streakRoutes);
app.use("/challenge", challengeRoutes);
app.use("/comment", commentRoutes);

app.use((err, req, res, next) => {
  const messae = err.messae || "Something went wrong.";
  const status = err.status || 500;
  res.status(status).json({ messae, status, success: false, stack: err.stack });
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("App is Working");
});

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Listening at port ${PORT}`)))
  .catch((err) =>
    console.error(`ERROR in connection with MONGODB: `, err)
  );
