import { Schema, model, Document, Types } from "mongoose";

// Define the schema for the User model
const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    phone: { type: Number, default: null, required: false },
    verified: { type: Boolean, default: false },
    password: { type: String },
    profilePicture: { type: String, default: '' },
    shares: { type: [{ from: { type: Schema.Types.ObjectId, ref: 'User', }, code: { type: Schema.Types.ObjectId, ref: 'Code', }, sharedAt: { type: Date, default: Date.now } }], default: [] },
    friends: [{ type: Types.ObjectId, ref: 'User' }],
    sentRequests: [{ type: Types.ObjectId, ref: 'User' }],
    receivedRequests: [{ type: Types.ObjectId, ref: 'User' }],
    notifications: [{ type: Types.ObjectId, ref: 'Notification' }],
});



// Create a model with the specified document type
const User = model("User", userSchema);

export default User;
