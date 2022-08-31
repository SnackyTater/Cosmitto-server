const jwt = require("jsonwebtoken") 
const {createError} = require("./error.js") 

const milisecondInOneDay = 1000 * 60 * 60 * 24

const createData = data => ({
    ...data,
    exp: Date.now() + milisecondInOneDay
})

const createToken = data => jwt.sign(createData(data), process.env.JWT_SECRET)

const verifyToken = token => {
    const {UID, AID, exp} = jwt.verify(token, process.env.JWT_SECRET)

    if (Date.now() > exp) createError({message: "token expired", code: 403})

    return {UID, AID}
}

module.exports = {
    createToken,
    verifyToken,
}