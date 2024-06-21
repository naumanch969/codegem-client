import Challenge from "../models/challenge.js";
import Code from "../models/code.js";
import Group from "../models/group.js";
import Collection from "../models/collection.js";
import Notification from "../models/notification.js";
import Streak from "../models/streak.js";
import Comment from "../models/submodels/comment.js";
import Share from "../models/submodels/share.js";
import User from "../models/user.js";
import { createError } from "../utils/functions.js";

export const getUsers = async (req, res, next) => {
  try {
    const { page, pageSize, count } = req.query;

    let query = User.find({ _id: { $ne: req.user._id } });

    const pageNumber = parseInt(page, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;
    const skip = (pageNumber - 1) * size;

    query = query.skip(skip).limit(size);

    const resultPromise = query.exec();

    const [result, totalCount] = await Promise.all([
      resultPromise,
      count
        ? User.countDocuments({ _id: { $ne: req.user._id } }).exec()
        : Promise.resolve(null),
    ]);

    let response = { result };
    response.count = totalCount || 0;

    res.status(200).json(response);
  } catch (error) {
    next(createError(500, error.message));
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

    const result = await User.findByIdAndUpdate(req.user._id, { $set: { ...req.body } }, { new: true });
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const editPersonalDetails = async (req, res, next) => {
  try {
    const { type } = req.query;
    const { values } = req.body;

    const result = await User.findByIdAndUpdate(req.user._id, { $set: { [type.split(" ")[0]]: values } }, { new: true });
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await User.findByIdAndUpdate(userId, { $set: { ...req.body } }, { new: true });
    return res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) return next(createError(res, "User not exist"));

    await Code.deleteMany({ user: user._id });
    await Streak.deleteMany({ user: user._id });
    await Notification.deleteMany({ user: user._id });
    await Challenge.deleteMany({ user: user._id });
    await Collection.deleteMany({ owner: user._id });
    await Group.deleteMany({ admin: user._id });
    // remove being member from all groups
    await Group.updateMany({ members: user._id }, { $pull: { members: user._id } });
    // remove if from friend list of others
    await User.updateMany({ friends: user._id }, { $pull: { friends: user._id } });
    await User.updateMany({ sentRequests: user._id }, { $pull: { sentRequests: user._id } });
    await User.updateMany({ receivedRequests: user._id }, { $pull: { receivedRequests: user._id } });
    // delete all shares
    await Share.deleteMany({ from: user._id });
    // delete all comments
    await Comment.deleteMany({ user: user._id });

    const result = await User.findByIdAndDelete(user._id);
    return res.status(200).json({ message: "User deleted successfully." });
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
