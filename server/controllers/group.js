import Group from "../models/group.js";
import Code from "../models/code.js";
import Streak from "../models/streak.js";
import Challenge from "../models/challenge.js";
import { createError, isUndefined } from "../utils/functions.js";

export const getGroups = async (req, res, next) => {
  try {
    const { page, pageSize, count } = req.query; // count is boolean

    let query = Group.find();

    const pageNumber = parseInt(page, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;
    const skip = (pageNumber - 1) * size;

    query = query.skip(skip).limit(size);

    const resultPromise = query
      .sort({ createdAt: -1 })
      .populate("admin")
      .exec();

    const [result, totalCount] = await Promise.all([
      resultPromise,
      count ? Group.countDocuments() : Promise.resolve(null),
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
export const getUserGroups = async (req, res, next) => {
  try {
    const { page, pageSize, count } = req.query; // count is boolean
    const { userId } = req.params;

    let query = Group.find({ admin: userId });

    const pageNumber = parseInt(page, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;
    const skip = (pageNumber - 1) * size;

    query = query.skip(skip).limit(size);

    const resultPromise = query
      .sort({ createdAt: -1 })
      .populate("admin")
      .exec();

    const [result, totalCount] = await Promise.all([
      resultPromise,
      count ? Group.countDocuments() : Promise.resolve(null),
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
export const getGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const groups = await Group.findById(groupId)
      .populate("admin")
      .populate("codes")
      .populate("shares")
      .exec();
    res.status(200).json(groups);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const getGroupCodes = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId, {
      codes: 1,
      _id: 0,
    })
      .populate("codes")
      .exec();

    res.status(200).json(group?.codes || []);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const getGroupStreaks = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId, {
      streaks: 1,
      _id: 0,
    })
      .populate("streaks")
      .exec();
    res.status(200).json(group?.streaks || []);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const getGroupChallenges = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const group = await Group.findById(groupId, {
      challenges: 1,
      _id: 0,
    })
      .populate("challenges")
      .exec();

    res.status(200).json(group?.challenges || []);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const createGroups = async (req, res, next) => {
  try {
    const groups = await Group.create({
      ...req.body,
      admin: req?.user?._id,
      members: [req?.user?._id],
    });
    res.status(200).json(groups);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const createGroupCode = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    let { title, code, ...rest } = req.body;
    if (isUndefined(title) || isUndefined(code))
      return next(
        createError(res, 400, "Make sure to provide all the fields.")
      );

    const createdCode = await Code.create({
      user: req.user._id,
      title,
      code,
      group: groupId,
      ...rest,
    });

    await Group.findByIdAndUpdate(
      groupId,
      { $push: { codes: createdCode._id } },
      { new: true }
    );

    res.status(200).json(createdCode);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const createGroupStreak = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    let { title, streak, ...rest } = req.body;
    if (isUndefined(title) || isUndefined(streak[0].code))
      return next(createError(res, 400, "Title and Streak, both are required"));

    const createdStreak = await Streak.create({
      user: req.user._id,
      title,
      streak,
      group: groupId,
      ...rest,
    });

    await Group.findByIdAndUpdate(
      groupId,
      { $push: { streaks: createdStreak._id } },
      { new: true }
    );

    res.status(200).json(createdStreak);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const createGroupChallenge = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    let { title, challenge, solution, ...rest } = req.body;
    if (isUndefined(title) || isUndefined(challenge) || isUndefined(solution))
      return next(
        createError(res, 400, "Title, Challenge and Solution are required")
      );

    const createdChallenge = await Challenge.create({
      user: req.user._id,
      title,
      challenge,
      solution,
      group: groupId,
      ...rest,
    });

    await Group.findByIdAndUpdate(
      groupId,
      { $push: { challenges: createdChallenge._id } },
      { new: true }
    );

    res.status(200).json(createdChallenge);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const updateGroups = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    const groups = await Group.findByIdAndUpdate(
      groupId,
      { $set: { ...req.body } },
      { new: true }
    )
      .populate("admin")
      .exec();
    res.status(200).json(groups);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const joinGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;
    await Group.findByIdAndUpdate(
      groupId,
      { $addToSet: { members: req.user._id } },
      { new: true }
    );
    res.status(200).json({ message: "Group joined successfully." });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const leaveGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    const findedGroup = await Group.findById(groupId);
    if (findedGroup.admin.toString() == req.user._id.toString())
      return res.status(401).json({ message: "Admin can't leave the group." });

    await Group.findByIdAndUpdate(
      groupId,
      { $pull: { members: req.user._id } },
      { new: true }
    );
    res.status(200).json({ message: "Group leaved successfully." });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const deleteGroup = async (req, res, next) => {
  try {
    const { groupId } = req.params;

    const deletedGroup = await Group.findByIdAndDelete(groupId);
    res.status(200).json(deletedGroup);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const deleteWholeGroup = async (req, res, next) => {
  try {
    const deletedGroup = await Group.deleteMany();
    res.status(200).json(deletedGroup);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
