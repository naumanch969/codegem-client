import Chat from '../models/chat.js'
import Message from '../models/message.js'
import { createError } from "../utils/functions.js";

export const getChats = async (req, res, next) => {
    try {
        const userId = req.user._id

        const chats = await Chat.find({ participants: userId }).sort({ lastMessageTimestamp: -1 }).populate('participants').populate('messages').exec();

        res.status(200).json(chats)
    } catch (error) {
        console.error('fetchChats error: ', error);
        throw error;
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const { chatId } = req.params
        if (!chatId) return next(createError(res, 400, "ChatId not found"));

        const findedChat = await Chat.find(chatId, { messages: 1 }).populate('participants').populate('messages').exec();
        const messages = findedChat[0].messages;

        res.status(200).json(messages)

    } catch (error) {
        console.error('getMessages error: ', error);
        throw error;
    }
}

export const getUnreadMessageCount = async (req, res, next) => {
    try {

        const { chatId } = req.params
        if (!chatId) return next(createError(res, 400, "ChatId  not found"));

        const userId = req.user._id

        const chat = await Chat.findOne(chatId).populate('participants').populate('messages').exec();

        const messages = chat.messages;
        const readMessages = messages.filter((message) => message?.readBy.includes(userId));
        const unreadMessagesCount = messages.length - readMessages.length;

        res.status(200).json(unreadMessagesCount)
    } catch (error) {
        console.error('getUnreadMessageCount error: ', error);
        throw error;
    }
}

export const getChat = async (req, res, next) => {
    try {
        const { chatId } = req.params
        if (!chatId) return next(createError(res, 400, "ChatId not found"));

        const findedChat = await Chat.findOne(chatId).populate('participants').populate('messages').exec();

        res.status(200).json(findedChat)
    }
    catch (err) {
        console.error('fetchChat error: ', err);
        throw err;
    }
}

export const createChat = async (req, res, next) => {
    try {

        const { participants } = req.body
        if (participants == 0) return next(createError(res, 400, "Participants can't be empty"));

        const result = await Chat.create({ ...req.body });

        const findedChat = await Chat.findById(result._id).populate('participants').populate('messages').exec()

        res.status(200).json(findedChat)
    } catch (error) {
        console.error('createChat error: ', err);
        throw err;
    }
}

export const updateChat = async (req, res, next) => {
    try {

        const { chatId } = req.params
        if (!chatId) return next(createError(res, 400, "ChatId not found"));

        const { participants } = req.body
        if (participants == 0) return next(createError(res, 400, "Participants can't be empty"));

        const updatedChat = await Chat.findByIdAndUpdate(chatId, { $set: { ...req.body } }, { new: true }).exec();

        const findedChat = await Chat.findById(updatedChat._id).populate('participants').populate('messages').exec()

        res.status(200).json(findedChat);
    } catch (error) {
        console.error('updateChat error: ', error);
        throw error;
    }
}


export const sendMessage = async (req, res, next) => {
    try {

        const { chatId } = req.params
        if (!chatId) return next(createError(res, 400, "ChatId not found"));

        const { readBy, sender, receiver, text, timestamp } = req.body

        if (!text) return next(createError(res, 400, "Text not found"));
        if (!sender) return next(createError(res, 400, "Sender Id not found"));
        if (!receiver) return next(createError(res, 400, "Receiver Id not found"));
        if (!timestamp) return next(createError(res, 400, "TimeStamp not found"));
        if (!readBy) return next(createError(res, 400, "ReadBy not found"));

        let findedChat = await Chat.findById(chatId)
        if (!findedChat) return next(createError(400, 'Chat not found'))

        const newMessage = await Message.create({ sender, receiver, text, timestamp, readBy })

        await Chat.findByIdAndUpdate(
            chatId,
            { $set: { messages: [...findedChat.messages, newMessage], lastMessage: text, lastMessageTimestamp: new Date() } },
            { new: true }
        ).exec();

        findedChat = await Chat.findById(chatId).populate('participants').populate('messages').exec()

        res.status(200).json(findedChat);

    } catch (error) {
        console.error('sendMessage error: ', error);
        throw error;
    }
}

export const markMessageAsRead = async (req, res, next) => {
    try {

        const { chatId, messageId } = req.params
        if (!chatId) return next(createError(res, 400, "ChatId not found"));
        if (!message) return next(createError(res, 400, "MessageId not found"));

        const userId = req.user._id

        const chat = await Chat.fineOneAndUpdate(
            { _id: chatId, 'messages._id': messageId },
            { $addToSet: { 'messages.$.readBy': userId } }
        ).exec();

        res.status(200).json(chat);
    } catch (error) {
        console.error('markMessageAsRead error: ', error);
        throw error;
    }
}

export const markAllMessagesAsRead = async (req, res, next) => {
    try {

        const { chatId } = req.params
        if (!chatId) return next(createError(res, 400, "ChatId not found"));

        const userId = req.user._id

        const chat = await Chat.fineOneAndUpdate(
            { _id: chatId, 'messages.readBy': { $nin: [userId] } },
            { $addToSet: { 'messages.$.readBy': userId } }
        ).exec();

        res.status(200).json(chat)
    } catch (error) {
        console.error('markAllMessagesAsRead error: ', error);
        throw error;
    }
} 