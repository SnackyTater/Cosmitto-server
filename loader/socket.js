import { WebSocketServer } from 'ws'

export default function (server) {
    const wss = new WebSocketServer({ server })

    wss.on('connection', socket => {
        socket.send('open');

        socket.on('message', message => {
            socket.send(message.toString())
        });

        socket.on('rtc', data => {
            socket.send(data.toString())
        })
    })

    return wss
}