const http = require('http');
const fs = require('fs')

const port = 3000;

const httpHandler = (request, response) => {
  console.log('http handler called');

  // analyze the request
  let { headers, method, url } = request;
  console.log(`headers: ${JSON.stringify(headers, null, 2)}`);
  console.log(`method: ${method}`);
  console.log(`url: ${url}`);

  const data = [];
  request.on('data', (chunk) => {
    // continue appending request body
    console.log(`chunk: ${chunk}`);
    data.push(chunk);
  }).on('end', () => {
    console.log('http request ended');

    // parse request body
    let username = 'ryan';
    let score = 0;
    
    // parse request body and extract username and score
    const dataString = Buffer.concat(data).toString();
    const dataEntryArray = dataString.split('&');
    for (let i = 0; i < dataEntryArray.length; i++) {
      const [key, value] = dataEntryArray[i].split('=');
      if (key === 'username') {
        username = value;
      } else if (key === 'score') {
        score = parseInt(value);
      }
    }
    console.log(`username = ${username} score = ${score}`);

    // load score data from file
    let scoreData = undefined;
    const dataFile = 'data.json';
    if (fs.existsSync(dataFile)) {
      const fileData = fs.readFileSync(dataFile, 'utf8');
      console.log(`read file data ${fileData}`);
      scoreData = JSON.parse(fileData);
    } else {
      scoreData = {};
    }
    console.log(`scoreData = ${JSON.stringify(scoreData, null, 2)}`);

    // add new score to score data
    if (username !== undefined) {
      if (username in scoreData) {
        scoreData[username] += score;
      } else {
        scoreData[username] = score;
      }
      console.log(`scoreData (new) = ${JSON.stringify(scoreData, null, 2)}`);
    }

    // save score data to file
    fs.writeFileSync(dataFile, JSON.stringify(scoreData, null, 2));

    // compose and send response
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('<html>');
    response.write('<head>');
    response.write('  <style>');
    response.write('table { border-collapse:collapse; }');
    response.write('th, td { border: solid 1px; }');
    response.write('  </style>');
    response.write('</head>');
    response.write('<body>');
    response.write('<form method="post" action="/">');
    response.write('  <div>');
    response.write('    <label>');
    response.write('      Username:');
    response.write(`      <input type="text" name="username" value="${username}">`);
    response.write('    <//label>');
    response.write('    <label>');
    response.write('      Score:');
    response.write(`      <input type="number" name="score" value="${score}">`);
    response.write('    <//label>');
    response.write('    <input type="submit">');
    response.write('  </div>');
    response.write('</form>');
    response.write('<table>');
    response.write('  <tr>');
    response.write('    <th>username</th><th>score</th>');
    response.write('  </tr>');
    const keys = Object.keys(scoreData)
    for (let i = 0; i < keys.length; i++) {
      const username = keys[i];
      const score = scoreData[username];
      response.write('  <tr>');
      response.write(`    <td>${username}</td><td>${score}</td>`);
      response.write('  </tr>'); 
    }
    response.write('</table>');
    response.write('</body>');
    response.write('</html>');
    response.end();
  }).on('error', (err) => {
    // internal error
    console.error(err);

    response.writeHead(500, { 'Content-Type': 'text/html' });
    response.write('<h1>Internal Server Error</h1>');
    response.write(err);
    response.end();
  });
};

const server = http.createServer(httpHandler);

const serverResponse = () => {
  console.log('Server listening on port ' + port);
};

server.listen(port, serverResponse);
