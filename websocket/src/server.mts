import { WebSocketServer } from 'ws';
import type WebSocket from 'ws';
import { handler, sendUpdate } from './messages.handler.mjs';

const server = new WebSocketServer({
  port: 8081
});

export const users = new Map<number, Set<WebSocket>>(); // int userid : Set of socket linked to this userId
export const sockets = new Map<WebSocket, number>(); // socket : userid
export const watchers = new Map<number, Set<WebSocket>>(); // int userId: set of socket that watchs this userId

const show_connections = () => {
  console.clear();
  console.log("Currents Connections\n\n");
  for (const i of users) {
    console.log(i[0], ": ", i[1].size, " Connected");
  }
  return;
}

server.on('connection', (socket) => {
  socket.on('message', (data) => {
    handler(socket, data);
  });

  socket.on('close', () => {
    const userId = sockets.get(socket);
    if (!userId)
      return;
    const curr_user = users.get(userId);
    if (!curr_user)
      return;
    curr_user.delete(socket);
    sockets.delete(socket);
    if (curr_user.size == 0) {
      users.delete(userId);
      sendUpdate(userId, 'offline');
    }
    for (const i of watchers) {
      if (i[1].has(socket))
        i[1].delete(socket);
      if (i[1].size == 0)
        watchers.delete(i[0]);
    }
    //show_connections()
  });
});

//show_connections();
