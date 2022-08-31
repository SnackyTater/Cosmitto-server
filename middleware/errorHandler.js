module.exports = function (error, request, response, next) {
    const {message, code, data} = error
    response?.status(code || 500).json({message, data})
}
