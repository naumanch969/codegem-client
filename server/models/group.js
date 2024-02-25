import { Schema, model } from "mongoose";

const groupSchema = Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: false },
    description: { type: String, required: true },
    members: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      ref: "User",
      default: [],
    },
    categories: { type: [String], default: [] },
    languages: { type: [String], default: [] },
    admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
    codes: { type: [Schema.Types.ObjectId], ref: "Code", default: [] },
    challenges: { type: [Schema.Types.ObjectId], ref: "Challenge", default: [] },
    streaks: { type: [Schema.Types.ObjectId], ref: "Streak", default: [] },
    shares: {
      type: [{ type: Schema.Types.ObjectId, ref: "Share" }],
    }, // this post is being shared among which people/group
  },
  { timestamps: true }
);

const groupModel = model("Group", groupSchema);

export default groupModel;
