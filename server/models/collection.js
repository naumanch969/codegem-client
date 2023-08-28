import { model, Schema } from 'mongoose'

const collectionSchema = new Schema({
    name: { type: String, required: true, },
    description: { type: String, required: false, },
    codes: { type: [{ type: Schema.Types.ObjectId, ref: 'Code', }], default: [] },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, },
    visibility: { type: String, enum: ['private', 'public'], default: 'private' }
}, { timestamps: true });

const Collection = model('Collection', collectionSchema);

module.exports = Collection;
