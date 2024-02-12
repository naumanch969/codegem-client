import fs from "fs/promises";
import { createError } from "../utils/functions.js";

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) return next(createError(res, 400, "No image to upload"));

    const imageUrl = `${process.env.BACKEND_URL}/uploads/${req.file.filename}`;
    res.status(200).json({ result: imageUrl });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const deleteImage = async (req, res, next) => {
  try {
    const { filename } = req.params;
    const imagePath = `uploads/${filename}`;

    const fileExists = await fs
      .access(imagePath)
      .then(() => true)
      .catch(() => false);

    if (fileExists) {
      await fs.unlink(imagePath);
      return res.status(200).json({ message: "Image deleted successfully." });
    } else {
      return res.status(201).json({ message: "Image not found." });
    }
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
