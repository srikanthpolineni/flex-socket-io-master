const environment = process.env.ENVRONMENT || 'local';
require('dotenv').config({path: `.env.${environment}`});
const { createServer } = require('http');
const express = require('express');
const ws = require('ws');
const uniqid = require('uniqid');
const moment = require('moment');

const PORT = process.env.PORT | 8080;

const strDateTimeNow = () => moment().format('DD.MM.YYYY HH:mm:ss');

const app = express();
app.use(express.json({ extended: false }));
app.get("/health", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json({ "status": "UP" });
});
app.use('/api/*', (req, res, next) => {
    //TODO: Authentication check
    if(false) {
        res.send(401, 'Unauthorized');
    }
    next();
});
app.use("/api/servers", require("./routes/servers"));

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

    webSocket.on('error', function(err) {
        console.log(`[${strDateTimeNow()}] ${webSocket.id} disconnected due to error: ${err}`);
    });

    webSocket.on('close', function(err) {
        console.log(`[${strDateTimeNow()}] ${webSocket.id} connection closed`);
    });

});

webServer.listen(PORT, () => {
    console.info(`Express Server running on port: ${PORT}`);
});