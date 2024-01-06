import { Schema, model, Document, Types } from "mongoose";

// Define the schema for the User model
const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  phone: { type: Number, default: null, required: false },
  password: { type: String },
  profilePicture: { type: String },
  coverImage: { type: String },
  bio: { type: String },
  title: { type: String },
  socialLinks: {
    type: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedin: String,
    },
  },
  verified: { type: Boolean, default: false },
  receivedShares: {
    type: [
      { type: [{ type: Schema.Types.ObjectId, ref: "Share" }], default: null },
    ],
    default: [],
  },
  sentShares: {
    type: [
      { type: [{ type: Schema.Types.ObjectId, ref: "Share" }], default: null },
    ],
    default: [],
  },
  friends: [{ type: Types.ObjectId, ref: "User" }],
  sentRequests: [{ type: Types.ObjectId, ref: "User" }],
  receivedRequests: [{ type: Types.ObjectId, ref: "User" }],
  notifications: [{ type: Types.ObjectId, ref: "Notification" }],
});

// Create a model with the specified document type
const User = model("User", userSchema);

export default User;
