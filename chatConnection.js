const express = require('express');
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
    socket.on("chat message", ({ chatMessageUser, chatMessageText }) => {
        io.emit("chat message", { chatMessageUser, chatMessageText });
    });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Listen on *: ${PORT}`));