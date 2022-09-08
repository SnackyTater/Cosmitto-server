const { WebSocketServer } = require('ws')
const { verifyToken } = require('#utils/auth.js')
const { createError } = require('#utils/response.js')

module.exports = function (server) {
    const wss = new WebSocketServer({server})

    wss.rooms = {}

    wss.on("connection", (socket, req) => {
        try{
            const token = req.headers.authorization
            if(!token) createError({code: 1003, message: 'invalid token'})
            const {UID} = verifyToken(token)
            
            const join = room => {
                if (!wss.rooms[room]) wss.rooms[room] = {} //create room
                if (!wss.rooms[room][uuid]) wss.rooms[room][uuid] = socket
                socket.send("join room successfully")
            }

            const leave = room => {
                if (!wss.rooms[room][uuid]) return
                if (Object.keys(wss.rooms[room]).length === 1) delete wss.rooms[room]
                else delete wss.rooms[room][uuid]
            }

            socket.on("message", message => {
                const parseData = JSON.parse(message)
                const {action, data, room} = parseData

                if(room){
                    if (action === "join") join(room || UID)
                    if (action === "leave") leave(room)
                    if (action === "message") Object.entries(wss.rooms[room]).forEach(([, socket]) => socket.send(data))
                }
            })
        } catch (err) {
            socket.close(err.code || 1000, err.message)
        }
        
    })

    return wss
}
