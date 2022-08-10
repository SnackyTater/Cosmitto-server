import {Router} from "express"
import {createError} from "../utils/error.js"
import authMiddleware from "../middleware/auth.js"

//setup router
const router = Router()

router.get("/", (req, res, next) => {
    try {
        console.log(io)
    } catch (err) {
        next(err)
    }
})

router.post("/", authMiddleware, async (req, res, next) => {
    try {
        // const newSample = await create(req.body)
        // return res.status(200).json(newSample)
    } catch (err) {
        next(err)
    }
})

router.put("/", authMiddleware, (req, res, next) => {
    try {
    } catch (err) {
        next(err)
    }
})

router.delete("/", authMiddleware, (req, res, next) => {
    try {
    } catch (err) {
        next(err)
    }
})

export default router
