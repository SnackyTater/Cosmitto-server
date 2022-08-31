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

router.post("/reset-password", async (req, res, next) => {
    try {
        const {action, payload} = req.body

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

router.post("/verify", async (req, res, next) => {
    try {
        const {identifier, type} = req.body

        const verifyStatus = await createAccount(identifier)

        if(verifyStatus){
            
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router
