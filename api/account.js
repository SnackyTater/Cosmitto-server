import {Router} from "express"
import {createError} from "../utils/error.js"
import authMiddleware from "../middleware/auth.js"
import {createResponse} from "../utils/response.js"
import {createToken} from "../utils/auth.js"
import {
    createAccount,
    getAccount,
    updateAccount,
    deleteAccount,
    login
} from "../controller/account.js"

//setup router
const router = Router()

router.get("/", authMiddleware, async (req, res, next) => {
    try {
        const account = await getAccount(req.tokenInfo.AID)

        const response = createResponse({
            data: account,
            message: "get account successfully"
        })

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const result = await createAccount(req.body)

        const {account, user} = result

        const token = createToken({AID: account._id, UID: user._id})
        const response = createResponse({
            message: "account created successfully",
            data: token
        })

        res.status(200).json(response)
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

router.post("/login", async (req, res, next) => {
    try {
        const {identifier, password} = req.body

        const result = await login(identifier, password)

        const token = createToken(result)

        const response = createResponse({
            message: "login successfully",
            data: token
        })

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
})

export default router
