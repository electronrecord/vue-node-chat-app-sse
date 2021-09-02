const express = require('express')
const app = express()
const PORT = 3000
const json = express.json();
app.use(json);

let clients = [];

app.get('/events', function (request, response) {
  console.log('new client connected');
  const name = request.query.name
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);
  const clientId = Date.now();
  const data = `data: ${JSON.stringify({name})}\n\n`;
  response.write(data);
  const newClient = {
    id: clientId,
    name,
    response
  };
  clients.push(newClient);
  clients.forEach(client => {
    client.response.write(`data: ${JSON.stringify({clientCount: clients.length})}\n\n`)
  })
  request.on('close', function () {
    clients = clients.filter(client => client.id !== clientId);
    clients.forEach(client => {
      client.response.write(`data: ${JSON.stringify({remove: name, clientCount: clients.length})}\n\n`)
    })
  });
});

app.post('/send-msg', function ({body}, res) {
  clients.forEach(client => {
    client.response.write(`data: ${JSON.stringify({newMsg: body.msg, name: body.name})}\n\n`)
  })
  res.send('updated')
})

app.get('/status', (request, response) => response.json({clients: clients.length}));

const server = app.listen(PORT, function () {
  console.log(`server started at ${PORT}`)
})
