import { Schema, model } from "mongoose";

const shareSchema = Schema(
  {
    from: { type: Schema.Types.ObjectId, ref: "User" },
    to: { type: Schema.Types.ObjectId }, // either group or user
    post: { type: Schema.Types.ObjectId }, // either code, streak, challenge, project, collection
    postType: {
      type: String,
      enum: ["code", "streak", "challenge", "collection"],
      default: "code",
    },
    sharedTo: {
      type: String,
      enum: ["friend", "group"],
      default: "friend",
    },
  },
  { timestamps: true }
);

const share = model("Share", shareSchema);

export default share;
