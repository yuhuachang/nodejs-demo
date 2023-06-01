const http = require('http');

const port = 3000;

const aaa = ms => {
  return new Promise(resolve => {
    return setTimeout(resolve, ms);
  });
};

const requestHandler = async request => {
  return new Promise((resolve, reject) => {
    const data = [];
    request.on('data', (chunk) => {

      console.log(`3. chunk: ${chunk}`);
      data.push(chunk);

    }).on('end', () => {
      console.log('4. http request ended');

      try {
        body = Buffer.concat(data).toString();
        console.log(`5. body: ${body}`);
        resolve(body);
      } catch(e) {
        console.error(e);
        reject(e);
      }
    }).on('error', (err) => {
      console.error(err);
      reject(err);
    });
  });
}

const httpHandler = async (request, response) => {
  console.log('1. http handler called');

  console.log('2. read request body');
  const body = await requestHandler(request);
  console.log(`6. async function ended. body = {body}`);

  const data = {};
  body.split('&').forEach(pair => {
    const [key, value] = pair.split('=');
    data[key] = value;
    console.log(`   key: ${key}, value: ${value}`);
  });

  console.log('7. build http response');

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write('<form method="post" action="/">');
  response.write(`  <input type="text" name="input1" value="${data['input1'] ? data['input1'] : 'aaa'}">`);
  response.write(`  <input type="text" name="input2" value="${data['input2'] ? data['input2'] : 'bbb'}">`);
  response.write('  <input type="submit">');
  response.write('</form>');
  response.end();

  console.log('8. http response sent');
  console.log('--------------------------------');
};

const server = http.createServer(httpHandler);

const serverResponse = () => {
  console.log('Server listening on port ' + port);
};

server.listen(port, serverResponse);
