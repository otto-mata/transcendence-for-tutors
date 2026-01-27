import { sockets, users, watchers } from './server.mjs';
import { messageSchema, jwtSchema } from './messages.type.mjs';
import type WebSocket from 'ws';
import jwt from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET || "";


export const sendUpdate = (userId: number, status: string) => {
  const set = watchers.get(userId);
  if (!set)
    return;
  for (const i of set)
    i.send(JSON.stringify({ type: 'status', userId, status }));
};

export const handler = (socket: WebSocket, data: WebSocket.RawData) => {
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
    if (msg.type === 'message') {
      const { userId, message } = msg;
      if (!sockets.has(socket))
        return (socket.send(JSON.stringify({ type: 'mess_err', error: 'Not logged in !' })));
      for (let i of users.get(userId) ?? []) {
        i.send(JSON.stringify({ type: 'rec_message', from: userId, message: message }));
      }
      socket.send(JSON.stringify({ type: 'mess_ok' }));
    }
    //show_connections(); 
};
