const {Router} = require("express") 

const authMiddleware = require("../middleware/auth.js") 
const {createResponse, createError} = require("#utils/response.js") 
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

router.get("/error", async (req, res, next) => {
    try {
        count++
        if(count%2 === 0) createError({code: 400, message: 'ahihi'})

        const response = createResponse({code: 200, data: {a: 'succuess'}, message: 'success'})

        res.status(200).json(response)
    } catch (err) {
        next(err)
    }
})

router.get('/success', async(req, res, next) => {
    try {
        const response = createResponse({data: {a: 'b'}, message: 'hello'})
        res.status(200).json(response)

        createError({code: 400, message: 'ahihi'})
    } catch (err) {
        next(err)
    }
})

module.exports = router
