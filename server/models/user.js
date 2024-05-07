import { Schema, model, Document, Types } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  phone: { type: Number, required: false },
  password: { type: String },
  profilePicture: { type: String },
  coverImage: { type: String },
  bio: { type: String },
  title: { type: String },
  location: { type: String },
  role: { type: String, enum: ["User", "Admin"], default: "User" },
  interests: { type: [String], default: [] },
  hobbies: { type: [String], default: [] },
  programming: { type: [String], default: [] },
  books: { type: [String], default: [] },
  socialLinks: { type: { facebook: String, instagram: String, twitter: String, linkedin: String, } },
  verified: { type: Boolean, default: false },
  receivedShares: { type: [{ type: [{ type: Schema.Types.ObjectId, ref: "Share" }] }], default: [], },
  sentShares: { type: [{ type: [{ type: Schema.Types.ObjectId, ref: "Share" }] }], default: [], },
  friends: [{ type: Types.ObjectId, ref: "User" }],
  sentRequests: [{ type: Types.ObjectId, ref: "User" }],
  receivedRequests: [{ type: Types.ObjectId, ref: "User" }],
  notifications: [{ type: Types.ObjectId, ref: "Notification" }],
});

// Create a model with the specified document type
const User = model("User", userSchema);

export default User;
