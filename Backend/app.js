const express = require("express");
const dotenv = require('dotenv');
const autobotsRoutes = require('./routes/autobotRoutes'); 
const { syncDatabase } = require('./config/db');
require('./services/cronService');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const { Autobot } = require('./models'); 

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:8080', // Allow your Vue.js app's origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST']
    }
});


app.use('/api', autobotsRoutes); 
// WebSocket setup
io.on('connection', (socket) => {
    console.log('A user connected');

    // Emit the Autobots count when a new client connects
    socket.on('getAutobotCount', async () => {
        try {
            const totalAutobots = await Autobot.count();
            socket.emit('autobotCount', { total: totalAutobots });
        } catch (error) {
            console.error('Error fetching Autobots count:', error);
        }
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

syncDatabase().then(() => {
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

module.exports = { io };