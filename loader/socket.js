import {WebSocketServer} from "ws"

export default function (server) {
    const wss = new WebSocketServer({server})

    const rooms = {}

    wss.on("connection", (socket, req) => {
        const uuid = req.url
        socket.send("open")

        const join = room => {
            if (!rooms[room]) rooms[room] = {} //create room
            if (!rooms[room][uuid]) rooms[room][uuid] = socket
            socket.send("join room successfully")
        }

        const leave = room => {
            if (!rooms[room][uuid]) return
            if (Object.keys(rooms[room]).length === 1) delete rooms[room]
            else delete rooms[room][uuid]
        }

        socket.on("message", message => {
            const parseData = JSON.parse(message)
            const {action, data, room} = parseData

            if (action === "join") join(room)
            if (action === "leave") leave(room)
            if (action === "message")
                Object.entries(rooms[room]).forEach(([, socket]) =>
                    socket.send(data)
                )
        })
    })

    return wss
}
