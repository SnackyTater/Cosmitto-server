const express = require('express')
const http = require('http')
const dotenv = require('dotenv')
const path = require('path')

//setup dotenv
dotenv.config({
    path: path.resolve(__dirname, "env/dev.env")
})

//import loader
const expressLoader = require('#loader/express.js')
const mongooseLoader = require('#loader/mongoose.js')
const websocketLoader = require('#loader/socket.js')

//setup server
const app = expressLoader(express)
const server = http.createServer(app)
const wss = websocketLoader(server)
global.io = wss

server.listen(5000, () => console.log("now running on port 5000"))
// MongooseLoader(() => console.log("mongoose now online"))