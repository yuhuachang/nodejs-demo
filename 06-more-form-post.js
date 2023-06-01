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
  response.write('  <h1>Input</h1>');
  response.write('  <div>');
  response.write('    <label>');
  response.write('      Text Input:');
  response.write('      <input type="text" name="textInput" value="input text">');
  response.write('    <//label>');
  response.write('  </div>');
  response.write('  <div>');
  response.write('    <label>');
  response.write('      Number Input:');
  response.write('      <input type="number" name="numberInput" value="123.456">');
  response.write('    <//label>');
  response.write('  </div>');
  response.write('  <div>');
  response.write('    <label>');
  response.write('      Password Input:');
  response.write('      <input type="password" name="passwordInput" value="passwd">');
  response.write('    <//label>');
  response.write('  </div>');

  response.write('  <h1>Date & Time</h1>');
  response.write('  <div>');
  response.write('    <label>');
  response.write('      Date Input:');
  response.write('      <input type="date" name="dateInput">');
  response.write('    <//label>');
  response.write('  </div>');
  response.write('  <div>');
  response.write('    <label>');
  response.write('      Time Input:');
  response.write('      <input type="time" name="timeInput">');
  response.write('    <//label>');
  response.write('  </div>');

  response.write('  <h1>File Chooser</h1>');
  response.write('  <div>');
  response.write('    <input type="file" name="fileInput">');
  response.write('  </div>');
  
  response.write('  <h1>Color Picker</h1>');
  response.write('  <div>');
  response.write('    <input type="color" name="colorInput">');
  response.write('  </div>');

  response.write('  <h1>Range</h1>');
  response.write('  <div>');
  response.write('    <label>');
  response.write('      Range:');
  response.write('      <input type="range" name="rangeInput">');
  response.write('    <//label>');
  response.write('  </div>');

  response.write('  <h1>Checkbox</h1>');
  response.write('  <div>');
  response.write('    <div><input type="checkbox" name="checkboxInput" value="chk1">Choose 1</div>');
  response.write('    <div><input type="checkbox" name="checkboxInput" value="chk2">Choose 2</div>');
  response.write('    <div><input type="checkbox" name="checkboxInput" value="chk3">Choose 3</div>');
  response.write('  </div>');

  response.write('  <h1>Radio Button</h1>');
  response.write('  <div>');
  response.write('    <div><input type="radio" name="radioInput" value="chk1">Choose 1</div>');
  response.write('    <div><input type="radio" name="radioInput" value="chk2">Choose 2</div>');
  response.write('    <div><input type="radio" name="radioInput" value="chk3">Choose 3</div>');
  response.write('  </div>');

  response.write('  <h1>Text Area</h1>');
  response.write('  <textarea name="textareaInput" cols="80" rows="10">Sample Data</textarea>');

  response.write('  <div>');
  response.write('    <input type="hidden" name="hiddenValue" value="hidden value">');
  response.write('    <input type="reset" value="Clear Data">');
  response.write('    <input type="submit" value="Send Data">');
  response.write('  </div>');
  response.write('</form>');
  response.end();

  console.log('http response sent');
};

const server = http.createServer(httpHandler);

const serverResponse = () => {
  console.log('Server listening on port ' + port);
};

server.listen(port, serverResponse);
