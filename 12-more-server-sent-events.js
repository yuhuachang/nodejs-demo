const http = require('http');
const fs = require('fs');

const port = 3000;


// event subscribers
const eventSubscriber = [];

setInterval(() => {
  const dogMsg = `Bark - ${new Date()}`;
  console.log(`send message to ${eventSubscriber.length} clients: ${dogMsg}`);
  eventSubscriber.forEach((response) => {
    response.write("event: dogEvent\n");
    response.write(`data: ${dogMsg}\n\n`);
  });
}, 700);

setInterval(() => {
  console.log(`send message to ${eventSubscriber.length} clients: Meow!`);
  eventSubscriber.forEach((response) => {
    response.write("event: catEvent\n");
    response.write(`data: Meow!\n`); // part1
    response.write(`data: ${new Date()}\n`); // part2
    response.write("\n"); // end of data
  });
}, 1300);

const httpHandler = (request, response) => {
 
  if (request.url === '/eventsource') {
    console.log("received client event source connection request. start responding...");

    // send response header with content type: event-stream
    response.writeHead(200, { 'Content-Type': 'text/event-stream' });

    // add this session into event subscriber list.
    eventSubscriber.push(response);

  } else if (request.url === '/unsubscribe') {
    console.log("received client unsubscribe request. remove it");

  } else {
    const data = fs.readFileSync('12-more-server-sent-events.html');
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
