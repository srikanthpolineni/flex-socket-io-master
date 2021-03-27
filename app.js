const net = require('net');
const uniqid = require('uniqid');
const moment = require('moment');

const PORT = 8080;
const IP = '127.0.0.1';

const activeClients = {};


const strDateTimeNow = () => moment().format('DD.MM.YYYY HH:mm:ss');

const server = net.createServer((clientSocket) => {

    /* Triggered when the client first connects to server */
    const uniqueClientId = uniqid('Client-');
    activeClients[uniqueClientId] = true;

    console.log(`[${strDateTimeNow()}] ${uniqueClientId} connected from ${clientSocket.remoteAddress}:${clientSocket.remotePort}`);

     /* Triggered when client sends data to server */
    clientSocket.on('data', (data) => {
        console.log(`[${strDateTimeNow()}] Data from [${uniqueClientId}]: `, data.toString());
        if (clientSocket) {
            clientSocket.write('Ack from Server \n');
        }

    });

     /* Triggered when the client ends the socket connection */
    clientSocket.on('end', () => {
        delete activeClients[uniqueClientId];
        console.log(`[${strDateTimeNow()}] ${uniqueClientId} disconnected.`);
    });

     /* Triggered when the client socket got errored out */
    clientSocket.on('error', function(err) {
        console.log(`[${strDateTimeNow()}] ${uniqueClientId} disconnected due to error: ${err}`);
    });

    /** Triggered when client socket timeout */
    clientSocket.on('timeout', function () {
        console.log(`[${strDateTimeNow()}] ${uniqueClientId} timeout`);
    });

});

server.listen({ port: PORT, family: 'IPv4', address: IP }, () => {
    var serverInfoJson = JSON.stringify(server.address());
    console.log('TCP server listening on ' + serverInfoJson);

    server.on('close', function () {
        console.log('TCP server socket is closed.');
    });
    server.on('error', function (error) {
        console.error(JSON.stringify(error));
    });
});