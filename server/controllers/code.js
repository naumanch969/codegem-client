import Code from "../models/code.js";
import { createError, isUndefined } from '../utils/functions.js'

export const getCodes = async (req, res, next) => {
    try {
        const result = await Code.find()
        res.status(200).json(result)
    } catch (error) {
        next(createError(500, error.message))
    }
}
export const getUserCodes = async (req, res, next) => {
    try {
        const result = await Code.find({ user: req?.userId })
        res.status(200).json(result)
    } catch (error) {
        next(createError(500, error.message))
    }
}

export const getLikedCodes = async (req, res, next) => {
    try {
        const result = await Code.find({ likes: { $in: [req.user._id] } })
        res.status(200).json(result)
    } catch (error) {
        next(createError(500, error.message))
    }
}
export const getSavedCodes = async (req, res, next) => {
    try {
        const result = await User.findById(req.user._id, { saved: 1, _id: 0 }).populate('saved');
        res.status(200).json(result)
    } catch (error) {
        next(createError(500, error.message))
    }
}
export const createCode = async (req, res, next) => {
    try {
        let { title, code, ...rest } = req.body
        if (isUndefined(title) || isUndefined(code)) return next(createError(400, 'Make sure to provide all the fields.'))

        const userId = req.user._id

        const result = await Code.create({ user: userId, title, code, ...rest })

        res.status(200).json(result)

    } catch (error) {
        next(createError(500, error.message))
    }
}

export const updateCode = async (req, res, next) => {
    try {
        const { codeId } = req.params

        const result = await Code.findByIdAndUpdate(codeId, { $set: req.body }, { new: true })

        res.status(200).json(result)

    } catch (error) {
        next(createError(500, error.message))
    }
}

export const likeCode = async (req, res, next) => {
    try {
        const { codeId } = req.params;

        const code = await Code.findById(codeId)
        if (!code) return next(createError(403, 'Code not exist.'))

        const result = await Code.findByIdAndUpdate(codeId, { $addToSet: { likes: req.user?._id } }, { new: true })
        res.status(200).json(result)
    } catch (error) {
        next(createError(500, error.message))
    }
}
export const dislikeCode = async (req, res, next) => {
    try {
        const { codeId } = req.params;

        const code = await Code.findById(codeId)
        if (!code) return next(createError(403, 'Code not exist.'))

        const result = await Code.findByIdAndUpdate(codeId, { $addToSet: { likes: req.user?._id } }, { new: true })
        res.status(200).json(result)
    } catch (error) {
        next(createError(500, error.message))
    }
}

export const commentCode = async (req, res, next) => {
    try {
        const { codeId } = req.params;
        const { value } = req.body;

        const code = await Code.findById(codeId)
        Code.comments.push(value)
        const result = await Code.findByIdAndUpdate(codeId, code, { new: true })
        res.status(200).json(result)
    } catch (error) {
        next(createError(500, error.message))
    }
}
export const deleteCode = async (req, res, next) => {
    try {
        let { codeId } = req.params

        const code = await Code.findById(codeId)
        if (!code) return next(createError(403, 'Code not exist'))

        const result = await Code.findByIdAndDelete(codeId)
        res.status(200).json(result)

    } catch (error) {
        next(createError(500, error.message))
    }
}

export const deleteCodeCollection = async (req, res, next) => {
    try {
        const result = await Code.deleteMany()
        res.status(200).json(result)
    } catch (error) {
        next(createError(500, error.message))
    }
}