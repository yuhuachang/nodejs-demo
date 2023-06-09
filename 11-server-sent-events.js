const http = require('http');
const fs = require('fs');

const port = 3000;


// event subscribers
const eventSubscriber = [];
setInterval(() => {
  const message = `Hello - ${new Date()}`;
  console.log(`send message to ${eventSubscriber.length} client: ${message}`);
  
  // send message to all event subscribers
  eventSubscriber.forEach((response) => {
    // send event data starting with "data:" and end with an empty line.
    response.write(`data: ${message}\n\n`);
  });
}, 1000);

const httpHandler = (request, response) => {
 
  if (request.url === '/eventsource') {
    console.log("received client event source connection request. start responding...");

    // send response header with content type: event-stream
    response.writeHead(200, { 'Content-Type': 'text/event-stream' });

    // send event type in single line.
    response.write("event: myEvent\n");

    // add this session into event subscriber list.
    eventSubscriber.push(response);

    // do not close the response, continue sending event messages...
  } else {
    const data = fs.readFileSync('11-server-sent-events.html');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();
    console.log("response html page");
  }
};

const server = http.createServer(httpHandler);

const serverResponse = () => {
  console.log('Server listening on port ' + port);
};

server.listen(port, serverResponse);
