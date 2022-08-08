import express from 'express'
import * as http from 'http'
import dotenv from 'dotenv'
import path from 'path'

//setup dotenv
const __dirname = process.cwd();
dotenv.config({
    path: path.resolve(__dirname, 'env/dev.env')
})

//import loader
import ExpressLoader from './loader/express.js'
import MongooseLoader from './loader/mongoose.js'
import WebSocketLoader from './loader/socket.js'

//setup server
const app = ExpressLoader(express);
const server = http.createServer(app);
const wss = WebSocketLoader(server);


server.listen(5000, () => console.log('now running on port 5000'));
MongooseLoader(() => console.log('mongoose now online'));