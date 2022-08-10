const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// static folder setting
app.use(express.static(path.join(__dirname, "public")));

// client connection listener
io.on("connection", (socket) => {
  // Welcome current User
  socket.emit("message", "Welcome to Jaba Chat!");
  // Brodcast when a user connects
  socket.broadcast.emit("message", "A user has joined the chat!");

  socket.on("disconnect", () => {
    io.emit("message", "User has left the chat!");
  });

  // listen for chatMessage 
  socket.on('chatMessage', msg => {
    io.emit('message', msg)
  })
});

const PORT = 3030 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
