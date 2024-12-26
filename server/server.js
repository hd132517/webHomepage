const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
     cors: {
         origin: "http://localhost:3000", // 클라이언트의 주소
         methods: ["GET", "POST"],
     },
});

const users = new Set();

io.on("connection", (socket) => {
    socket.on("joinChat", (username) => {
        socket.username = username;
        users.add(username);
        io.emit("updateUsers", Array.from(users));
    });

    socket.on("joinRoom", ({ sender, receiver, room }) => {
        socket.join(room);
    });

    socket.on("sendMessage", (data) => {
        io.to(data.room).emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
        users.delete(socket.username);
        io.emit("updateUsers", Array.from(users));
    });
});

server.listen(3001, () => {
    console.log("Server running on port 3001");
});
