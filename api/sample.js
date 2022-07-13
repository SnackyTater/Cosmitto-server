import { Router } from 'express'
// import { createError } from '../utils'

//setup router
const router = Router();

const createError = ({ code = 400, message = 'something has gone wrong', data = {} }) => {
    const err = new Error(message);
    err.code = code;
    err.data = data;
    throw err
}

router.get('/home', (req, res, next) => {
    try {
        const message = 'error here, pls help'
        createError({ message })
    } catch (err) {
        console.log('aaaa')
        next(err);
    }
})

export default router