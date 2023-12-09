import Code from "../models/code.js";
import Group from "../models/group.js";
import User from "../models/user.js";
import Collection from "../models/collection.js";
import { createError, isUndefined } from '../utils/functions.js'

export const getCodes = async (req, res, next) => {
    try {
        const result = await Code.find().sort({ createdAt: -1 }).populate('user').exec()
        res.status(200).json(result)
    } catch (error) {
        next(createError(res,500, error.message))
    }
}
export const getUserCodes = async (req, res, next) => {
    try {
        const { userId } = req.params
        const result = await Code.find({ user: userId }).populate('user').exec()
        res.status(200).json(result)
    } catch (error) {
        next(createError(res,500, error.message))
    }
}

export const getLikedCodes = async (req, res, next) => {
    try {
        const result = await Code.find({ likes: { $in: [req.user._id] } }).populate('user').exec()
        res.status(200).json(result)
    } catch (error) {
        next(createError(res,500, error.message))
    }
}
export const getSavedCodes = async (req, res, next) => {
    try {

        const result = await Collection.findOne({ name: 'Saved', owner: req.user._id }, { codes: 1, _id: 0 }).populate('codes').exec();
        res.status(200).json(result.codes)
    } catch (error) {
        next(createError(res,500, error.message))
    }
}
export const createCode = async (req, res, next) => {
    try {
        let { title, code, groupId, ...rest } = req.body
        if (isUndefined(title) || isUndefined(code)) return next(createError(res,400, 'Make sure to provide all the fields.'))

        const userId = req.user._id

        var result;
        if (groupId) {
            result = await Code.create({ user: userId, title, code, groups: groupId ? [groupId] : [], ...rest })
            await Group.findByIdAndUpdate(groupId, { $addToSet: { codes: result._id } }, { new: true })
        }
        else {
            result = await Code.create({ user: userId, title, code, groups: groupId ? [groupId] : [], ...rest })
        }



        res.status(200).json(result)

    } catch (error) {
        next(createError(res,500, error.message))
    }
}

export const updateCode = async (req, res, next) => {
    try {
        const { codeId } = req.params

        const result = await Code.findByIdAndUpdate(codeId, { $set: req.body }, { new: true })

        res.status(200).json(result)

    } catch (error) {
        next(createError(res,500, error.message))
    }
}

export const likeCode = async (req, res, next) => {
    try {
        const { codeId } = req.params;

        const code = await Code.findById(codeId)
        if (!code) return next(createError(res,403, 'Code not exist.'))

        const userHasLiked = code.likes.includes(req.user?._id);

        if (userHasLiked) {
            await Code.findByIdAndUpdate(codeId, { $pull: { likes: req.user?._id } }, { new: true })
            res.status(200).json({ message: 'Removed like successfully' });
        } else {
            await Code.findByIdAndUpdate(codeId, { $addToSet: { likes: req.user?._id } }, { new: true })
            res.status(200).json({ message: 'Liked successfully' });
        }
    } catch (error) {
        next(createError(res,500, error.message));
    }
}

export const shareCode = async (req, res, next) => {
    try {
        const { codeId } = req.params;
        let { shareWith } = req.body;

        // Validate that shareWith is an array of valid user IDs
        if (!Array.isArray(shareWith) || shareWith.some(userId => typeof userId !== 'string')) {
            return res.status(400).json({ error: 'Invalid shareWith format' });
        }

        const code = await Code.findById(codeId);
        if (!code) {
            return res.status(404).json({ error: 'Code not found' });
        }

        const usersForCode = shareWith.map(userId => ({ from: req.user._id, to: userId, sharedAt: Date.now() }));
        const codesForUser = shareWith.map(userId => ({ from: req.user._id, code: codeId, sharedAt: Date.now() }));


        // updating code, adding user to shares array
        await Promise.all(
            usersForCode.map(async (userObj) => {
                await Code.findByIdAndUpdate(codeId, { $push: { shares: userObj } }, { new: true });
            })
        );

        // updating user, adding code to shares array
        await Promise.all(
            codesForUser.map(async (codeObj) => {
                await User.findByIdAndUpdate(codeObj.from, { $addToSet: { shares: codeObj } }, { new: true });
            })
        );

        res.status(200).json({ message: 'Code shared successfully.' });
    } catch (error) {
        next(createError(res,500, error.message));
    }
};

export const shareCodeInGroups = async (req, res, next) => {
    try {
        const { codeId } = req.params;
        let { groupIds } = req.body;

        // Validate that shareWith is an array of valid user IDs
        if (!Array.isArray(groupIds) || groupIds.some(groupId => typeof groupId !== 'string')) {
            return res.status(400).json({ error: 'Invalid groupIds format' });
        }

        const code = await Code.findById(codeId);
        if (!code) {
            return res.status(404).json({ error: 'Code not found' });
        }

        const groupsForCode = groupIds.map(groupId => ({ from: req.user._id, group: groupId, sharedAt: Date.now() }));
        const codesForGroups = groupIds.map(groupId => ({ from: req.user._id, code: codeId, sharedAt: Date.now() }));


        // updating codes, adding groupId to groups array
        await Promise.all(
            groupsForCode.map(async (groupObj) => {
                await Code.findByIdAndUpdate(codeId, { $push: { groups: groupObj } }, { new: true });
            })
        );

        // updating groups, adding codeId to sharedCodes array
        await Promise.all(
            codesForGroups.map(async (codeObj, index) => {
                const updated = await Group.findByIdAndUpdate(groupIds[index], { $push: { sharedCodes: codeObj } }, { new: true });
                console.log('udpated', groupIds[index], updated)
            })
        );

        res.status(200).json({ message: 'Code shared successfully.' });
    } catch (error) {
        next(createError(res,500, error.message));
    }
};


export const saveCode = async (req, res, next) => {
    try {
        const { codeId } = req.params;

        const code = await Code.findById(codeId)
        if (!code) return next(createError(res,403, 'Code not exist.'))

        const findedCollection = await Collection.findOne({ name: 'Saved', owner: req.user._id })
        await Collection.findByIdAndUpdate(findedCollection._id, { $addToSet: { codes: codeId } }, { new: true });

        res.status(200).json({ message: 'Code saved successfully.' })


    } catch (error) {
        next(createError(res,500, error.message));
    }
}
export const saveCodeInCollections = async (req, res, next) => {
    try {
        const { codeId } = req.params;
        const { collections } = req.body

        const code = await Code.findById(codeId)
        if (!code) return next(createError(res,403, 'Code not exist.'))

        await Promise.all(
            collections.map(async (collectionId) =>
                await Collection.findByIdAndUpdate(collectionId, { $addToSet: { codes: codeId } })
            )
        )

        res.status(200).json({ message: 'Code saved in collections successfully.' })


    } catch (error) {
        next(createError(res,500, error.message));
    }
}

export const dislikeCode = async (req, res, next) => {
    try {
        const { codeId } = req.params;

        const code = await Code.findById(codeId)
        if (!code) return next(createError(res,403, 'Code not exist.'))

        const result = await Code.findByIdAndUpdate(codeId, { $addToSet: { likes: req.user?._id } }, { new: true })
        res.status(200).json(result)
    } catch (error) {
        next(createError(res,500, error.message))
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
        next(createError(res,500, error.message))
    }
}
export const deleteCode = async (req, res, next) => {
    try {
        let { codeId } = req.params

        const code = await Code.findById(codeId)
        if (!code) return next(createError(res,403, 'Code not exist'))

        const result = await Code.findByIdAndDelete(codeId)
        res.status(200).json(result)

    } catch (error) {
        next(createError(res,500, error.message))
    }
}

export const deleteCodeCollection = async (req, res, next) => {
    try {
        const result = await Code.deleteMany()
        res.status(200).json(result)
    } catch (error) {
        next(createError(res,500, error.message))
    }
}