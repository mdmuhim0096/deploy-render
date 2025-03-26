// socket.js or similar
import { io } from "socket.io-client";

const socket = io("https://server-r24b.onrender.com/");

socket.on("connect", () => {
  console.log("Connected to WebSocket server", socket.id);
});

export default socket;
