var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({ port: 3000 });

wss.on("connection", function(ws) {  
  ws.on("message", function(message) {
    console.log("Received: %s", message);
    ws.send("Hello! I am a server.");
  });

  ws.on("connection", (socket) => {
    ws.socket.broadcast.emit('testev', 'hello!');
  });
});
