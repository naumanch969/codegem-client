import { Schema, model } from "mongoose";

const notificationSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: { type: String, },
    description: { type: String },
    type: { type: String },
    data: { type: Object }
}, { timestamps: true });

const notificationModel = model('Notification', notificationSchema);

export default notificationModel