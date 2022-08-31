const { WebSocketServer } = require('ws')

module.exports = function (server) {
    const wss = new WebSocketServer({server})

    wss.rooms = {}

    wss.on("connection", (socket, req) => {
        const uuid = req.url
        socket.send("open")
        global.socket = socket

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
                if (action === "join") join(room)
                if (action === "leave") leave(room)
                if (action === "message") Object.entries(wss.rooms[room]).forEach(([, socket]) => socket.send(data))
            }
        })
    })

    return wss
}
