import { Schema, model } from "mongoose";

const groupSchema = Schema({

    name: { type: String, required: true },
    avatar: { type: String, required: false },
    description: { type: String, required: true },
    members: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], ref: 'User', default: [] },
    categories: { type: [String], default: [] },
    admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    codes: { type: [Schema.Types.ObjectId], ref: 'Code', default: [] },
    sharedCodes: { type: [{ from: { type: Schema.Types.ObjectId, ref: 'User' }, code: { type: Schema.Types.ObjectId, ref: 'Code' }, sharedAt: { type: Date, default: Date.now } }], default: [] },   // from = shareBy or createdBy



}, { timestamps: true });

const groupModel = model('Group', groupSchema);

export default groupModel