import { Schema, model } from "mongoose"

const messageSchema = new Schema({
    receiver: { type: Schema.Types.ObjectId, ref: 'User' },
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date },
    readBy: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: String },
}, { timestamps: true })

const Message = model("Message", messageSchema)
export default Message