import 'reflect-metadata'
import { Container, Service } from 'typedi';
import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';


type MsgHandlerDict = { [id: string]: Function };

@Service()
class SocketIoRunner {
	protected app: any 
	protected httpServer: http.Server;
	protected io: Server;
	protected port: number = 3000;
	protected handlerDict: MsgHandlerDict = {};
	protected socketIds: string[] = [];

	public constructor() {
		this.app = express();
		this.httpServer = http.createServer(this.app);
		this.io = new Server(this.httpServer);

		this.registerIndexPage();
	}

	protected registerIndexPage(): void {
		this.app.get('/', (req: Request, res: Response) => {
			res.sendFile(__dirname + '/index.html');
		});
	} 

	public registerConnected(): void {
		this.io.on('connection', (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) => {
			console.log('client connected');
			const keys: string[] = Object.keys(this.handlerDict);
			this.socketIds.push(socket.id);

			this.socketIds.forEach((value: string) => {
				console.log(`socketId: ${value}`);
			});

			for(const key of keys) {
				socket.on(key, (msg) => {
					const handler: Function = this.handlerDict[key];
					const result = handler.call(this, msg);
					console.log(`result: ${JSON.stringify(result)}`);

					//this.io.emit(result.keyType, result.msg);
					socket.emit(result.keyType, result.msg);
				});
			}
		});
	}

	public registerEvent(eventName: string, handler: Function): void {
		this.handlerDict[eventName] = handler;
	}

	public listen(): void {
		this.httpServer.listen(this.port, () => {
			console.log('start listening');
		});
	}
};

@Service()
class ChatMsgHandler {
	public static chatMsgKey: string = 'msgTypeChat';

	public constructor() {}

	public handleChatMsg(...args: any[]): any {
		const receivedMsg: string = args[0].text;

		return {
			err: 'ok',
			keyType: ChatMsgHandler.chatMsgKey,
			msg: receivedMsg
		};
	}
}

function registerTest(runner: SocketIoRunner): void {
	const chatHandler = Container.get(ChatMsgHandler);

	runner.registerEvent(ChatMsgHandler.chatMsgKey, chatHandler.handleChatMsg);	
}

const runner = Container.get(SocketIoRunner);

registerTest(runner);

runner.registerConnected();
runner.listen();

