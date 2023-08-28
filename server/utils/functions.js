import dotenv from 'dotenv'

dotenv.config()


export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const isUndefined = (data) => {
    return typeof (data) == 'undefined'
}

export const createError = (status, message) => {
    const error = new Error()
    error.message = message
    error.status = status
    return error
}