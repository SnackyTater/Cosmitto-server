import { Router } from 'express'
// import { createError } from '../utils'

import { create } from '../controller/sample.js'

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

router.post('/', async (req, res, next) => {
    try {
        const newSample = await create(req.body)

        return res.status(200).json(newSample)
    } catch (err) {
        next(err)
    }
})

export default router