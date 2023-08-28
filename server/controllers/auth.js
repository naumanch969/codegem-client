import User from '../models/user.js'
import { createError, isValidEmail } from '../utils/functions.js'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
    try {
        const { firstName, lastName, username, email, phone, password } = req.body
        if (!firstName || !lastName || !username || !email || !phone || !password) return next(createError(400, 'Make sure to provide all the fields'))
        if (!isValidEmail(email)) return next(400, 'Invalid Email Pattern')

        const isEmailAlreadyReg = await User.findOne({ email })
        if (isEmailAlreadyReg) return next(createError(400, 'Email already exist'))

        const isPhoneAlreadyReg = await User.findOne({ phone })
        if (isPhoneAlreadyReg) return next(createError(400, 'Phone already exist'))

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await User.create({ firstName, lastName, username, email, phone, password: hashedPassword })

        return res.status(200).json(newUser)
    }
    catch (error) {
        next(createError(500, error.message))
    }
}
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return next(createError(400, 'Make sure to provide all the fields'))
        if (!isValidEmail(email)) return next(createError(400, 'Invalid Email Pattern'))

        const existingUser = await User.findOne({ email })
        if (!existingUser) return next(createError(400, 'Wrong Email'))

        const plainPassword = password
        const hashedPassword = existingUser?.password
        const isPasswordCorrect = await bcrypt.compare(plainPassword, hashedPassword)
        if (!isPasswordCorrect) return next(createError(400, 'Wrong Password'))

        const token = jwt.sign({ email, password, _id: existingUser._id }, process.env.JWT_SECRET)

        res.status(200).json({ ...existingUser._doc, token })
    }
    catch (error) {
        next(createError(500, error.message))
    }
}