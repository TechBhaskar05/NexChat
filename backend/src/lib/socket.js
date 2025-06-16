import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"]
  },
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId]; // returns the socket ID for the given userId
}

// used to store online users
const userSocketMap = {}; // {userId: socketId} key-value pairs

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId; // assuming userId is sent as a query parameter
    if (userId) {
        userSocketMap[userId] = socket.id; // store the socket id for the user
        console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    } else {
        console.log("No userId provided in handshake query");
    }

    // io.emit is used to send events to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
        delete userSocketMap[userId]; // remove the user from the map
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
    
})

export {io, app, server};