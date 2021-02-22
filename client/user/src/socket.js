import io from 'socket.io-client';

let socket;
const room = "lobby"

export const initiateSocket = (userName) => {
  socket = io('http://localhost:8080');
  console.log(`Connecting socket...`);
  if (socket) socket.emit('join', { user: userName, room });
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if (socket) socket.disconnect();
}

export const subscribeToChat = (callBack) => {
  if (!socket) return (true);
  socket.on('new message', msg => {
    console.log(`message: ${msg}`);
    return callBack(null, msg);
  });
}

export const sendMessage = (userName, message) => {
  if (socket) socket.emit('message', { user: userName, message, room });
}
