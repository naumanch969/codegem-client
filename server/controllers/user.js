import User from '../models/user.js'
import Code from '../models/code.js'
import { isUndefined, createError } from '../utils/functions.js'

export const getAllUsers = async (req, res, next) => {
    try {

        const users = await User.find()
        res.status(200).json(users)

    } catch (error) {
        next(createError(500, error.message))
    }
}
export const getUser = async (req, res, next) => {
    try {
        const { userId } = req.params
        const user = await User.find({ userId })
        res.status(200).json(user)

    } catch (error) {
        next(createError(500, error.message))
    }
}
export const deleteUser = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email })
        if (!user) return next(createError('email not exist'))

        const result = await User.findByIdAndDelete(user._id)
        return res.status(200).json(result)
    }
    catch (error) {
        next(createError(500, error.message))
    }
}
export const deleteUserCollection = async (req, res, next) => {
    try {

        const result = await User.deleteMany()
        res.status(200).json(result)

    } catch (error) {
        next(createError(500, error.message))
    }
}



export const getFriends = async (req, res, next) => {    // this request is made by the sender
    try {
        const userId = req.user._id
        const friends = await User.findById(userId, { friends: 1, sentRequests: 1, receivedRequests: 1 })
        res.status(200).json(friends)

    } catch (error) {
        next(createError(500, error.message))
    }
}
export const sendFriendRequest = async (req, res, next) => {    // this request is made by the sender
    try {
        let { receiverId } = req.params
        const senderId = req?.userId

        const sender = await User.findById(senderId)
        if (!sender) return next(createError(400, 'Wrong Sender Id'))

        const receiver = await User.findById(receiverId)
        if (!receiver) return next(createError(400, 'Wrong Reveiver Id'))

        const updatedSender = await User.findByIdAndUpdate(senderId, { sentRequests: { $addToSet: receiver._id } }, { new: true })
        const updatedReceiver = await User.findByIdAndUpdate(receiverId, { receivedRequests: { $addToSet: sender._id } }, { new: true })

        res.status(200).json({ sender: updatedSender, receiver: updatedReceiver })

    } catch (error) {
        next(createError(500, error.message))
    }
}
export const rejectFriendRequest = async (req, res, next) => {  // this request is made by the sender
    try {
        let { senderId } = req.params

        const receiverId = req?.userId

        const sender = await User.findById(senderId)
        if (!sender) return next(createError(400, 'Wrong Sender Id'))

        const receiver = await User.findById(receiverId)
        if (!receiver) return next(createError(400, 'Wrong Receiver Id'))

        sender.sendRequests = sender.sendRequests.filter(requestId => String(requestId) !== String(receiverId))
        receiver.notifications = receiver.notifications?.filter(n => { n.type !== 'friend_request' && n.user !== senderId })

        const updatedSender = await User.findByIdAndUpdate(senderId, { sentRequests: { $pull: receiver._id } }, { new: true })
        const updatedReceiver = await User.findByIdAndUpdate(receiverId, { receivedRequests: { $pull: sender._id } }, { new: true })

        res.status(200).json({ sender: updatedSender, receiver: updatedReceiver })

    } catch (error) {
        next(createError(500, error.message))
    }
}
export const acceptFriendRequest = async (req, res, next) => {  // this request is made by the receiver
    try {
        let { senderId } = req.params

        const sender = await User.findById(senderId)
        if (!sender) return next(createError(400, 'Wrong Sender Id'))

        const receiver = await User.findById(req?.userId)
        if (!receiver) return next(createError(400, 'Wrong Receiver Id'))

        const updatedSender = await User.findByIdAndUpdate(
            sender._id,
            { friends: { $addToSet: receiver._id }, sentRequests: { $pull: receiver._id } },
            { new: true }
        )
        const updatedReceiver = await User.findByIdAndUpdate(
            receiver?._id,
            { friends: { $addToSet: sender._id }, receivedRequests: { $pull: sender._id } },
            { new: true }
        )

        res.status(200).json({ sender: updatedSender, accepter: updatedReceiver })

    } catch (error) {
        next(createError(500, error.message))
    }
}