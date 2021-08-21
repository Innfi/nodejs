import ws from 'ws';
import http from 'http';
import { v4 } from 'uuid';


class ExWebSocket extends ws {
    public id: string;

};

class WsService {
    protected webServer: http.Server;
    protected wsServer: ws.Server;
    protected socketIds: Set<string>;
    protected wsClients: ws.Server[] = [];

    public constructor() {
        this.init();
        this.registerEvents();
    }

    protected init(): void {
        this.webServer = http.createServer();
        this.wsServer = new ws.Server({ server: this.webServer });
        this.socketIds = new Set<string>();
    }

    protected registerEvents(): void {
        this.wsServer.on('connection', (socket: ws) => {
            console.log('client connected');
            const newSocketId: string = v4();
            if(this.socketIds.has(newSocketId)) {
                console.log('socketId duplicate. what to do?');
            }

            this.socketIds.add(newSocketId);
            //socket.id = newSocketId;
            
            console.log(`socket size: ${this.socketIds.size}`);
            console.log(`url: ${socket.url}`);
            //console.log(`new socket: ${socket.id}`);
            
            socket.on('message', (message: string) => {
                console.log(`received: ${message}`);
        
                socket.send(`reply: ${message}`);
            });

            socket.on('close', (socket: ws) => {
                console.log(`connection closed`);
                console.log(`client size: ${this.wsServer.clients.size}`);
            });            
        });
    }

    public startListen(): void {
        this.webServer.listen(3000, () => {
            console.log('start listening');
        });
    }
};


const wsService = new WsService();

wsService.startListen();