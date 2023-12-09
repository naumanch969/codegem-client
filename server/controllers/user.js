import User from '../models/user.js'
import Code from '../models/code.js'
import { isUndefined, createError } from '../utils/functions.js'

export const getAllUsers = async (req, res, next) => {
    try {

        const users = await User.find()
        res.status(200).json(users)

    } catch (error) {
        next(createError(res,500, error.message))
    }
}
export const getUser = async (req, res, next) => {
    try {
        const { userId } = req.params
        const user = await User.findById(userId).populate('friends').populate('shares.from').populate('shares.code').exec()
        res.status(200).json(user)

    } catch (error) {
        next(createError(res,500, error.message))
    }
}
export const updateUser = async (req, res, next) => {
    try {

        const result = await User.findByIdAndUpdate(req.user.id, { $set: { ...req.body } }, { new: true })
        return res.status(200).json(result)
    }
    catch (error) {
        next(createError(res,500, error.message))
    }
}
export const deleteUser = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email })
        if (!user) return next(createError(res,'email not exist'))

        const result = await User.findByIdAndDelete(user._id)
        return res.status(200).json(result)
    }
    catch (error) {
        next(createError(res,500, error.message))
    }
}
export const deleteUserCollection = async (req, res, next) => {
    try {

        const result = await User.deleteMany()
        res.status(200).json(result)

    } catch (error) {
        next(createError(res,500, error.message))
    }
}



