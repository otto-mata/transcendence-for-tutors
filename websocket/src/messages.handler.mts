import { sockets, users, watchers } from './server.mjs';
import { messageSchema, jwtSchema } from './messages.type.mjs';
import type WebSocket from 'ws';
import jwt from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET || "4X1fdYDG8LGBURWxT042Jqr9XZqKP4F4JqbVE+moI5Ly3iU/wCUQbS8ei3KRcG0XQtrO0gngbrCitl35R9ERrw==";

export const sendUpdate = (userId: string, status: string) => {
  const set = watchers.get(userId);
  if (!set)
    return;
  for (const i of set)
    i.send(JSON.stringify({ type: 'status', userId, status }));
};

export const handler = (socket: WebSocket, data: WebSocket.RawData) => {
    let msg;

    try {
      msg = JSON.parse(data.toString());
    } catch { return; }

    if (msg.type === 'auth') {
      const token  = msg.token;
      let payload;
      let userId;
      try {
        payload = jwtSchema.parse(jwt.verify(token, secret));
        userId = payload.id;
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
      const {id } = msg;
      if (!watchers.has(id))
        watchers.set(id, new Set());
      watchers?.get(id)?.add(socket);
      const status = users.has(id) ? 'online' : 'offline';
      socket.send(JSON.stringify({ type: 'status', id, status }));
    }
    if (msg.type === 'message') {
      const { id, message } = msg;
      console.log("this is message :", msg, id, ": and this data :", data.toString());
      if (!sockets.has(socket))
        return (socket.send(JSON.stringify({ type: 'mess_err', error: 'Not logged in !' })));
      for (let i of users.get(id) ?? []) {
        i.send(JSON.stringify({ type: 'rec_message', from: id, message: message }));
      }
      socket.send(JSON.stringify({ type: 'rec_message', from: sockets.get(socket), message: message }));
      socket.send(JSON.stringify({ type: 'mess_ok' }));
    }
    //show_connections(); 
};
