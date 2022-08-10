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

export const extractMongooseError = error => {
    if (error.code === 11000) {
        const {keyValue} = error
        const errorKey = Object.keys(keyValue)[0]
        return {
            [errorKey]: `${errorKey} has already been used`
        }
    }
    if (error.message.includes("required")) {
        const errorKey = error.message.split(":")[1].split(" ")[1]
        return {
            [errorKey]: `${errorKey} is required`
        }
    }
}
