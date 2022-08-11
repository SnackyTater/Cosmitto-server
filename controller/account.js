import AccountSchema from "../model/account.js"
import UserSchema from "../model/user.js"
import matchMakingSchema from "../model/matchMaking.js"
import {createError, extractMongooseError} from "../utils/error.js"

export const getAccount = async identifier => {
    try {
        console.log("awdawdawd", identifier)
        const result = await AccountSchema.findById({_id: identifier})

        if (result) return result

        createError({message: "not found", code: 404})
    } catch (err) {
        createError({message: err.message, code: err.code || 400, data: err.data})
    }
}

export const createAccount = async data => {
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

export const updateAccount = async (identifier, data) => {
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

export const deleteAccount = async identifier => {
    const accountSession = await AccountSchema.startSession()
    const userSession = await UserSchema.startSession()
    accountSession.startTransaction()
    userSession.startTransaction()

    // try {
    //     const accountresult = await AccountSchema.deleteOne({ _id: identifier })

    //         await session.commitTransaction()
    //     session.endSession()

    //     return result;
    // } catch (err) {
    //     await session.abortTransaction()
    //     session.endSession()
    //     createError({ message: err.message, code: 400 })
    // }
}

export const login = async (identifier, password) => {
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
