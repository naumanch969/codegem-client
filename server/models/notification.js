import { Schema, model } from "mongoose";

const notificationSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String },
    description: { type: String },
    type: {
      type: String,
      enum: ["FRIEND_REQUEST", "POST_CREATE", "GENERAL"],
      default: "GENERAL",
    },
    isRead: { type: Boolean, default: false },
    data: { type: Object, default: {} },
  },
  { timestamps: true }
);

const notificationModel = model("Notification", notificationSchema);

export default notificationModel;
