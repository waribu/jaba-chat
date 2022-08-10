const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// static folder setting
app.use(express.static(path.join(__dirname, "public")));

const botName = "JabaChat Bot";
// client connection listener
io.on("connection", (socket) => {
  // Welcome current User
  socket.emit("message", formatMessage(botName, "Welcome to Jaba Chat!"));

  // Brodcast when a user connects
  socket.broadcast.emit(
    "message",
    formatMessage(botName, "A user has joined the chat!")
  );

  socket.on("disconnect", () => {
    io.emit("message", formatMessage(botName, "User has left the chat!"));
  });

  // listen for chatMessage
  socket.on("chatMessage", (msg) => {
    io.emit("message", formatMessage("USER", msg));
  });
});

const PORT = 3030 || process.env.PORT;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
