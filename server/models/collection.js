import { model, Schema } from "mongoose";

const collectionSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    language: { type: String, required: false },
    categories: {
      type: [String], // Change here from { type: [{ type: String, default: [] }]}
      default: [], // If you want an empty array by default
    },
    codes: { type: [Schema.Types.ObjectId], ref: "Code", default: [] },
    challenges: {
      type: [Schema.Types.ObjectId],
      ref: "Challenge",
      default: [],
    },
    streaks: { type: [Schema.Types.ObjectId], ref: "Streak", default: [] },
    shares: { type: [{ type: Schema.Types.ObjectId, ref: "Share" }] },
    stars: { type: [{ type: Schema.Types.ObjectId, ref: "User" }] },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    visibility: {
      type: String,
      enum: ["private", "public"],
      default: "private",
    },
  },
  { timestamps: true }
);

const Collection = model("Collection", collectionSchema);

export default Collection;
