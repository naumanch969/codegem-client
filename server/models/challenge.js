import { Schema, model } from "mongoose";

const challengeSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String },
    description: { type: String },
    language: { type: String },
    challenge: { type: String },
    solution: { type: String },
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
    group: { type: Schema.Types.ObjectId, ref: "Group", default: null }, // if groupPost, then groupId
    collectionRef: {type: Schema.Types.ObjectId,ref: "Collection",default: null,}, // if collectionPost, then collectionId
    // collectionRef is being used as collection is mongodb reserved word and can't be used fieldname
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

const challenge = model("Challenge", challengeSchema);

export default challenge;
