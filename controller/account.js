const AccountSchema = require("#model/account.js") 
const UserSchema = require("#model/user.js") 
const matchMakingSchema = require("#model/matchMaking.js") 
const {createError, extractMongooseError} = require("#utils/error.js") 
// const {} = require('#service/mail.js') 

const getAccount = async identifier => {
    try {
        const result = await AccountSchema.findById({_id: identifier})

        if (result) return result

        createError({message: "not found", code: 404})
    } catch (err) {
        createError({message: err.message, code: err.code || 400, data: err.data})
    }
}

const createAccount = async data => {
    const accountSession = await AccountSchema.startSession()
    const userSession = await UserSchema.startSession()
    const matchMakingSession = await matchMakingSchema.startSession()

    accountSession.startTransaction()
    userSession.startTransaction()
    matchMakingSession.startTransaction()

    try {
        const {user, account} = data

        const accountResult = await AccountSchema.create(account)

        user.account = accountResult._id
        const userResult = await UserSchema.create(user)

        const matchMakingResult = await matchMakingSchema.create({user: userResult._id, status: []})

        if (!accountResult || !userResult || !matchMakingResult)
            throw new Error("something has gone wrong")

        await accountSession.commitTransaction()
        await userSession.commitTransaction()
        await matchMakingSession.commitTransaction()

        accountSession.endSession()
        userSession.endSession()
        matchMakingSession.endSession()

        return {
            account: accountResult,
            user: userResult,
            matchMaking: matchMakingResult
        }
    } catch (err) {
        await accountSession.abortTransaction()
        await userSession.abortTransaction()
        await matchMakingSession.abortTransaction()

        accountSession.endSession()
        userSession.endSession()
        matchMakingSession.endSession()

        createError({message: err.message, code: 400, data: extractMongooseError(err)})
    }
}

const updateAccount = async (identifier, data) => {
    const session = await AccountSchema.startSession()
    session.startTransaction()

    try {
        const result = await AccountSchema.updateOne({_id: identifier}, data)

        await session.commitTransaction()
        session.endSession()

        return result
    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        createError({message: err.message, code: 400})
    }
}

const deleteAccount = async (accountIdentifier, userIdentifier) => {
    const accountSession = await AccountSchema.startSession()
    const userSession = await UserSchema.startSession()
    const matchMakingSession = await matchMakingSchema.startSession()
    accountSession.startTransaction()
    userSession.startTransaction()
    matchMakingSession.startTransaction()

    try {
        const accountResult = await AccountSchema.deleteOne({_id: accountIdentifier})
        const userResult = await UserSchema.deleteOne({_id: userIdentifier})
        const matchMakingResult = await matchMakingSchema.deleteOne({user: userIdentifier})

        if (accountResult && userResult && matchMakingResult) {
            await accountSession.commitTransaction()
            await userSession.commitTransaction()
            await matchMakingSession.commitTransaction()

            accountSession.endSession()
            userSession.endSession()
            matchMakingSession.endSession()

            return result
        }

        createError({message: "something has gone wrong", code: 500})
    } catch (err) {
        await accountSession.abortTransaction()
        await userSession.abortTransaction()
        await matchMakingSession.abortTransaction()

        accountSession.endSession()
        userSession.endSession()
        matchMakingSession.endSession()

        createError({message: err.message, code: 400})
    }
}

const login = async (identifier, password) => {
    try {
        const account = await AccountSchema.findOne({
            $or: [{email: identifier}, {mobile: identifier}]
        })

        if (!account) createError({message: "wrong account", code: 400})
        if (password !== account.password) createError({message: "wrong password", code: 400})

        const user = await UserSchema.findOne({account: account._id})

        if (!user) createError({message: "cant get user info", code: 500})

        return {
            UID: user._id,
            AID: account._id
        }
    } catch (err) {
        createError({message: err.message, code: err.code || 400, data: err.data})
    }
}

const resetPassword = async (identifier, password) => {
    const session = await AccountSchema.startSession()
    session.startTransaction()

    try {
        const result = await AccountSchema.updateOne({_id: identifier}, {password: password})

        await session.commitTransaction()
        session.endSession()

        return result
    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        createError({message: err.message, code: 400})
    }
}

const verifyAccount = async (identifier) => {
    try {
        const account = await AccountSchema.findOne({
            $or: [{email: identifier}, {mobile: identifier}]
        })

        if(!account) createError({message: "can't find any account with given info", code: 404})

        return true

    } catch (error) {
        createError({message: err.message, code: err.code || 400})
    }
}

module.exports = {
    getAccount,
    createAccount,
    updateAccount,
    deleteAccount,
    login,
    resetPassword,
    verifyAccount,
}