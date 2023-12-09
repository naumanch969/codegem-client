import { Schema, model } from "mongoose";

const codeSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, },
    description: { type: String, },
    code: { type: String, },
    tags: { type: [{ name: { type: String, }, user: { type: Schema.Types.ObjectId, ref: 'User' }, }], default: [] },
    hashTags: { type: [String], default: [] },
    likes: { type: [{ type: Schema.Types.ObjectId, ref: 'User', }], default: [] },
    comments: { type: [{ user: { type: Schema.Types.ObjectId, ref: 'User', }, content: { type: String, }, createdAt: { type: Date, default: Date.now } }], default: [] },
    shares: { type: [{ from: { type: Schema.Types.ObjectId, ref: 'User', }, to: { type: Schema.Types.ObjectId, ref: 'User', }, sharedAt: { type: Date, default: Date.now } }], default: [] },   // this post is being shared among which people
    groups: { type: [{ from: { type: Schema.Types.ObjectId, ref: 'User' },group: { type: Schema.Types.ObjectId, ref: 'Group' },  sharedAt: { type: Date, default: Date.now } }], default: [] },   // this post is among how many groups
    visibility: { type: String, enum: ['private', 'public', 'friends only', 'all friends except', 'only share with',], default: 'public' },
}, { timestamps: true });

const code = model('Code', codeSchema);

export default code