import { Schema, model } from "mongoose";

const commentSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    post: { type: Schema.Types.ObjectId }, // populate with method .populate({path:'reference', model:'Code'})
    content: { type: String },
  },
  { timestamps: true }
);

const comment = model("Comment", commentSchema);

export default comment;
