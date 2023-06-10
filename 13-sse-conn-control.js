const http = require('http');
const fs = require('fs');

const port = 3000;


// event id
let eventId = 0;

// event subscribers
const eventSubscriber = [];
setInterval(() => {
  if (eventSubscriber.length === 0) {
    return;
  }
  const message = `Hello - ${new Date()}`;
  console.log(`id: ${eventId} => ${message}`);
  
  // send message to all event subscribers
  eventSubscriber.forEach((response) => {
    // send event id in single line.
    response.write(`id: ${eventId++}\n`);

    // send event data starting with "data:" and end with an empty line.
    response.write(`data: ${message}\n\n`);
  });
}, 1000);

const httpHandler = (request, response) => {
 
  if (request.url === '/eventsource') {
    console.log("received client event source connection request. start responding...");

    // send response header with content type: event-stream
    response.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    // send event type in single line.
    response.write("event: myEvent\n");

    response.write("retry: 10\n");

    // add this session into event subscriber list.
    eventSubscriber.push(response);

  } else if (request.url === '/disconnect') {
    console.log("received client request to stop event source.");

    // send 404 to client to terminate the event source connection.  client side will see an error.
    // response.writeHead(404, { 'Content-Type': 'text/event-stream' });

    // send 200 with a different content type to client to terminate the event source connection.
    response.writeHead(200, { 'Content-Type': 'text/html' });

    response.end();

    // remove the client session.
    while (eventSubscriber.length > 0) {
      eventSubscriber.pop();
    }

  } else {
    const data = fs.readFileSync('13-sse-conn-control.html');
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
