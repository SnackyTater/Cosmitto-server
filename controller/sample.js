import SampleSchema from '../model/sample.js'
import { createError } from '../utils/error.js'

export const create = async (data) => {
    const session = await SampleSchema.startSession()
    session.startTransaction();
    try {
        const result = await SampleSchema.create(data)
        console.log(result)
        await session.commitTransaction()
        session.endSession()

        return result;
    } catch (err) {
        await session.abortTransaction()
        session.endSession()
        createError({ message: err.message, code: 400 })
    }
}