import jwt from "jsonwebtoken"
import { createError } from "../utils/functions.js"

export const verifyToken = async (req, res, next) => {
    try {
        const token = await req.headers.authtoken
        if (!token) return res.status(400).json({ message: "You are unauthorized. Login first." })

        let decodedData = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedData

        next()
    } catch (error) {
        next(createError(500, 'Invalid token'))
    }
}