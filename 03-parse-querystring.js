const http = require('http');
const fs = require('fs');

const port = 3000;

const httpHandler = (request, response) => {
  console.log('http handler called');

  // analyze the request
  console.log('method = ' + request.method);
  console.log('url = ' + request.url);
  console.log('headers:', request.headers);

  // the root folder in the local file system
  const webroot = '.';
  console.log('webroot = ' + webroot);

  // set filename.  if not set, use the default file.  (usually index.html)
  let filename = undefined;
  if (request.url === '/') {
    filename = webroot + '/sample.html';
  } else {
    filename = webroot + request.url;
  }
  console.log('filename = ' + filename);

  // check existance of the file and return the file content.
  if (fs.existsSync(filename)) {
    const data = fs.readFileSync(filename);
    console.log('building response from file');
    console.log(data);

    if (filename.endsWith('.html') || filename.endsWith('.htm')) {
      response.writeHead(200, { 'Content-Type': 'text/html' });
    } else if (filename.endsWith('.css')) {
      response.writeHead(200, { 'Content-Type': 'text/css' });
    } else if (filename.endsWith('.js')) {
      response.writeHead(200, { 'Content-Type': 'text/javascript' });
    } else if (filename.endsWith('.png')) {
      response.writeHead(200, { 'Content-Type': 'image/png' });
    } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
      response.writeHead(200, { 'Content-Type': 'image/jpeg' });
    } else if (filename.endsWith('.gif')) {
      response.writeHead(200, { 'Content-Type': 'image/gif' });
    } else if (filename.endsWith('.ico')) {
      response.writeHead(200, { 'Content-Type': 'image/x-icon' });
    } else if (filename.endsWith('.json')) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
    } else if (filename.endsWith('.pdf')) {
      response.writeHead(200, { 'Content-Type': 'application/pdf' });
    } else if (filename.endsWith('.mp4')) {
      response.writeHead(200, { 'Content-Type': 'video/mp4' });
    } else if (filename.endsWith('.mp3')) {
      response.writeHead(200, { 'Content-Type': 'audio/mp3' });
    } else {
      response.writeHead(200, { 'Content-Type': 'text/plain' });
    }
    response.write(data);
    response.end();

    console.log('http 200 response sent');
  } else {
    console.log('building response');

    // show 404 error when file does not exist.
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.write('<h1>' + request.url + ' Not Found</h1>');
    response.end();

    console.log('http 404 response sent');
  }
};

const server = http.createServer(httpHandler);

const serverResponse = () => {
  console.log('Server listening on port ' + port);
};

server.listen(port, serverResponse);
