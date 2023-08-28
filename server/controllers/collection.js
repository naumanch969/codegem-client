import Collection from '../models/collection.js'
import { isUndefined, createError } from '../utils/functions.js'

export const getCollections = async (req, res, next) => {
    try {
        const userId = req.user._id
        const collections = await Collection.find({ user: userId })
        res.status(200).json(collections)

    } catch (error) {
        next(createError(500, error.message))
    }
}

export const deleteCollection = async (req, res, next) => {
    try {
        const deletedCollection = await Collection.deleteMany()
        res.status(200).json(deletedCollection)

    } catch (error) {
        next(createError(500, error.message))
    }
}
