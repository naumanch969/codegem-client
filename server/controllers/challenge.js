import Challenge from "../models/challenge.js";
import Comment from "../models/submodels/comment.js";
import Share from "../models/submodels/share.js";
import Group from "../models/group.js";
import User from "../models/user.js";
import Notification from "../models/notification.js";
import Collection from "../models/collection.js";
import { createError, isUndefined } from "../utils/functions.js";

export const getChallenges = async (req, res, next) => {
  try {
    const { page, pageSize, count, userId, filter, query: searchQuery, languages: languagesString, } = req.query;

    let aggregationPipeline = userId ? [{ $match: { user: { $regex: new RegExp(userId, "i") } } }] : [];

    if (filter === "famous") {
      aggregationPipeline.push({ $sort: { likes: -1 } });
    } else if (filter == "trending") {
      // TODO: add shares in it aswell, same for other gets (getCodes, getStreaks etc.)
      aggregationPipeline.push(
        { $lookup: { from: "comments", localField: "comments", foreignField: "_id", as: "comments", }, },
        { $addFields: { commentsCount: { $size: "$comments" }, }, },
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
            { challenge: { $regex: regex } },
            { solution: { $regex: regex } },
            { language: { $regex: regex } },
            { hashTags: { $in: [regex] } },
          ],
        },
      });
    }

    // Language Filter
    const languages = languagesString
      ?.split(",")
      ?.map((l) => new RegExp(l, "i"));
    if (languagesString) {
      aggregationPipeline.push({
        $match: {
          $or: [...languages.map((l) => ({ language: { $regex: new RegExp(l, "i") }, })),],
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

    const resultPromise = Challenge.aggregate(aggregationPipeline).exec();

    const [result, totalCount] = await Promise.all([
      resultPromise,
      count ? Challenge.countDocuments().exec() : Promise.resolve(null),
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

export const getUserChallenges = async (req, res, next) => {
  try {
    const { page, pageSize, count } = req.query; // count is boolean
    const { userId } = req.params;

    let query = Challenge.find({ user: userId });

    const pageNumber = parseInt(page, 10) || 1;
    const size = parseInt(pageSize, 10) || 10;
    const skip = (pageNumber - 1) * size;

    query = query.skip(skip).limit(size);

    const resultPromise = query.populate("user").populate("shares").exec();

    const [result, totalCount] = await Promise.all([
      resultPromise,
      count ? Challenge.countDocuments(query) : Promise.resolve(null),
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
export const getLikedChallenges = async (req, res, next) => {
  try {
    const result = await Challenge.find({ likes: { $in: [req.user._id] } }).populate("user").exec();
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const getSavedChallenges = async (req, res, next) => {
  try {
    const result = await Collection.findOne({ name: "Saved", owner: req.user._id }, { challenges: 1, _id: 0 })
      .populate("challenges")
      .exec();
    res.status(200).json(result.challenges);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const createChallenge = async (req, res, next) => {
  try {
    let { title, challenge, solution, group, collection, ...rest } = req.body;
    if (isUndefined(title) || isUndefined(challenge) || isUndefined(solution))
      return next(
        createError(res, 400, "Title, Challenge and Solution are required")
      );

    const userId = req.user._id;
    const findedUser = await User.findById(req.user._id);

    var result;
    if (group) {
      result = await Challenge.create({ user: userId, title, challenge, group, ...rest, });
      const findedGroup = await Group.findByIdAndUpdate(
        group,
        { $addToSet: { challenges: result._id } },
        { new: true }
      );
      // Notifiying user who created the post
      await Notification.create({
        title: `New Post: ${title}`,
        description: `You just created a challenge post in group: ${findedGroup.name}`,
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
      result = await Challenge.create({
        user: userId,
        title,
        challenge,
        collectionRef: collection,
        ...rest,
      });
      result = await Challenge.findById(result._id)
        .populate("collectionRef")
        .exec();

      const findedCollection = await Collection.findByIdAndUpdate(
        collection, // collectionId
        { $addToSet: { challenges: result._id } },
        { new: true }
      );
      // Notifiying user who created the post
      await Notification.create({
        title: `New Post: ${title}`,
        description: `You just created a challenge post in group: ${findedCollection.name}`,
        user: req.user._id,
      });
    } else {
      result = await Challenge.create({
        user: userId,
        title,
        challenge,
        ...rest,
      });
      // Notifying user who created the post
      await Notification.create({
        title: `New Challenge - ${title}`,
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

    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const updateChallenge = async (req, res, next) => {
  try {
    const { challengeId } = req.params;

    const { collection, ...rest } = req.body;

    const result = await Challenge.findByIdAndUpdate(
      challengeId,
      { $set: { collectionRef: collection, ...rest } },
      { new: true }
    );

    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const likeChallenge = async (req, res, next) => {
  try {
    const { challengeId } = req.params;

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) return next(createError(res, 403, "Challenge not exist."));

    const userHasLiked = challenge.likes.includes(req.user?._id);

    if (userHasLiked) {
      await Challenge.findByIdAndUpdate(
        challengeId,
        { $pull: { likes: req.user?._id } },
        { new: true }
      );
      res.status(200).json({ message: "Like removed" });
    } else {
      await Challenge.findByIdAndUpdate(
        challengeId,
        { $addToSet: { likes: req.user?._id } },
        { new: true }
      );
      res.status(200).json({ message: "Liked" });
    }
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const shareChallenge = async (req, res, next) => {
  try {
    const { challengeId } = req.params;

    let { friendIds } = req.body; // ids of users

    // Validate that friendIds is an array of valid user IDs
    if (
      !Array.isArray(friendIds) ||
      friendIds.some((userId) => typeof userId !== "string")
    ) {
      return res.status(400).json({ error: "Invalid friendIds format" });
    }
    let challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    const shares = await Promise.all(
      friendIds.map(async (id) => {
        const shareObj = await Share.create({
          from: req.user._id,
          to: id,
          post: challengeId,
          postType: "challenge",
          sharedTo: "friend", // friend/group
        });
        return shareObj._id;
      })
    );

    ////// sharing includes updating sender, receiver and the post being shared //////
    // updating challenge, adding user to shares array
    await Promise.all(
      shares.map(async (shareId) => {
        await Challenge.findByIdAndUpdate(challengeId, { $push: { shares: shareId } }, { new: true });
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

    res.status(200).json({ message: "Challenge shared successfully." });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const shareChallengeInGroups = async (req, res, next) => {
  try {
    const { challengeId } = req.params;
    let { groupIds } = req.body;

    // Validate that friendIds is an array of valid user IDs
    if (!Array.isArray(groupIds) || groupIds.some((groupId) => typeof groupId !== "string")) {
      return res.status(400).json({ error: "Invalid groupIds format" });
    }

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    const shares = await Promise.all(
      groupIds.map(async (id) => {
        const shareObj = await Share.create({
          from: req.user._id,
          to: id,
          post: challengeId,
          postType: "challenge",
          sharedTo: "group", // friend/group
        });
        return shareObj._id;
      })
    );

    ////// sharing includes updating sender, receiver and the post being shared //////
    // updating challenge, adding user to shares array
    await Promise.all(
      shares.map(async (shareId) => {
        await Challenge.findByIdAndUpdate(challengeId, { $push: { shares: shareId } }, { new: true });
      })
    );

    // updating groups, adding challengeId to shares array
    await Promise.all(
      shares.map(async (shareId, index) => {
        await Group.findByIdAndUpdate(
          groupIds[index],
          { $push: { shares: shareId } }, // shareId is the id of the share of post
          { new: true }
        );
      })
    );

    // updating current user, adding shares to sender
    await Promise.all(
      shares.map(async (shareId) => {
        await User.findByIdAndUpdate(req.user._id, { $addToSet: { sentShares: shareId } }, { new: true });
      })
    );

    res.status(200).json({ message: "Challenge shared successfully." });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const saveChallenge = async (req, res, next) => {
  try {
    const { challengeId } = req.params;

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) return next(createError(res, 403, "Challenge not exist."));

    const findedCollection = await Collection.findOne({
      name: "Saved",
      owner: req.user._id,
    });

    const hasUserSaved = findedCollection.codes.includes(challengeId);

    if (hasUserSaved) {
      await Collection.findByIdAndUpdate(
        findedCollection._id,
        { $pull: { challenges: challengeId } },
        { new: true }
      );
      res.status(200).json({ message: "Challenge Removed" });
    } else {
      await Collection.findByIdAndUpdate(
        findedCollection._id,
        { $addToSet: { challenges: challengeId } },
        { new: true }
      );
      res.status(200).json({ message: "Challenge Saved" });
    }
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const saveChallengeInCollections = async (req, res, next) => {
  try {
    const { challengeId } = req.params;
    const { collections } = req.body;

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) return next(createError(res, 403, "Challenge not exist."));

    await Promise.all(
      collections.map(
        async (collectionId) =>
          await Collection.findByIdAndUpdate(collectionId, {
            $addToSet: { challenges: challengeId },
          })
      )
    );

    res
      .status(200)
      .json({ message: "Challenge saved in collections successfully." });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const dislikeChallenge = async (req, res, next) => {
  try {
    const { challengeId } = req.params;

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) return next(createError(res, 403, "Challenge not exist."));

    const result = await Challenge.findByIdAndUpdate(
      challengeId,
      { $addToSet: { likes: req.user?._id } },
      { new: true }
    );
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const commentChallenge = async (req, res, next) => {
  try {
    const { challengeId } = req.params;
    const { content } = req.body;

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) return next(createError(res, 403, "Challenge not exist"));

    const comment = await Comment.create({
      user: req.user._id,
      post: challengeId,
      content,
    });

    await Challenge.findByIdAndUpdate(
      challengeId,
      { $addToSet: { comments: comment } },
      { new: true }
    );
    res.status(200).json({ message: "Commented Successfully" });
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
export const deleteChallenge = async (req, res, next) => {
  try {
    let { challengeId } = req.params;

    const challenge = await Challenge.findById(challengeId);
    if (!challenge) return next(createError(res, 403, "Challenge not exist"));

    const result = await Challenge.findByIdAndDelete(challengeId);
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};

export const deleteChallengeCollection = async (req, res, next) => {
  try {
    const result = await Challenge.deleteMany();
    res.status(200).json(result);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
