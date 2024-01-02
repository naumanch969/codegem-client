import Group from "../models/group.js";
import { createError } from "../utils/functions.js";

export const getGroups = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const groups = await Group.find({}).populate("admin").exec();

    res.status(200).json(groups);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const getUserGroups = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const groups = await Group.find({ admin: userId }).populate("admin").exec();
    res.status(200).json(groups);
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
      .populate("sharedCodes.from")
      .populate("sharedCodes.code")
      .exec();
    res.status(200).json(groups);
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
