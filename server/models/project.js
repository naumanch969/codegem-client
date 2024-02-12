import { Schema, model } from "mongoose";

// TODO: update the schema with actual fields
const challengeSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, },
    description: { type: String, },
    challenge: { type: String, },
    tags: { type: [{ name: { type: String, }, user: { type: Schema.Types.ObjectId, ref: 'User' }, }], default: [] },
    hashTags: { type: [String], default: [] },
    likes: { type: [{ type: Schema.Types.ObjectId, ref: 'User', }], default: [] },
    comments: { type: Schema.Types.ObjectId, ref: 'Comment', default: [] },
    shares: { type: [{type: Schema.Types.ObjectId, ref:'Share'}], default: [] },   // this post is being shared among which people/group
    visibility: { type: String, enum: ['private', 'public', 'friends only', 'all friends except', 'only share with',], default: 'public' },
}, { timestamps: true });

const challenge = model('challenge', challengeSchema);

export default challenge