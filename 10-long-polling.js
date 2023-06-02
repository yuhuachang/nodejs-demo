const http = require('http');
const fs = require('fs');

const port = 3000;

const httpHandler = (request, response) => {
 
  if (request.url.startsWith('/messages')) {
    const seq = request.url.substring(10);
    console.log(`received polling request with seq = ${seq}`);
    setTimeout(() => {
      const message = `Hello ${seq} - ${new Date()}`;
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(message);
      response.end();
      console.log(`response: ${message}`);
    }, 2000);
  } else {
    const data = fs.readFileSync('10-long-polling.html');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();
  }
};

const server = http.createServer(httpHandler);

const serverResponse = () => {
  console.log('Server listening on port ' + port);
};

server.listen(port, serverResponse);
