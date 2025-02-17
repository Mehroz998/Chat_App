import express from 'express'
import {Server} from 'socket.io'
import http from 'http'

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
      origin: "https://severe-annabell-mehrozali-9d0db8b7.koyeb.app", // Tumhare frontend ka URL
      methods: ["GET", "POST"],
    },
});

export const getReceiverSocketId = (receiverId)=>{
    return userSocketMap[receiverId];
}

const userSocketMap = {}
io.on('connection',(socket) => {
    console.log('a user connected',socket.id);
    const userId = socket.handshake.query.userId
    if(userId !== undefined){
        userSocketMap[userId] = socket.id
    }

    io.emit('getOnlineUsers',Object.keys(userSocketMap))
    socket.on('disconnect',()=>{
        console.log('a user disconnected',socket.id);
        delete userSocketMap[userId]
        io.emit('getOnlineUsers',Object.keys(userSocketMap))
    })
    
})

export {io , server , app}