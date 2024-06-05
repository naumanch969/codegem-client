import Comment from "../models/submodels/comment.js";
import { createError } from "../utils/functions.js";

export const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    let { postType } = req.query;
    postType = postType.charAt(0).toUpperCase() + postType.slice(1);

    const comments = await Comment.find({ post: postId })
      .populate({ path: "post", model: postType })
      .populate("user")
      .exec();


    res.status(200).json(comments);
  } catch (error) {
    next(createError(res, 500, error.message));
  }
};
