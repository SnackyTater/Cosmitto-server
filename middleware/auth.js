import {createError} from "../utils/error.js"
import {verifyToken} from "../utils/auth.js"

export default async function (req, res, next) {
    try {
        //take token after Bearer token....
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) createError({message: "invalid token", code: 401})

        const data = verifyToken(token)
        if (!data) createError({message: "invalid token", code: 403})

        req.tokenInfo = data

        next()
    } catch (err) {
        next(err)
    }
}
