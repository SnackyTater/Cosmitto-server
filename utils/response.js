export const createResponse = ({data = {}, message = "", code = 200}) => ({data, message, code})

export const createError = ({code = 400, message = "something has gone wrong", data = {}}) => {
    const err = new Error(message)
    err.code = code
    err.data = data
    throw err
}

export const extractError = err => ({
    message: err.message,
    code: err.code,
    data: err.data
})
