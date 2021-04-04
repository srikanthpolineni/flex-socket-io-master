const environment = process.env.ENVRONMENT || 'local';
require('dotenv').config({ path: `.env.${environment}` });
const { createServer } = require('http');
const express = require('express');
const ws = require('ws');
var path = require('path');
const uniqid = require('uniqid');
const moment = require('moment');

const PORT = process.env.PORT | 8080;

const strDateTimeNow = () => moment().format('DD.MM.YYYY HH:mm:ss');

const app = express();

const options = {
    index: "index.html"
};

app.use(express.json({ extended: false }));
app.get("/health", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json({ "status": "UP" });
});
app.use(express.static('public', options));
app.use('/api/*', (req, res, next) => {
    //TODO: Authentication check
    if (false) {
        res.send(401, 'Unauthorized');
    }
    next();
});
app.use("/api/servers", require("./routes/servers"));

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500);

    // respond with html page
    if (req.accepts('html')) {
        res.sendFile(__dirname + '/500.html');
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.json({ error: 'Internal Server Error' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Internal Server Error');
})

app.use(function (req, res, next) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.sendFile(__dirname + '/404.html');
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.json({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

const webServer = createServer(app);


const webSocketServer = new ws.Server({ server: webServer });
webSocketServer.on("connection", (webSocket) => {

    webSocket.id = uniqid('Server-');
    //req.headers['x-forwarded-for'] || req.connection.remoteAddress
    console.log(`[${strDateTimeNow()}] ${webSocket.id} connected from ${webSocket._socket.remoteAddress}:${webSocket._socket.remotePort}`);

    app.locals.servers = webSocketServer.clients;

    webSocket.on('message', (message) => {
        console.log(`[${strDateTimeNow()}] message from [${webSocket.id}]: `, message.toString());
    });

    webSocket.on('error', function (err) {
        console.log(`[${strDateTimeNow()}] ${webSocket.id} disconnected due to error: ${err}`);
    });

    webSocket.on('close', function (err) {
        console.log(`[${strDateTimeNow()}] ${webSocket.id} connection closed`);
    });

});

webServer.listen(PORT, () => {
    console.info(`Express Server running on port: ${PORT}`);
});