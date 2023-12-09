import Collection from '../models/collection.js'
import { createError } from '../utils/functions.js'

export const getCollections = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const collections = await Collection.find({ owner: { $ne: userId } }).populate('codes').populate('owner').exec();

        res.status(200).json(collections);
    } catch (error) {
        next(createError(res,500, error.message));
    }
};

export const getUserCollections = async (req, res, next) => {
    try {
        const { userId } = req.params;

        // Check if the user has a collection named "Saved"
        const savedCollection = await Collection.findOne({ owner: userId, name: 'Saved' });

        // If "Saved" collection doesn't exist, create it
        if (!savedCollection) {
            const newSavedCollection = new Collection({ name: 'Saved', description: 'The collection of your saved codes.', owner: userId, });
            await newSavedCollection.save();
        }

        const collections = await Collection.find({ owner: userId }).populate('codes').populate('owner').exec();

        res.status(200).json(collections);
    } catch (error) {
        next(createError(res,500, error.message));
    }
};

export const getCollection = async (req, res, next) => {
    try {
        const { collectionId } = req.params
        const collection = await Collection.findById(collectionId).populate('codes').populate('owner').exec();
        res.status(200).json(collection)

    } catch (error) {
        next(createError(res,500, error.message))
    }
}

export const createCollections = async (req, res, next) => {
    try {

        console.log({ ...req.body, owner: req?.user?._id })
        const collections = await Collection.create({ ...req.body, owner: req?.user?._id })
        res.status(200).json(collections)

    } catch (error) {
        next(createError(res,500, error.message))
    }
}

export const updateCollections = async (req, res, next) => {
    try {
        const { collectionId } = req.params
        const collections = await Collection.findByIdAndUpdate(collectionId, { $set: { ...req.body } }, { new: true })
        res.status(200).json(collections)

    } catch (error) {
        next(createError(res,500, error.message))
    }
}

export const deleteCollection = async (req, res, next) => {
    try {
        const { collectionId } = req.params

        const deletedCollection = await Collection.findByIdAndDelete(collectionId)
        res.status(200).json(deletedCollection)

    } catch (error) {
        next(createError(res,500, error.message))
    }
}

export const deleteWholeCollection = async (req, res, next) => {
    try {
        const deletedCollection = await Collection.deleteMany()
        res.status(200).json(deletedCollection)
    } catch (error) {
        next(createError(res,500, error.message))
    }
}
