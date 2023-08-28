import { Schema, model } from "mongoose";

const groupSchema = Schema({

    name: { type: String },
    avatar: { type: String },
    description: { type: String },
    members: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }], ref: 'User' },
    admin: { type: Schema.Types.ObjectId, ref: 'User' },
    codes: { type: [Schema.Types.ObjectId], ref: 'Code' },
            

}, { timestamps: true });

const groupModel = model('Group', groupSchema);

export default groupModel