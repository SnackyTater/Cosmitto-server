const {Router} = require("express") 

const authMiddleware = require("../middleware/auth.js") 
const {createResponse} = require("#utils/response.js") 
const {createToken} = require("#utils/auth.js") 
const {
    createAccount,
    getAccount,
    updateAccount,
    deleteAccount,
    login
} = require("#controller/account.js") 

//setup router
const router = Router()

router.get("/", async (req, res, next) => {
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

router.put("/",  (req, res, next) => {
    try {
    } catch (err) {
        next(err)
    }
})

router.delete("/", (req, res, next) => {
    try {
    } catch (err) {
        next(err)
    }
})

router.post("/login", async (req, res, next) => {
    try {
        const {identifier, password} = req.body
        console.log('aaaaaa')
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

router.get("/sock", async (req, res, next) => {
    try {
        console.log("io", io.rooms["a"]["/?id=1"])
        io.rooms["a"]["/?id=1"].send("aaaaaaaaaaa")
    } catch (err) {
        next(err)
    }
})

module.exports = router
