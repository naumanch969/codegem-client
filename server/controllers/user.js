import User from "../models/user.js";
import { createError } from "../utils/functions.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("friends").exec();
    res.status(200).json(user);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId)
      .populate("friends")
      .populate("sentShares")
      .populate("receivedShares")
      .exec();
    res.status(200).json(user);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const updateProfile = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    const loggedInUser = await User.findById(req.user._id);

    const isUsernameExist = await User.findOne({ username });
    if (isUsernameExist && username != loggedInUser.username)
      return next(createError(res, 400, "Username already exist."));
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist && email != loggedInUser.email)
      return next(createError(res, 400, "Email already exist."));

    const result = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { ...req.body } },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const editPersonalDetails = async (req, res, next) => {
  try {
    const { type } = req.query;
    const { values } = req.body;
    console.log("type", type.split(" ")[0], "values", values);

    const result = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { [type.split(" ")[0]]: values } },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await User.findByIdAndUpdate(
      userId,
      { $set: { ...req.body } },
      { new: true }
    );
    return res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(createError(res, "email not exist"));

    const result = await User.findByIdAndDelete(user._id);
    return res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const deleteUserCollection = async (req, res, next) => {
  try {
    const result = await User.deleteMany();
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
