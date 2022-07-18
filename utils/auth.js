import jwt from 'jsonwebtoken'

export const createToken = async (data) => await jwt.sign(data, process.env.JWT_SECRET)

export const verifyToken = async (data) => await jwt.verify