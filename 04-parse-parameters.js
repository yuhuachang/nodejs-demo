const http = require('http');

const port = 3000;

const httpHandler = (request, response) => {
  console.log('http handler called');

  // split resource and parameters
  console.log('request.url = ' + request.url);
  const [filename, parameterString] = request.url.split('?')
  console.log('filename: ' + filename);
  console.log('parameterString: ' + parameterString);

  // parse parameters
  parameters = {};
  if (parameterString) {
    parameterList = parameterString.split('&');
    for (parameter of parameterList) {
      [key, value] = parameter.split('=');
      parameters[key] = value;
    }
  }
  console.log('parameters: ' + JSON.stringify(parameters));

  // build response
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write('<h1>Hello ' + parameters['name'] + '</h1>');
  response.end();

  console.log('http response sent');
};

const server = http.createServer(httpHandler);

const serverResponse = () => {
  console.log('Server listening on port ' + port);
};

server.listen(port, serverResponse);
