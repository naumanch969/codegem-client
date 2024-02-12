import { model, Schema } from "mongoose";

const collectionSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    codes: {
      type: [{ type: Schema.Types.ObjectId, ref: "Code" }],
    },
    challenges: {
      type: [{ type: Schema.Types.ObjectId, ref: "Challenge" }],
    },
    streaks: {
      type: [{ type: Schema.Types.ObjectId, ref: "Streak" }],
    },
    shares: { type: [{ type: Schema.Types.ObjectId, ref: "Share" }] }, // this collection is being shared among which people/group
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
