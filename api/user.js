import {Router} from "express"

import authMiddleware from "../middleware/auth.js"
import {createResponse} from "#utils/response.js"
import {
    likeUser,
    passUser,
    getRecommend,
    getMatches,
} from "#controller/matchMaking.js"

//setup router
const router = Router()

router.get("/recs", authMiddleware, async (req, res, next) => {
    try {
        const userList = await getRecommend(req.tokenInfo.UID)

        const response = createResponse({
            data: userList,
            message: "get user list successfully"
        })

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
})

router.post("/like", async (req, res, next) => {
    try {
        const userID = req.tokenInfo.UID
        const targetID = req.body.targetID

        const result = await likeUser(userID, targetID)

        const response = createResponse({
            message: `like ${result.fullname} successfully`,
            data: result
        })

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
})

router.post("/pass", authMiddleware, (req, res, next) => {
    try {
        const userID = req.tokenInfo.UID
        const targetID = req.body.targetID

        const result = await passUser(userID, targetID)

        const response = createResponse({
            message: `like ${result.fullname} successfully`,
            data: result
        })

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
})

router.get("/matches", authMiddleware, (req, res, next) => {
    try {
        const userID = req.token.UID

        const result = await getMatches(userID)

        const response = createResponse({
            message: 'get matches list successfully',
            data: result
        })

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
})

export default router
