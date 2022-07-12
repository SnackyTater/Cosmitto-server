export default function (error = { message: '', code: 400, data: {} }, request, response, next) {
    const { message, code, data } = error
    response?.code(code).json({ message, data })
}