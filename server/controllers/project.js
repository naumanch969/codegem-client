import Project from "../models/project.js";
import Group from "../models/group.js";
import User from "../models/user.js";
import Collection from "../models/collection.js";
import { createError, isUndefined } from "../utils/functions.js";

export const getProjects = async (req, res, next) => {
  try {
    const result = await Project.find()
      .sort({ createdAt: -1 })
      .populate("user")
      .exec();
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const getUserProjects = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await Project.find({ user: userId }).populate("user").exec();
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const getLikedProjects = async (req, res, next) => {
  try {
    const result = await Project.find({ likes: { $in: [req.user._id] } })
      .populate("user")
      .exec();
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const getSavedProjects = async (req, res, next) => {
  try {
    const result = await Collection.findOne(
      { name: "Saved", owner: req.user._id },
      { projects: 1, _id: 0 }
    )
      .populate("projects")
      .exec();
    res.status(200).json(result.projects);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const createProject = async (req, res, next) => {
  try {
    let { title, project, groupId, ...rest } = req.body;
    if (isUndefined(title) || isUndefined(project))
      return next(
        createError(res, 400, "Make sure to provide all the fields.")
      );

    const userId = req.user._id;

    var result;
    if (groupId) {
      result = await Project.create({
        user: userId,
        title,
        project,
        groups: groupId ? [groupId] : [],
        ...rest,
      });
      await Group.findByIdAndUpdate(
        groupId,
        { $addToSet: { projects: result._id } },
        { new: true }
      );
    } else {
      result = await Project.create({
        user: userId,
        title,
        project,
        groups: groupId ? [groupId] : [],
        ...rest,
      });
    }

    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const result = await Project.findByIdAndUpdate(
      projectId,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const likeProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) return next(createError(res, 403, "Project not exist."));

    const userHasLiked = project.likes.includes(req.user?._id);

    if (userHasLiked) {
      await Project.findByIdAndUpdate(
        projectId,
        { $pull: { likes: req.user?._id } },
        { new: true }
      );
      res.status(200).json({ message: "Removed like successfully" });
    } else {
      await Project.findByIdAndUpdate(
        projectId,
        { $addToSet: { likes: req.user?._id } },
        { new: true }
      );
      res.status(200).json({ message: "Liked successfully" });
    }
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const shareProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    let {   friendIds } = req.body;

    // Validate that friendIds is an array of valid user IDs
    if (
      !Array.isArray(friendIds) ||
      friendIds.some((userId) => typeof userId !== "string")
    ) {
      return res.status(400).json({ error: "Invalid friendIds format" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const usersForProject = friendIds.map((userId) => ({
      from: req.user._id,
      to: userId,
      sharedAt: Date.now(),
    }));
    const projectsForUser = friendIds.map((userId) => ({
      from: req.user._id,
      project: projectId,
      sharedAt: Date.now(),
    }));

    // updating project, adding user to shares array
    await Promise.all(
      usersForProject.map(async (userObj) => {
        await Project.findByIdAndUpdate(
          projectId,
          { $push: { shares: userObj } },
          { new: true }
        );
      })
    );

    // updating user, adding project to shares array
    await Promise.all(
      projectsForUser.map(async (projectObj) => {
        await User.findByIdAndUpdate(
          projectObj.from,
          { $addToSet: { shares: projectObj } },
          { new: true }
        );
      })
    );

    res.status(200).json({ message: "Project shared successfully." });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const shareProjectInGroups = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    let { groupIds } = req.body;

    // Validate that friendIds is an array of valid user IDs
    if (
      !Array.isArray(groupIds) ||
      groupIds.some((groupId) => typeof groupId !== "string")
    ) {
      return res.status(400).json({ error: "Invalid groupIds format" });
    }

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const groupsForProject = groupIds.map((groupId) => ({
      from: req.user._id,
      group: groupId,
      sharedAt: Date.now(),
    }));
    const projectsForGroups = groupIds.map((groupId) => ({
      from: req.user._id,
      project: projectId,
      sharedAt: Date.now(),
    }));

    // updating projects, adding groupId to groups array
    await Promise.all(
      groupsForProject.map(async (groupObj) => {
        await Project.findByIdAndUpdate(
          projectId,
          { $push: { groups: groupObj } },
          { new: true }
        );
      })
    );

    // updating groups, adding projectId to sharedProjects array
    await Promise.all(
      projectsForGroups.map(async (projectObj, index) => {
        const updated = await Group.findByIdAndUpdate(
          groupIds[index],
          { $push: { sharedProjects: projectObj } },
          { new: true }
        );
       })
    );

    res.status(200).json({ message: "Project shared successfully." });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const saveProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) return next(createError(res, 403, "Project not exist."));

    const findedCollection = await Collection.findOne({
      name: "Saved",
      owner: req.user._id,
    });
    await Collection.findByIdAndUpdate(
      findedCollection._id,
      { $addToSet: { projects: projectId } },
      { new: true }
    );

    res.status(200).json({ message: "Project saved successfully." });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const saveProjectInCollections = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { collections } = req.body;

    const project = await Project.findById(projectId);
    if (!project) return next(createError(res, 403, "Project not exist."));

    await Promise.all(
      collections.map(
        async (collectionId) =>
          await Collection.findByIdAndUpdate(collectionId, {
            $addToSet: { projects: projectId },
          })
      )
    );

    res
      .status(200)
      .json({ message: "Project saved in collections successfully." });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const dislikeProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) return next(createError(res, 403, "Project not exist."));

    const result = await Project.findByIdAndUpdate(
      projectId,
      { $addToSet: { likes: req.user?._id } },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const commentProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { value } = req.body;

    const project = await Project.findById(projectId);
    Project.comments.push(value);
    const result = await Project.findByIdAndUpdate(projectId, project, {
      new: true,
    });
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const deleteProject = async (req, res, next) => {
  try {
    let { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) return next(createError(res, 403, "Project not exist"));

    const result = await Project.findByIdAndDelete(projectId);
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const deleteProjectCollection = async (req, res, next) => {
  try {
    const result = await Project.deleteMany();
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
