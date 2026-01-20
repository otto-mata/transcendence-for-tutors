import { WebSocketServer } from 'ws';
import type WebSocket from 'ws';
import jwt from 'jsonwebtoken';
import * as z from "zod";

const server = new WebSocketServer({
  port: 8081
});

const users = new Map<number, Set<WebSocket>>(); // int userid : Set of socket linked to this userId
const sockets = new Map<WebSocket, number>(); // socket : userid
const watchers = new Map<number, Set<WebSocket>>(); // int userId: set of socket that watchs this userId

const secret: string = process.env.JWT_SECRET || "";

const authSchema = z.object({
  type: z.literal('auth'),
  token: z.jwt()
});

const watchSchema = z.object({
  type: z.literal('watch'),
  userId: z.coerce.number()
});

const messageSchema = z.discriminatedUnion('type', [
  authSchema,
  watchSchema
]);

const jwtSchema = z.object({
  userId: z.coerce.number()
});

const show_connections = () => {
  console.clear();
  console.log("Currents Connections\n\n");
  for (const i of users) {
    console.log(i[0], ": ", i[1].size, " Connected");
  }
  return;
}

const sendUpdate = (userId: number, status: string) => {
  const set = watchers.get(userId);
  if (!set)
    return;
  for (const i of set)
    i.send(JSON.stringify({ type: 'status', userId, status }));
};

server.on('connection', (socket) => {
  socket.on('message', (data) => {
    let msg;

    try {
      msg = messageSchema.parse(JSON.parse(data.toString()));
    } catch { return; }

    if (msg.type === 'auth') {
      const { token } = msg;
      let payload;
      let userId;
      try {
        payload = jwtSchema.parse(jwt.verify(token, secret));
        userId = payload.userId;
      } catch {
        return socket.send(JSON.stringify({ type: 'auth_err', error: 'Invalid token' }));
      }
      if (sockets.has(socket))
        return socket.send(JSON.stringify({ type: 'auth_err', error: 'Already logged in !' }));
      if (!users.has(userId))
        users.set(userId, new Set());
      users?.get(userId)?.add(socket);
      sockets.set(socket, userId);
      sendUpdate(userId, 'online');
      socket.send(JSON.stringify({ type: 'auth_ok' }));
    }
    if (msg.type === 'watch') {
      const { userId } = msg;
      if (!watchers.has(userId))
        watchers.set(userId, new Set());
      watchers?.get(userId)?.add(socket);
      const status = users.has(userId) ? 'online' : 'offline';
      socket.send(JSON.stringify({ type: 'status', userId, status }));
    }
    //show_connections();
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
