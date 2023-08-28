import { Schema, model } from "mongoose"

const userSchema = Schema({
    firstName: { type: String, },
    lastName: { type: String, },
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    phone: { type: Number, unique: true },
    password: { type: String, },
    profilePicture: { type: String, default: '' },
    saved: { type: [{ type: Schema.Types.ObjectId, ref: 'Code' }], default: [] },
    friends: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], default: [] },
    sentRequests: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], default: [] },       // jin logo ko friend request bheji h 
    receivedRequests: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], default: [] },       // jin logo ko friend request bheji h 
})

const user = new model("User", userSchema)
export default user