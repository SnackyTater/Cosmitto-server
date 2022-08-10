import {Router} from "express"
import {createError} from "../utils/error.js"
import authMiddleware from "../middleware/auth.js"
import {createAccount} from "../controller/account.js"

//setup router
const router = Router()

router.get("/", (req, res, next) => {
    try {
        console.log(io)
    } catch (err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const result = await createAccount(req.body)
        console.log("awdawdawd", result)
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
