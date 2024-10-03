import express from 'express';
import {createServer} from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();

const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin: 'http://localhost:5173',
        methods:['GET', 'POST']
    }
});

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

server.listen(8000, () => {
    console.log('Server Is Running On 9000',PORT)
})