import Setting from "../models/setting.js";
import { isUndefined, createError } from "../utils/functions.js";

export const getSettings = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const settings = await Setting.findOne({ user: userId });
    res.status(200).json(settings);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const createSettings = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { } = req.body;
    const newSettings = await Setting.create({ user: userId, ...req.body, });
    res.status(201).json(newSettings);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const updateSettings = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const updatedSettings = await Setting.findOneAndUpdate({ user: userId }, { $set: req.body }, { new: true });
    res.status(200).json(updatedSettings);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const deleteCollection = async (req, res, next) => {
  try {
    const deletedCollection = await Setting.deleteMany();
    res.status(200).json(deletedCollection);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
