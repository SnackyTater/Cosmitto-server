const express = require('express')
const http = require('http')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

const port = process.env.PORT
console.log(process.env.ATLAS_URI)
//import loader
const expressLoader = require('#loader/express.js')
const mongooseLoader = require('#loader/mongoose.js')
const websocketLoader = require('#loader/socket.js')

//setup server
const app = expressLoader(express)
const server = http.createServer(app)
const wss = websocketLoader(server)
global.io = wss

server.listen(port, () => console.log("now running on port 5000"))
mongooseLoader(() => console.log("mongoose now online"))