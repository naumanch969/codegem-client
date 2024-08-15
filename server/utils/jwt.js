import Token from "../models/token.js";
import jwt from 'jsonwebtoken'

export const createJWT = (payload, expire = 60 * 60 * 24) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expire });
    return token;
};

export const isValidToken = (token) => {
    if (token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return null;
        }
    }
    return null;
}

export const attachCookiesToResponse = (res, payload) => {
    const accessTokenJWT = createJWT(payload, 60 * 60 * 24 * 7);  // 1 week expiry 
    const oneWeek = 1000 * 60 * 60 * 24 * 7; // Access token Expire after one day 
    res.cookie('accessToken', accessTokenJWT, {
        httpOnly: true,
        //  secure: isProdEnv() ||  isDevEnv() ,
        secure: true,
        signed: true,
        expires: new Date(Date.now() + oneWeek),
        sameSite: 'None'
    });
};

export const getPayload = async (access_token, refresh_token) => {

    const payload = isValidToken(access_token);

    if (payload) {
        return payload.payload;
    }
    else {
        try {
            const payload = isValidToken(refresh_token);
            if (payload) {
                await Token.findOne(payload.payload.user).then(user => {
                    if (user.refresh_token === payload.payload.refreshToken) {
                        return [payload.payload, user];
                    }
                });
            }

            return null;
        } catch (error) {
            return null;
        }
    }
};