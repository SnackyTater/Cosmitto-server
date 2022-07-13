export default function (error, request, response, next) {
    console.log('aaaaaa')
    const { message, code, data } = error
    response?.status(code).json({ message, data })
}