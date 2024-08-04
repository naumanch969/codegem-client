import Share from "../models/submodels/share.js";
import Notification from "../models/notification.js";
import Comment from "../models/submodels/comment.js";
import Code from "../models/code.js";
import Challenge from "../models/challenge.js";
import Streak from "../models/streak.js";
import Group from "../models/group.js";
import User from "../models/user.js";
import Collection from "../models/collection.js";
import {
  createError,
  createNotification,
  isUndefined,
} from "../utils/functions.js";
export const getCodes = async (req, res, next) => {
  try {
    const { page, pageSize, count, userId, filter, query: searchQuery, languages: languagesString, } = req.query;

    let aggregationPipeline = userId ? [{ $match: { user: { $regex: new RegExp(userId, "i") } } }] : [];

    // Active Menu Filter
    if (filter === "famous") {
      aggregationPipeline.push(
        { $sort: { likes: -1 } } // Sort by likes in descending order
      );
    } else if (filter == "trending") {
      aggregationPipeline.push(
        { $lookup: { from: "comments", localField: "comments", foreignField: "_id", as: "comments" } },
        { $addFields: { commentsCount: { $size: "$comments" } } },
        { $sort: { commentsCount: -1 } }
      );
    } else if (filter === "latest") {
      aggregationPipeline.push({ $sort: { createdAt: -1 } });
    } else {
      aggregationPipeline.push({ $sort: { createdAt: -1 } });
    }

    // SearchQuery Filter
    if (searchQuery) {
      const regex = new RegExp(searchQuery, "i");
      aggregationPipeline.push({
        $match: {
          $or: [
            { title: { $regex: regex } },
            { description: { $regex: regex } },
            { code: { $regex: regex } },
            { language: { $regex: regex } },
            { hashTags: { $in: [regex] } },
          ],
        },
      });
    }

    // Language Filter
    const languages = languagesString?.split(",")?.map((l) => new RegExp(l, "i"));
    if (languagesString) {
      aggregationPipeline.push({
        $match: {
          $or: [...languages.map((l) => ({ language: { $regex: new RegExp(l, "i") } }))]
        },
      });
    }

    // Pagination
    const pageNumber = parseInt(page, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;
    const skip = (pageNumber - 1) * size;

    aggregationPipeline.push({ $skip: skip }, { $limit: size });

    aggregationPipeline.push(
      {
        $lookup: { from: "users", localField: "user", foreignField: "_id", as: "user", },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ["$user", 0] }, // Convert user from array to single object
        },
      }
    );

    const resultPromise = Code.aggregate(aggregationPipeline).exec();

    const [result, totalCount] = await Promise.all([
      resultPromise,
      count ? Code.countDocuments().exec() : Promise.resolve(null),
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

export const getUserCodes = async (req, res, next) => {
  try {
    const { page, pageSize, count } = req.query; // count is boolean
    const { userId } = req.params;

    let query = Code.find({ user: userId });

    const pageNumber = parseInt(page, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;
    const skip = (pageNumber - 1) * size;

    query = query.skip(skip).limit(size);

    const resultPromise = query
      .sort({ createdAt: -1 })
      .populate("user")
      .populate("shares")
      .exec();

    const [result, totalCount] = await Promise.all([
      resultPromise,
      count ? Code.countDocuments(query) : Promise.resolve(null),
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

export const getLikedCodes = async (req, res, next) => {
  try {
    const result = await Code.find({ likes: { $in: [req.user._id] } }).populate("user").exec();
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const getSavedCodes = async (req, res, next) => {
  try {
    const result = await Collection.findOne(
      { name: "Saved", owner: req.user._id },
      { codes: 1, _id: 0 }
    )
      .populate("codes")
      .exec();
    res.status(200).json(result.codes);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const createCode = async (req, res, next) => {
  try {
    let { title, code, group, collection, ...rest } = req.body;

    if (isUndefined(title)) return next(createError(res, 400, "Title is required."));
    if (isUndefined(code)) return next(createError(res, 400, "Code is required."));

    const userId = req.user._id;
    const findedUser = await User.findById(req.user._id);

    var result;
    if (group) {
      result = await Code.create({ user: userId, title, code, group, ...rest });
      const findedGroup = await Group.findByIdAndUpdate(group, { $addToSet: { codes: result._id } }, { new: true });
      // Notifiying user who created the post
      await Notification.create({
        title: `New Post: ${title}`,
        description: `You just created a code post in group: ${findedGroup.name}`,
        user: req.user._id,
      });
      // Notifying group members
      await Promise.all(
        findedGroup.members.map(async (memberId) => {
          await Notification.create({
            title: `New Post: ${title}`,
            description: `${findedUser.name} has just created a new post: ${title}. Check it out and give your thought!`,
            user: memberId,
          });
        })
      );
    } else if (collection) {
      result = await Code.create({ user: userId, title, code, collectionRef: collection, ...rest });
      result = await Code.findById(result._id).populate("collectionRef").exec();

      const findedCollection = await Collection.findByIdAndUpdate(
        collection, // collectionId
        { $addToSet: { codes: result._id } },
        { new: true }
      );
      // Notifiying user who created the post
      await Notification.create({
        title: `New Post: ${title}`,
        description: `You just created a code post in collection: ${findedCollection.name}`,
        user: req.user._id,
      });
    } else {
      result = await Code.create({ user: userId, title, code, ...rest });
      // Notifying user who created the post
      await Notification.create({
        title: `New Code - ${title}`,
        description: "Your post has been created successfully.",
        user: req.user._id,
      });
      // Notifying friends
      await Promise.all(
        findedUser.friends.map(async (friendId) => {
          await Notification.create({
            title: `New Post: ${title}`,
            description: `${findedUser.name} has just created a new post: ${title}. Check it out and give your thought!`,
            user: friendId,
          });
        })
      );
    }

    result.user = findedUser
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const updateCode = async (req, res, next) => {
  try {
    const { codeId } = req.params;

    const { collection, ...rest } = req.body;

    const updatedCode = await Code.findByIdAndUpdate(codeId, { $set: { collectionRef: collection, ...rest } }, { new: true });

    await createNotification(req.user?._id, "Code Update", `Your code post updated: ${updatedCode.title}`);

    res.status(200).json(updatedCode);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const likeCode = async (req, res, next) => {
  try {
    const { codeId } = req.params;

    const code = await Code.findById(codeId);
    if (!code) return next(createError(res, 403, "Code not exist."));

    const userHasLiked = code.likes.includes(req.user?._id);

    if (userHasLiked) {
      await Code.findByIdAndUpdate(codeId, { $pull: { likes: req.user?._id } }, { new: true });
      res.status(200).json({ message: "Removed like successfully" });
    } else {
      await Code.findByIdAndUpdate(codeId, { $addToSet: { likes: req.user?._id } }, { new: true });
      res.status(200).json({ message: "Liked successfully" });
    }
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const shareCode = async (req, res, next) => {
  try {
    const { codeId } = req.params;

    let { friendIds } = req.body; // ids of users

    // Validate that friendIds is an array of valid user IDs
    if (
      !Array.isArray(friendIds) ||
      friendIds.some((userId) => typeof userId !== "string")
    ) {
      return res.status(400).json({ error: "Invalid friendIds format" });
    }
    let code = await Code.findById(codeId);
    if (!code) {
      return res.status(404).json({ error: "Code not found" });
    }

    const shares = await Promise.all(
      friendIds.map(async (id) => {
        const shareObj = await Share.create({
          from: req.user._id,
          to: id,
          post: codeId,
          postType: "code",
          sharedTo: "friend", // friend/group
        });
        return shareObj._id;
      })
    );

    ////// sharing includes updating sender, receiver and the post being shared //////
    // updating code, adding user to shares array
    await Promise.all(
      shares.map(async (shareId) => {
        await Code.findByIdAndUpdate(
          codeId,
          { $push: { shares: shareId } },
          { new: true }
        );
      })
    );

    // updating each friend, adding shares to receiver
    await Promise.all(
      shares.map(async (shareId, index) => {
        await User.findByIdAndUpdate(friendIds[index], { $addToSet: { receivedShares: shareId } }, { new: true });
      })
    );

    // updating current user, adding shares to sender
    await Promise.all(
      shares.map(async (shareId) => {
        await User.findByIdAndUpdate(req.user._id, { $addToSet: { sentShares: shareId } }, { new: true });
      })
    );

    res.status(200).json({ message: "Code shared successfully." });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const shareCodeInGroups = async (req, res, next) => {
  try {
    const { codeId } = req.params;
    let { groupIds } = req.body;

    // Validate that friendIds is an array of valid user IDs
    if (
      !Array.isArray(groupIds) ||
      groupIds.some((groupId) => typeof groupId !== "string")
    ) {
      return res.status(400).json({ error: "Invalid groupIds format" });
    }

    const code = await Code.findById(codeId);
    if (!code) {
      return res.status(404).json({ error: "Code not found" });
    }

    const shares = await Promise.all(
      groupIds.map(async (id) => {
        const shareObj = await Share.create({
          from: req.user._id,
          to: id,
          post: codeId,
          postType: "code",
          sharedTo: "group", // friend/group
        });
        return shareObj._id;
      })
    );

    ////// sharing includes updating sender, receiver and the post being shared //////
    // updating code, adding user to shares array
    await Promise.all(
      shares.map(async (shareId) => {
        await Code.findByIdAndUpdate(codeId, { $push: { shares: shareId } }, { new: true });
      })
    );

    // updating groups, adding codeId to shares array
    await Promise.all(
      shares.map(async (shareId, index) => {
        await Group.findByIdAndUpdate(groupIds[index], { $push: { shares: shareId } }, { new: true }); // shareId is the id of the share of post
      })
    );

    // updating current user, adding shares to sender
    await Promise.all(
      shares.map(async (shareId) => {
        await User.findByIdAndUpdate(req.user._id, { $addToSet: { sentShares: shareId } }, { new: true });
      })
    );

    res.status(200).json({ message: "Code shared successfully." });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const saveCode = async (req, res, next) => {
  try {
    const { codeId } = req.params;

    const code = await Code.findById(codeId);
    if (!code) return next(createError(res, 403, "Code not exist."));

    const findedCollection = await Collection.findOne({
      name: "Saved",
      owner: req.user._id,
    });
    await Collection.findByIdAndUpdate(findedCollection._id, { $addToSet: { codes: codeId } }, { new: true });

    res.status(200).json({ message: "Code saved successfully." });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const saveCodeInCollections = async (req, res, next) => {
  try {
    const { codeId } = req.params;
    const { collections } = req.body;

    const code = await Code.findById(codeId);
    if (!code) return next(createError(res, 403, "Code not exist."));

    await Promise.all(
      collections.map(
        async (collectionId) =>
          await Collection.findByIdAndUpdate(collectionId, { $addToSet: { codes: codeId } })
      )
    );

    res
      .status(200)
      .json({ message: "Code saved in collections successfully." });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const dislikeCode = async (req, res, next) => {
  try {
    const { codeId } = req.params;

    const code = await Code.findById(codeId);
    if (!code) return next(createError(res, 403, "Code not exist."));

    const result = await Code.findByIdAndUpdate(codeId, { $addToSet: { likes: req.user?._id } }, { new: true });
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const commentCode = async (req, res, next) => {
  try {
    const { codeId } = req.params;
    const { content } = req.body;

    const code = await Code.findById(codeId);
    if (!code) return next(createError(res, 403, "Code not exist"));

    const comment = await Comment.create({ user: req.user._id, post: codeId, content, });

    await Code.findByIdAndUpdate(codeId, { $addToSet: { comments: comment } }, { new: true });
    res.status(200).json({ message: "Commented Successfully" });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const deleteCode = async (req, res, next) => {
  try {
    let { codeId } = req.params;

    const code = await Code.findById(codeId);
    if (!code) return next(createError(res, 403, "Code not exist"));

    const result = await Code.findByIdAndDelete(codeId);
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const deleteCodeCollection = async (req, res, next) => {
  try {
    const result = await Code.deleteMany();
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
