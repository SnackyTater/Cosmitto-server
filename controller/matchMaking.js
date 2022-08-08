import matchMakingSchema from '../model/matchMaking.js'
import userSchema from '../model/user.js'
import chatSchema from '../model/chat.js'
import { createError } from '../utils/error.js'
import { createResponse } from '../utils/response.js'
import { dobCalulate } from '../utils/date.js'

export const getRecommend = async (userID) => {
    try {
        const userInfo = await userSchema.findById({ _id: userID })
        const userMatchMakingStatus = await matchMakingSchema.findOne({ user: userID })

        if (!userInfo || !userMatchMakingStatus) createError({ message: 'not found', code: 404 })

        const {
            location,
            interestedIn,
            ageFrom,
            ageTo,
            zoneLimit,
            isLimit,
        } = userInfo

        const lng = location.coordinates[0]
        const lat = location.coordinates[1]

        const excludeIDs = userMatchMakingStatus.status.map(user => user.user.toString())

        const recommendList = await userSchema.find({
            //find by gender
            $or: interestedIn === 'both' ? ([
                { 'gender': 'male' },
                { 'gender': 'female' },
                { 'gender': 'unmale' },
            ]) : ([
                { 'gender': interestedIn }
            ]),

            //exclude these ids
            "_id": {
                $nin: [...excludeIDs, userID]
            },

            //find by date of birth
            "dateOfBirth": {
                $lte: dobCalulate(ageFrom),
                $gte: dobCalulate(ageTo),
            },

            //find by location
            ...isLimit && {
                "location": {
                    $nearSphere: {
                        $geometry: {
                            type: "Point",
                            coordinates: [lng, lat]
                        },
                        $maxDistance: zoneLimit,
                    }
                }
            }
        })

        return createResponse({ data: recommendList })
    } catch (err) {
        createError({ message: err.message, code: err.code || 400, data: err.data })
    }
}

export const getMatches = async (userID) => {
    try {
        const userMatchMakingStatus = await matchMakingSchema.find({ user: userID })

        if (!userMatchMakingStatus) createError({ message: 'not found', code: 404 })

        const { status } = userMatchMakingStatus

        const userMatches = status.filter(user => user.status === 'match')

        return createResponse({ data: userMatches })
    } catch (err) {
        createError({ message: err.message, code: err.code || 400, data: err.data })
    }
}

export const likeUser = async (user, target) => {
    const session = await matchMakingSchema.startSession()
    session.startTransaction();

    try {
        const userStatus = await matchMakingSchema.updateOne({ user }, {
            $push: {
                matchMaking: {
                    user: target,
                    status: 'like'
                }
            }
        })

        const { n, nModified, ok } = userStatus

        if (n && nModified && ok) {
            await session.commitTransaction()
            session.endSession()

            return createResponse({ message: 'like user successfully' })
        }

        createError({ message: 'something gone wrong', code: 500 })

    } catch (err) {
        await session.abortTransaction()
        session.endSession()

        createError({ message: err.message, code: 400 })
    }
}

export const unlikeUser = async (user, target) => {
    const session = await matchMakingSchema.startSession()
    session.startTransaction();

    try {
        const userStatus = await matchMakingSchema.updateOne({ user }, {
            $pop: {
                matchMaking: {
                    user: target,
                    status: 'like'
                }
            }
        })

        const { n, nModified, ok } = userStatus

        if (n && nModified && ok) {
            await session.commitTransaction()
            session.endSession()

            return createResponse({ message: 'unlike user successfully' })
        }

        createError({ message: 'something gone wrong', code: 500 })
    } catch (err) {
        await session.abortTransaction()
        session.endSession()

        createError({ message: err.message, code: 400 })
    }
}

export const matchUser = async (user, target) => {
    const session = await matchMakingSchema.startSession()
    session.startTransaction();

    try {
        const userStatus = await matchMakingSchema.updateOne({ user }, {
            $pop: {
                matchMaking: {
                    user: target,
                    status: 'like'
                }
            }
        })

        const { n, nModified, ok } = userStatus

        if (n && nModified && ok) {
            await session.commitTransaction()
            session.endSession()

            return createResponse({ message: 'unlike user successfully' })
        }

        createError({ message: 'something gone wrong', code: 500 })
    } catch (err) {
        await session.abortTransaction()
        session.endSession()

        createError({ message: err.message, code: 400 })
    }
}

export const unmatchUser = async (identifier) => {
    try {
    } catch (err) {
        createError({ message: err.message, code: 400 })
    }
}

export const passUser = async (user, target) => {
    const session = await matchMakingSchema.startSession()
    session.startTransaction();

    try {
        const userStatus = await matchMakingSchema.updateOne({ user }, {
            $push: {
                matchMaking: {
                    user: target,
                    status: 'pass'
                }
            }
        })

        const { n, nModified, ok } = userStatus

        if (n && nModified && ok) {
            await session.commitTransaction()
            session.endSession()

            return createResponse({ message: 'pass user successfully' })
        }

        createError({ message: 'something gone wrong', code: 500 })
    } catch (err) {
        await session.abortTransaction()
        session.endSession()

        createError({ message: err.message, code: 400 })
    }
}

export const unpassUser = async (identifier) => {
    const session = await matchMakingSchema.startSession()
    session.startTransaction();

    try {
        const userStatus = await matchMakingSchema.updateOne({ user }, {
            $pop: {
                matchMaking: {
                    user: target,
                    status: 'pass'
                }
            }
        })

        const { n, nModified, ok } = userStatus

        if (n && nModified && ok) {
            await session.commitTransaction()
            session.endSession()

            return createResponse({ message: 'un-pass user successfully' })
        }

        createError({ message: 'something gone wrong', code: 500 })
    } catch (err) {
        await session.abortTransaction()
        session.endSession()

        createError({ message: err.message, code: 400 })
    }
}