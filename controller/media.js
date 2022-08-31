const AccountSchema = require('#model/account.js')
const UserSchema = require('#model/user.js')
const matchMakingSchema = require('#model/matchMaking.js')
const { createResponse, createError } = require('#utils/response.js')

const saveImage = async (identifier, imageInfo) => {
    const userSession = await UserSchema.startSession()

    userSession.startTransaction();

    try {
        const { publicID, url } = imageInfo

        const userResult = await UserSchema.updateOne({
            _id: identifier
        }, {
            $push: {
                galleries: {
                    imageID: publicID,
                    url: url,
                }
            } 
        })

        if(!userResult) throw new Error('fail to save image')

        await userSession.commitTransaction()
        userSession.endSession()
        return createResponse({message: 'save image successfully'})

    } catch (err) {
        await userSession.abortTransaction()

        userSession.endSession()

        createError({ message: err.message, code: 400 })
    }
}

const deleteImage = async (data) => {
    const accountSession = await AccountSchema.startSession()
    const userSession = await UserSchema.startSession()
    const matchMakingSession = await matchMakingSchema.startSession()

    accountSession.startTransaction();
    userSession.startTransaction();
    matchMakingSession.startTransaction();

    try {
        const { user, account } = data

        const accountResult = await AccountSchema.create(account)

        user.account = accountResult._id
        const userResult = await UserSchema.create(user)

        const matchMakingResult = await matchMakingSchema.create({ user: userResult._id, status: [] })

        await accountSession.commitTransaction()
        await userSession.commitTransaction()
        await matchMakingSession.commitTransaction()

        accountSession.endSession()
        userSession.endSession()
        matchMakingSession.endSession()

        return {
            account: accountResult,
            user: userResult,
            matchMaking: matchMakingResult,
        }

    } catch (err) {
        await accountSession.abortTransaction()
        await userSession.abortTransaction()
        await matchMakingSession.abortTransaction()

        accountSession.endSession()
        userSession.endSession()
        matchMakingSession.endSession()

        createError({ message: err.message, code: 400 })
    }
}

module.exports = {
    saveImage,
    deleteImage,
}