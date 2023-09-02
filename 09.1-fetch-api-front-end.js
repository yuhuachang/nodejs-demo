const http = require('http');
const fs = require('fs');

const port = 3000;

const httpHandler = (_, response) => {

  const data = fs.readFileSync('09.1-fetch-api-front-end.html');
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(data)
  response.end();

  fetchData

  fetch('https://tcgmetro.blob.core.windows.net/stationnames/stations.json', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => {
    return res.json();
  }).then((json) => {
    console.log(`json = ${JSON.stringify(json, null, 2)}`);

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write('<!DOCTYPE html>');
    response.write('<html>');
    response.write('<head>');
    response.write('  <meta charset="UTF-8">');
    response.write('  <style>');
    response.write('table { border-collapse:collapse; }');
    response.write('th, td { border: solid 1px; }');
    response.write('  </style>');
    response.write('</head>');
    response.write('<body>');
    response.write('<table>');
    response.write('  <tr>');
    response.write('    <th>#</th>');
    response.write('    <th>Station</th>');
    response.write('    <th>Destination</th>');
    response.write('    <th>UpdateTime</th>');
    response.write('  </tr>');
    for (let i = 0; i < json.length; i++) {
      const { Station, Destination, UpdateTime } = json[i];

      const year = UpdateTime.substring(0, 4);
      const month = UpdateTime.substring(4, 6);
      const day = UpdateTime.substring(6, 8);
      const hour = UpdateTime.substring(8, 10);
      const minute = UpdateTime.substring(10, 12);
      const second = UpdateTime.substring(12, 14);
      const t = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

      response.write('  <tr>');
      response.write(`    <td>${i}</td>`);
      response.write(`    <td>${Station}</td>`);
      response.write(`    <td>${Destination}</td>`);
      response.write(`    <td>${t}</td>`);
      response.write('  </tr>'); 
    }
    response.write('</table>');
    response.write('</body>');
    response.write('</html>');
    response.end();
  }).catch((err) => {
    console.error(`err = ${err}`);

    response.writeHead(500, { 'Content-Type': 'text/html' });
    response.write('<html>');
    response.write('<body>');
    response.write('  <h1>Internal Error</h1>');
    response.write(`   <div>${err}</div>`);
    response.write('</body>');
    response.write('</html>');
    response.end();
  });
};

const server = http.createServer(httpHandler);

const serverResponse = () => {
  console.log('Server listening on port ' + port);
};

server.listen(port, serverResponse);
