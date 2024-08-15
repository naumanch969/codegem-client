import jwt from "jsonwebtoken";
import { createError } from "../utils/functions.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authtoken;
    const accessToken = req.headers.accessToken;
    console.log('accessToken', accessToken)

    if (!token)
      return res
        .status(400)
        .json({ message: "You are unauthorized. Login first." });
    if (!process.env.JWT_SECRET)
      return next(createError(res, 500, "Internal Server Error"));

    let decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedData;
    next();
  } catch (error) {
    next(createError(res, 500, "Invalid token"));
  }
};
export const verifyAdmin = async (req, res, next) => {
  try {
    if (req.user.role == "User")
      return res.status(400).json({ message: "Admin restricted action." });

    next();
  } catch (error) {
    next(createError(res, 500, "Invalid request"));
  }
};
