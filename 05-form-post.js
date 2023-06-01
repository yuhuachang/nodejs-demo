const http = require('http');

const port = 3000;

const httpHandler = (request, response) => {
  console.log('http handler called');

  // analyze the request
  let { headers, method, url } = request;
  console.log(`headers: ${JSON.stringify(headers, null, 2)}`);
  console.log(`method: ${method}`);
  console.log(`url: ${url}`);

  // read request body
  request.on('data', (chunk) => {
    console.log(`chunk: ${chunk}`);
  }).on('end', () => {
    console.log('http request ended');
  }).on('error', (err) => {
    console.error(err);
  });

  console.log('build http response');

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write('<form method="post" action="/">');
  response.write('  <input type="text" name="input1">');
  response.write('  <input type="text" name="input2">');
  response.write('  <input type="submit">');
  response.write('</form>');
  response.end();

  console.log('http response sent');
};

const server = http.createServer(httpHandler);

const serverResponse = () => {
  console.log('Server listening on port ' + port);
};

server.listen(port, serverResponse);
