const http = require('http');
const fs = require('fs');

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 7071 });


const port = 3000;


const httpHandler = (request, response) => {
 
  if (request.url === '/eventsource') {
    console.log("received client event source connection request. start responding...");

    // send response header with content type: event-stream
    response.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    // send event type in single line.
    response.write("event: myEvent\n");

    response.write("retry: 10\n");

  } else {
    const data = fs.readFileSync('13-sse-conn-control.html');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();
    console.log("response html page");

    
  }
};

const server = http.createServer(httpHandler);

const serverResponse = () => {
  console.log('Server listening on port ' + port);
};

server.listen(port, serverResponse);
