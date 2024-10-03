import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoutes.js'
import messageRoute from './routes/messageRoutes.js'
import {createServer} from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin: 'http://localhost:5173',
        methods:['GET', 'POST']
    }
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//routes
app.use('/api/v1/auth', userRoute)
app.use('/api/v1/message', messageRoute)

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Database Connection Successfully')
}).catch((e) => {
    console.log('Error While Connecting Database',e)
})

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

const userSocketMap = {};


io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    const userId = socket.handshake.query.userId
    if(userId !== undefined) {
        userSocketMap[userId] = socket.id;
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    })

});

server.listen(PORT, () => {
    console.log('Server Is Running On PORT',PORT)
})

export { app, server, io }