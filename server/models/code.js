import { Schema, model } from "mongoose";

const codeSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    description: { type: String },
    code: { type: String },
    tags: {
      type: [
        {
          name: { type: String },
          user: { type: Schema.Types.ObjectId, ref: "User" },
        },
      ],
    },
    hashTags: { type: [String], default: [] },
    likes: { type: [{ type: Schema.Types.ObjectId, ref: "User" }] },
    comments: { type: [{ type: Schema.Types.ObjectId, ref: "Comment" }] },
    shares: { type: [{ type: Schema.Types.ObjectId, ref: "Share" }] }, // this post is being shared among which people/group
    visibility: {
      type: String,
      enum: [
        "private",
        "public",
        "friends only",
        "all friends except",
        "only share with",
      ],
      default: "public",
    },
  },
  { timestamps: true }
);

const code = model("Code", codeSchema);

export default code;
