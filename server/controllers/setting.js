import Setting from '../models/setting.js'
import { isUndefined, createError } from '../utils/functions.js'

export const getSettings = async (req, res, next) => {
    try {
        const userId = req.user._id
        const settings = await Setting.find({ user: userId })
        res.status(200).json(settings)

    } catch (error) {
        next(createError(500, error.message))
    }
}

export const deleteCollection = async (req, res, next) => {
    try {
        const deletedCollection = await Setting.deleteMany()
        res.status(200).json(deletedCollection)

    } catch (error) {
        next(createError(500, error.message))
    }
}
