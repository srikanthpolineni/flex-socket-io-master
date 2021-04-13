const environment = process.env.ENVIRONMENT || 'local';
require('dotenv').config({ path: __dirname + `/.env.${environment}` });
const { createServer } = require('http');
const express = require('express');
const { createWebSocketServer } = require('./webSocket');

const mongoose = require('mongoose')

const PORT = process.env.PORT | 8080;

const app = express();

const options = {
    index: "index.html"
};

app.use(express.json({ extended: true }));
app.use(express.static('public', options));
app.get("/health", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.json({ "status": "UP" });
});
app.use('/api/*', (req, res, next) => {
    //TODO: Authentication check
    if (false) {
        res.send(401, 'Unauthorized');
    }
    next();
});
app.use("/api/servers", require("./routes/servers"));
app.use("/api/clients", require('./routes/clients'));

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
        res.json({ error: 'Not found : 404' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

const webServer = createServer(app);

createWebSocketServer(app, webServer);

app.locals.servers = [];

mongoose.connect(process.env.MONGODB, { useNewUrlParser: true });
mongoose.connection.once('open', _ => {
    console.log('MongoDB connection is successful:', process.env.MONGODB);
});
mongoose.connection.on('error', err => {
    console.log(err);
});

webServer.listen(PORT, () => {
    console.info(`Express Server running on port: ${PORT}`);
});