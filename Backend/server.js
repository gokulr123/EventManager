const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const dishRoutes= require('./routes/dishRoutes');

const app = express();
// app.use(cors({
//   origin: 'https://event-manager-phi-two.vercel.app', // ✅ your deployed frontend URL
//   credentials: true
// }));
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/dishes', dishRoutes)

// ---- 🧠 Setup socket.io server correctly ----
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'https://event-manager-phi-two.vercel.app', // You can also specify your frontend URL here
  //  origin:"*",
    methods: ['GET', 'POST']
  }
});

// Optional: store io object globally
app.set('io', io);

// Socket connection handler
io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  socket.on('join-event-room', (eventId) => {
    socket.join(eventId);
    console.log(`Socket ${socket.id} joined room ${eventId}`);
  });

  // Start random pick (optional trigger to show countdown on all clients)
  socket.on('start-random-pick', (data) => {
    const { eventId } = data;
    io.to(eventId).emit('random-pick-started');
  });
  socket.on("reset-random-pick", ({ eventId }) => {
    io.to(eventId).emit("reset-random-pick-ui");
  });
  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

// ---- 🧠 Start your server using `server.listen` instead of `app.listen`
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
})
.catch(err => console.log(err));
