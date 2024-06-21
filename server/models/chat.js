import { Schema, model } from "mongoose"

const chatSchema = new Schema({
    lastMessage: { type: String, default: '' },
    lastMessageTimestamp: { type: Date, default: Date.now() },
    participants: { type: [{ type: Schema.Types.ObjectId, ref: 'User' }] },
    messages: { type: [{ type: Schema.Types.ObjectId, ref: 'Message' }], default: [] },
}, { timestamps: true })

const Chat = model("Chat", chatSchema)
export default Chat