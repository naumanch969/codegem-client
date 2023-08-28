import Notification from '../models/notification.js'
import { isUndefined, createError } from '../utils/functions.js'

export const getNotifications = async (req, res, next) => {
    try {
        const userId = req.user._id
        const notifications = await Notification.find({ user: userId })
        res.status(200).json(notifications)

    } catch (error) {
        next(createError(500, error.message))
    }
}

export const getNotification = async (req, res, next) => {
    try {
        const userId = req.user._id
        const { notificationId } = req.params
        const notification = await Notification.find({ user: userId, _id: notificationId })
        res.status(200).json(notification)

    } catch (error) {
        next(createError(500, error.message))
    }
}
export const createNotification = async (req, res, next) => {
    try {
        const userId = req.user._id
        const { } = req.body

        const newNotification = await Notification.create({ user: userId })
        res.status(200).json(newNotification)

    } catch (error) {
        next(createError(500, error.message))
    }
}
export const updateNotification = async (req, res, next) => {
    try {
        const userId = req.user._id
        const { notificationId } = req.params

        const updatedNotification = await Notification.findByIdAndUpdate(notificationId, { $set: req.body }, { new: true })
        res.status(200).json(updatedNotification)

    } catch (error) {
        next(createError(500, error.message))
    }
}
export const deleteNotification = async (req, res, next) => {
    try {
        const { notificationId } = req.params
        const deletedNotification = await Notification.delete(notificationId)
        res.status(200).json(deletedNotification)

    } catch (error) {
        next(createError(500, error.message))
    }
}

export const deleteCollection = async (req, res, next) => {
    try {
        const deletedCollection = await Notification.deleteMany()
        res.status(200).json(deletedCollection)

    } catch (error) {
        next(createError(500, error.message))
    }
}
