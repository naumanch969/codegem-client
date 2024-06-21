import User from "../models/user.js";
import { createError } from "../utils/functions.js";
import { Types } from "mongoose";

export const getFriends = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { page, pageSize, count } = req.query;

    let query = User.findById(userId, { friends: 1 })

    const pageNumber = parseInt(page, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;
    const skip = (pageNumber - 1) * size;

    query = query.skip(skip).limit(size);
    const resultPromise = query.populate("friends").exec();

    const [result, totalCount] = await Promise.all([
      resultPromise,
      count ? User.countDocuments(query) : Promise.resolve(null),
    ]);

    let response = { result: result?.friends };
    if (totalCount !== null) {
      response.count = totalCount;
    }

    res.status(200).json(response);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const searchFriends = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { page, pageSize, count, query: searchQuery } = req.query; // count is boolean

    let query = User.findById(userId, { friends: 1 })
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i"); // 'i' for case-insensitive search
      query = query.or([
        { firstName: { $regex: searchQuery, $options: "i" } },
        { lastName: { $regex: searchQuery, $options: "i" } },
        { username: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
      ]);
    }

    const pageNumber = parseInt(page, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;
    const skip = (pageNumber - 1) * size;

    query = query.skip(skip).limit(size);

    const resultPromise = query.populate("friends").exec();

    const [result, totalCount] = await Promise.all([
      resultPromise,
      count ? User.countDocuments(query) : Promise.resolve(null),
    ]);

    let response = { result: result.friends };
    if (totalCount !== null) {
      response.count = totalCount;
    }

    res.status(200).json(response);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const searchUsers = async (req, res, next) => {
  try {
    const { page, pageSize, count, query: searchQuery } = req.query;

    let query = User.find(); // Start with finding all users

    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i"); // 'i' for case-insensitive search
      query = query.or([
        { firstName: { $regex: regex } },
        { lastName: { $regex: regex } },
        { username: { $regex: regex } },
        { email: { $regex: regex } },
      ]);
    }

    const pageNumber = parseInt(page, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;
    const skip = (pageNumber - 1) * size;

    query = query.skip(skip).limit(size);

    const resultPromise = query.populate("friends").exec();

    const [result, totalCount] = await Promise.all([
      resultPromise,
      count ? User.countDocuments(query) : Promise.resolve(null),
    ]);

    let response = { result };
    if (totalCount !== null) {
      response.count = totalCount;
    }

    res.status(200).json(response);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const getSuggestedUsers = async (req, res, next) => {
  try {
    const { page, pageSize, count } = req.query;

    let query = User.find(
      {},
      { firstName: 1, lastName: 1, username: 1, email: 1, profilePicture: 1, friends: 1, sentRequests: 1, receivedRequests: 1, }
    );

    const pageNumber = parseInt(page, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;
    const skip = (pageNumber - 1) * size;

    query = query.skip(skip).limit(size);
    const resultPromise = query.exec();

    const [allUsers, totalCount] = await Promise.all([
      resultPromise,
      count ? User.countDocuments(query) : Promise.resolve(null),
    ]);

    const userId = req?.user?._id;

    const loggedUser = await User.findById(userId);

    const suggestedUsers = allUsers.filter((user) => {
      return (
        user.friends.indexOf(req?.user?._id) === -1 &&
        user.sentRequests.indexOf(req?.user?._id) === -1 &&
        user.receivedRequests.indexOf(req?.user?._id) === -1 &&
        user.id !== req?.user?._id
      );
    });

    const usersWithMutualFriends = suggestedUsers.map((user) => {
      const mutualFriends = user.friends.filter((friendId) => loggedUser.friends.includes(friendId));
      return { ...user._doc, mutualFriends: mutualFriends.length }; // Use _doc to get the raw document data
    });

    let response = { result: usersWithMutualFriends };
    if (totalCount !== null) {
      response.count = totalCount;
    }

    res.status(200).json(response);
  } catch (err) {
    console.error(err)
    next(createError(res, 500, "Internal Server Error"));
  }
};
export const getSentRequests = async (req, res, next) => {
  try {
    const { page, pageSize, count } = req.query;

    const userId = req.user._id;
    let query = User.findById(userId, { sentRequests: 1 }, { firstName: 1, lastName: 1, username: 1, email: 1, profilePicture: 1 })

    const pageNumber = parseInt(page, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;
    const skip = (pageNumber - 1) * size;

    query = query.skip(skip).limit(size);
    const resultPromise = query.populate("sentRequests").exec();

    const [result, totalCount] = await Promise.all([
      resultPromise,
      count ? User.countDocuments(query) : Promise.resolve(null),
    ]);

    let response = { result: result?.sentRequests };
    if (totalCount !== null) {
      response.count = totalCount;
    }

    res.status(200).json(response);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const getReceivedRequests = async (req, res, next) => {
  try {
    const { page, pageSize, count } = req.query;

    const userId = req.user._id;
    let query = User.findById(userId, { receivedRequests: 1 }, { firstName: 1, lastName: 1, username: 1, email: 1, profilePicture: 1 })

    const pageNumber = parseInt(page, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;
    const skip = (pageNumber - 1) * size;

    query = query.skip(skip).limit(size);
    const resultPromise = query.populate("receivedRequests").exec();

    const [result, totalCount] = await Promise.all([
      resultPromise,
      count ? User.countDocuments(query) : Promise.resolve(null),
    ]);

    let response = { result: result?.receivedRequests };
    if (totalCount !== null) {
      response.count = totalCount;
    }

    res.status(200).json(response);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const sendFriendRequest = async (req, res, next) => {
  try {
    const { receiverId } = req.params;
    const userId = req?.user?._id;

    // Check if the sender and receiver are the same user
    if (userId === receiverId) {
      return next(
        createError(res, 400, "Sender and receiver cannot be the same user.")
      );
    }

    const loggedUser = await User.findById(userId);
    if (!loggedUser) return next(createError(res, 400, "Wrong Sender Id"));

    const receiver = await User.findById(receiverId);
    if (!receiver) return next(createError(res, 400, "Wrong Receiver Id"));

    // Update sender's sentRequests and receiver's receivedRequests
    await User.findByIdAndUpdate(userId, { $addToSet: { sentRequests: receiver._id.toString() } }, { new: true });// Fix: removed unnecessary `$` before sentRequests

    const updatedReceiver = await User.findByIdAndUpdate(receiverId, { $addToSet: { receivedRequests: loggedUser._id.toString() } }, { new: true });// Fix: removed unnecessary `$` before receivedRequests

    res.status(200).json(updatedReceiver);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const rejectFriendRequest = async (req, res, next) => {
  try {
    const { senderId } = req.params;
    const userId = req?.user?._id;

    const sender = await User.findById(senderId);
    if (!sender) return next(createError(res, 400, "Wrong Sender Id"));

    const loggedUser = await User.findById(userId);
    if (!loggedUser) return next(createError(res, 400, "Wrong Receiver Id"));

    const updatedSender = await User.findByIdAndUpdate(senderId, { $pull: { sentRequests: String(loggedUser._id) } }, { new: true });

    await User.findByIdAndUpdate(userId, { $pull: { receivedRequests: String(sender._id) } }, { new: true });

    res.status(200).json(updatedSender);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const removeFriendRequest = async (req, res, next) => {
  try {
    const { receiverId } = req.params;
    const userId = req?.user?._id; // sender is loggedUser

    const receiver = await User.findById(receiverId);
    if (!receiver) return next(createError(res, 400, "Wrong Receiver Id"));

    const loggedUser = await User.findById(userId);
    if (!loggedUser) return next(createError(res, 400, "Wrong Sender Id"));

    const updatedReceiver = await User.findByIdAndUpdate(receiverId, { $pull: { receivedRequests: String(loggedUser._id) } }, { new: true }); // sender is loggedUser

    await User.findByIdAndUpdate(userId, { $pull: { sentRequests: String(receiver._id) } }, { new: true });

    res.status(200).json(updatedReceiver);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const acceptFriendRequest = async (req, res, next) => {
  try {
    const { senderId } = req.params;

    const sender = await User.findById(senderId);
    if (!sender) return next(createError(res, 400, "Wrong Sender Id"));

    const loggedUser = await User.findById(req.user._id);
    if (!loggedUser) return next(createError(res, 400, "Wrong Receiver Id"));

    const updatedSender = await User.findByIdAndUpdate(
      sender._id,
      { $addToSet: { friends: loggedUser._id }, $pull: { sentRequests: String(loggedUser._id) } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      loggedUser._id,
      { $addToSet: { friends: sender._id }, $pull: { receivedRequests: String(sender._id) } },
      { new: true }
    );

    res.status(200).json(updatedSender);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
