import ws from 'ws';
import http from 'http';


const webServer: http.Server = http.createServer();

const wsServer = new ws.Server({ server: webServer });
wsServer.on('connection', (socket: ws) => {
    console.log('client connected');

    socket.on('message', (message: string) => {
        console.log(`received: ${message}`);

        socket.send(`reply: ${message}`);
    });
});


webServer.listen(3000, () => {
    console.log('start listening');
});