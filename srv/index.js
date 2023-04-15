const express = require('express');
const bodyParser = require('body-parser');
const ws = require('ws');

const cors = require('cors');
const path = require('path');
const reqIp = require('request-ip');

const users = require('./api/users');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(reqIp.mw());

users.register(app);

app.use(cors);
app.use('/', express.static(path.join(__dirname, '..', 'horde-io-client', 'dist')));


const http = app.listen(3000);

const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', (socket, req) => {

    const ip = req.socket.remoteAddress;

    socket.on('message', (message) => console.log(message.toString()));

    setInterval(() => {

        wsServer.clients.forEach(c => {
            c.send(ip);
        })

    }, 100);

});




http.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
        wsServer.emit('connection', socket, request);
    });
});