const UserSchema = require('#model/user.js')
const { createError } = require('#utils/error.js')

const getUser = async (identifier) => {
    try {
        const result = await UserSchema.findById({ _id: identifier })

        if (result) return result

        createError({ message: 'not found', code: 404 })
    } catch (err) {
        createError({ message: err.message, code: err.code || 400, data: err.data })
    }
}

const updateUser = async (identifier, data) => {
    const session = await UserSchema.startSession()
    session.startTransaction();

    try {
        const result = await UserSchema.updateOne({ _id: identifier }, data)

        await session.commitTransaction()
        session.endSession()

        return result;
    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        createError({ message: err.message, code: 400 })
    }
}

module.exports = {
    getUser,
    updateUser,
}