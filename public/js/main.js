const chatForm = document.getElementById("chat-form");
const chatMessage = document.querySelector(".chat-messages");

const socket = io();
//message from server
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  //Scroll down
  chatMessage.scrollTop = chatMessage.scrollHeight;
});

//message submission

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // get message text
  const msg = e.target.elements.msg.value;

  //emit message to server
  socket.emit("chatMessage", msg);

  //clear inputs after sending
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

//output message to DOM
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta"> ${message.username} <span> ${message.time} </span> </p>
  <p class="text">${message.text}</p>`;
  document.querySelector(".chat-messages").appendChild(div);
}
