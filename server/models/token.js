import mongoose, { Schema } from 'mongoose';

const tokenSchema = new mongoose.Schema({
    refresh_token: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    user_agent: {
        type: String,
        default: 'PostmanRuntime/7.29.0'
    },
    is_valid: {
        type: Boolean,
        default: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    }
}, { timestamps: true });

const Token = mongoose.model('Token', tokenSchema);

export default Token;
