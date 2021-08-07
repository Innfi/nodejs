import express, { Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

app.get('/', (req: Request, res: Response) => {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	console.log('client connected');
	socket.on('chat message', (msg) => {
		io.emit('chat message', msg);
	});
	// console.log('connection received');
	// socket.send({
	// 	err: 'ok', 
	// 	msg: 'test message from server'
	// });
});

httpServer.listen(3000, () => {
	console.log('start listening');
});

