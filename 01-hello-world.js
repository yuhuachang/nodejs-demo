const http = require('http');

const port = 3000;

const httpHandler = (request, response) => {
  console.log('http handler called');

  // analyze the request
  console.log(request.method);
  console.log(request.url);
  console.log(request.headers);

  // build the response
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write('<h1>Hello World</h1>')
  response.end();

  console.log('http response sent');
};

const server = http.createServer(httpHandler);

const serverResponse = () => {
  console.log('Server listening on port ' + port);
};

server.listen(port, serverResponse);
