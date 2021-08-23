import ws from 'ws';
import http from 'http';
import { v4 } from 'uuid';


class ExWebSocket extends ws {
    public id: string;
    protected channels: Set<string>;

    public join(channel: string): void {
        if(this.channels.has(channel)) return;

        this.channels.add(channel);
    }

    public leave(channel: string): void {
        if(!this.channels.has(channel)) return;

        this.channels.delete(channel);
    }
};

class WsService {
    protected webServer: http.Server;
    protected wsServer: ws.Server;

    public constructor() {
        this.init();
        this.registerEvents();
    }

    protected init(): void {
        this.webServer = http.createServer();
        this.wsServer = new ws.Server({ 
            server: this.webServer,
            //clientTracking: true 
        });
    }

    protected registerEvents(): void {
        this.wsServer.on('connection', (socket: ExWebSocket) => {
            console.log('client connected');
            socket.id = v4();
            
            console.log(`new socket: ${socket.id}`);

            socket.on('message', (message: string) => {
                console.log(`received: ${message}`);
        
                socket.send(`reply: ${message}`);
            });

            socket.on('close', (closedSocket: ws) => {
                console.log(`connection closed`);
                console.log(`id: ${socket.id}`);
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