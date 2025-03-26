import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Change if your backend URL is different

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        // Listen for incoming messages
        socket.on("message", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect(); // Cleanup on unmount
        };
    }, []);

    const sendMessage = () => {
        if (input.trim()) {
            socket.emit("message", input);
            setInput(""); // Clear input after sending
        }
    };

    return (
        <div className="w-full h-96  bg-green-700 relative">
            <div>
                {messages.map((msg, index) => (
                    <p key={index} className="text-white">{msg}</p>
                ))}
            </div>
            <div className="flex items-center justify-between gap-2 absolute bottom-0 w-full p-2">
                <input
                    type="text"
                    className="w-full h-8 focus:outline-none bg-green-600 placeholder:text-white text-white px-2 py-1 rounded-md"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button className="bg-green-500 rounded-md text-white px-2 py-1" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
