import { io } from 'socket.io-client';

export const socketInit = (setSocketState, jwt) => {
  // init socket connection
  const socket = io('http://localhost:5000', {
    transports: ['websocket'],
    extraHeaders: { Authorization: `Bearer ${jwt}` },
    query: `token=${jwt}`,
  });
  socket
    .emit('authenticate', { token: jwt })
    .on('authenticated', function () {
      // console.log("authenticated")
      setIsAuthenticated(true);
    })
    .on('unauthorized', (msg) => {
      // console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
      setIsAuthenticated(false);
    });
  socket.on('connect_error', (err) => {
    if (err.message === 'no token provided' || err.message === 'jwt expired') setIsAuthenticated(false);
    // console.log(`connect_error due to ${err.message}`);
  });
  socket.on('disconnect', (reason) => {
    // the disconnection was initiated by the server, you need to reconnect manually
    if (reason === 'io server disconnect') socket.connect();
  });
  setSocketState(socket);
};
