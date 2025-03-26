const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins, change as needed
    }
});

app.get("/test", (req, res) => {
    res.send("i am ok")
})

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("message", (data) => {
        console.log("Message received:", data);
        console.log(data);
        io.emit("message", data); // Broadcast to all clients
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
