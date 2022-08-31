const matchMakingSchema = require('../model/matchMaking.js') 
const userSchema = require('../model/user.js') 
const chatSchema = require('../model/chat.js') 
const { createError } = require('../utils/error.js') 
const { createResponse } = require('../utils/response.js') 
const { dobCalulate } = require('../utils/date.js') 

const getRecommend = async (userID) => {
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

const getMatches = async (userID) => {
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

const likeUser = async (user, target) => {
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

const unlikeUser = async (user, target) => {
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

const matchUser = async (user, target) => {
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

const unmatchUser = async (user, target) => {
    const session = await matchMakingSchema.startSession()
    session.startTransaction();

    try {
        const userStatus = await matchMakingSchema.updateOne({ user }, {
            $pop: {
                matchMaking: {
                    user: target,
                    status: 'matches'
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

const passUser = async (user, target) => {
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

const unpassUser = async (user, identifier) => {
    const session = await matchMakingSchema.startSession()
    session.startTransaction();

    try {
        const userStatus = await matchMakingSchema.updateOne({ user }, {
            $pop: {
                matchMaking: {
                    user: identifier,
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

module.exports = {
    getRecommend,
    getMatches,
    likeUser,
    unlikeUser,
    matchUser,
    unmatchUser,
    passUser,
    unpassUser,
}