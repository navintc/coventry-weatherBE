const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const apiRoutes = require('./routes/WeatherRoutes');
const { connectToDb } = require('./database/Database');
const Redis = require('ioredis');

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PW,
});

const app = express();
const PORT = 3001;
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Adjust this to match front-end URL for security
        methods: ["GET", "POST"]
    }
});

async function emitAllData(socket) {
    try {
      const keys = await redis.keys('*');
      console.log(`Redis keys: ${keys}`); // To check if keys are fetched correctly
  
      const values = await Promise.all(keys.map(key => redis.get(key)));
      console.log(`Redis values: ${values}`); // To check if values are fetched correctly
  
      const allData = values.map(value => JSON.parse(value));
      socket.emit('weather data', allData); // Emit to the specific socket
    } catch (error) {
      console.error('Error fetching data from Redis:', error);
      socket.emit('error', 'Failed to fetch initial data');
    }
  }

io.on('connection', (socket) => {
    console.log('a user connected');
    
    // Emit all data from Redis to the newly connected client
    emitAllData(socket);
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

app.use(express.json());
app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use('/api', apiRoutes);

app.use((request, response) => {
    response.status(404).json({ message: "404: Not found" });
});

app.get('/', (request, response) => {
    response.status(200).json({ message: "200: Success" });
});

server.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    await connectToDb();
});

