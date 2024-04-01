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
    language: { type: String, default: "" },
    likes: { type: [{ type: Schema.Types.ObjectId, ref: "User" }] },
    comments: { type: [{ type: Schema.Types.ObjectId, ref: "Comment" }] },
    shares: { type: [{ type: Schema.Types.ObjectId, ref: "Share" }] }, // this post is being shared among which people/group
    group: { type: Schema.Types.ObjectId, ref: "Group", default: null }, // if groupPost, then groupId
    collectionRef: { type: Schema.Types.ObjectId, ref: "Collection", default: null }, // if collectionPost, then collectionId
    // collectionRef is being used as collection is mongodb reserved word and can't be used fieldname
    visibility: {
      type: String,
      enum: ["private", "public"],
      default: "public",
    },
  },
  { timestamps: true }
);

const code = model("Code", codeSchema);

export default code;
