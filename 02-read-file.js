const http = require('http');
const fs = require('fs');

const port = 3000;

const httpHandler = (request, response) => {
  console.log('http handler called');

  // analyze the request
  console.log(request.method);
  console.log(request.url);
  console.log(request.headers);

  console.log('building response from file');
  const data = fs.readFileSync('sample.html');
  console.log(data);

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(data)
  response.end();

  console.log('http handler end');
};

const server = http.createServer(httpHandler);

const serverResponse = () => {
  console.log('Server listening on port ' + port);
};

server.listen(port, serverResponse);
