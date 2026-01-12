import { WebSocketServer } from 'ws';

const server = new WebSocketServer({
	port: 8081
});

const users = new Map(); // int userid : Set de socket
const sockets = new Map(); // socket : userid
const watchers = new Map(); // watchs

const show_connections = () => {
	console.clear();
	console.log("Currents Connections\n\n");
	for (const i of users)
	{
		console.log(i[0] , ": " , i[1].size , " Connected");
	}
	return ;
}

const sendUpdate = (userId, status) => {
	const set = watchers.get(userId);
	if (!set)
		return ;
	for (const i of set)
		i.send(JSON.stringify({type: 'status', userId, status}));
};

server.on('connection', (socket) => {
	socket.on('message', (data) => {
		// socket.send('pong');
		let msg;

		try {
			msg = JSON.parse(data.toString());
		} catch {return ;}

		if (msg.type === 'auth') {
			const { userId } = msg;
			if (userId == undefined)
				return ;
			if (!users.has(userId))
				users.set(userId, new Set());
			users.get(userId).add(socket);
			sockets.set(socket, userId);
			sendUpdate(userId, 'online');
			socket.send(JSON.stringify( {type: 'auth_ok'} ));
		}
		if (msg.type === 'watch')
		{
			const { userId } = msg;
			if (userId == undefined)
				return ;
			if (!watchers.has(userId))
				watchers.set(userId, new Set());
			watchers.get(userId).add(socket);
		}
		show_connections();
	});

	socket.on('close', () => {
		const userId = sockets.get(socket);
		users.get(userId).delete(socket);
		sockets.delete(socket);
		if (users.get(userId).size == 0) {
			users.delete(userId);
			sendUpdate(userId, 'offline');
		}
		show_connections()
	});
});

show_connections();