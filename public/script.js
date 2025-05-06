const socket = io();
const msgInput = document.getElementById('msgInput');
const messagesDiv = document.getElementById('messages');
const typingStatus = document.getElementById('typingStatus');

function sendMessage() {
  const msg = msgInput.value;
  if (msg.trim() !== '') {
    socket.emit('chat message', msg);
    msgInput.value = '';
    typingStatus.innerText = '';
  }
}

socket.on('chat message', (msg) => {
  const p = document.createElement('p');
  p.innerText = msg;
  messagesDiv.appendChild(p);
});

msgInput.addEventListener('input', () => {
  socket.emit('typing', 'Someone is typing...');
});

socket.on('typing', (data) => {
  typingStatus.innerText = data;
  setTimeout(() => {
    typingStatus.innerText = '';
  }, 2000);
});
