export default function (error, request, response, next) {
    const { message, code, data } = error
    response?.status(code).json({ message, data })
}