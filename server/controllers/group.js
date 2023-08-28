import Group from '../models/group.js'
import { createError } from '../utils/functions.js'

export const getGroups = async (req, res, next) => {
    try {

        const groups = await Group.find()
        res.status(200).json(groups)

    } catch (error) {
        next(createError(500, error.message))
    }
}

export const getGroup = async (req, res, next) => {
    try {

        const { groupId } = req.params
        const group = await Group.findById(groupId)
        res.status(200).json(group)
 
    } catch (error) {
        next(createError(500, error.message))
    }
}
export const createGroup = async (req, res, next) => {
    try {
        const userId = req.user._id
        const { } = req.body

        const newGroup = await Group.create({ user: userId })
        res.status(200).json(newGroup)
 
    } catch (error) {
        next(createError(500, error.message))
    }
}
export const updateGroup = async (req, res, next) => {
    try {

        const { groupId } = req.params
        const updatedGroup = await Group.findByIdAndUpdate(groupId, { $set: req.body }, { new: true })
        res.status(200).json(updatedGroup)

    } catch (error) {
        next(createError(500, error.message))
    }
}
export const deleteGroup = async (req, res, next) => {
    try {

        const { groupId } = req.params
        const deletedGroup = await Group.delete(groupId)
        res.status(200).json(deletedGroup)

    } catch (error) {
        next(createError(500, error.message))
    }
}

export const deleteCollection = async (req, res, next) => {
    try {
        const deletedCollection = await Group.deleteMany()
        res.status(200).json(deletedCollection)

    } catch (error) {
        next(createError(500, error.message))
    }
}
