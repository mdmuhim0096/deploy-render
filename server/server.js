const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: "*", // Replace with your frontend URL
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

app.get('/', (req, res) => {
  res.send('Chat App Backend');
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on("send", data => {
    console.log("message",data)
    socket.emit("message", data);
  })
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Listen for new messages
  socket.on('message', (msg) => {
    console.log('Message received: ', msg);
    io.emit('message', msg);  // Emit the message to all clients
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
