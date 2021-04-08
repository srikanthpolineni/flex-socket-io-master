const router = require("express").Router();
const webSocket = require("ws");

router.get('/', (req, res) => {
    const servers = req.app.locals.servers;
    const response = [];
    servers.forEach((server) => {

        if (server.readyState === webSocket.OPEN) {

            response.push(server.id);
        }
    });
    res.send(response);
});

router.get('/:serverId', async (req, res, next) => {

    try {
        res.json({});
    }
    catch (e) {

    }
    return next(error);
});

router.post('/', (req, res) => {
    const servers = req.app.locals.servers;
    servers.forEach((server) => {

        if (server.readyState === webSocket.OPEN) {

            server.send(JSON.stringify(req.body));
        }
    });
    res.sendStatus(200);
});

router.post('/terminate/:serverId', (req, res) => {
    //TODO: Terminates the given server
    res.sendStatus(200);
});

router.post('/restart/:serverId', (req, res) => {
    //TODO: restarts the  game session on a given server
    res.sendStatus(200);
});

router.post('/terminate/:serverId/player/:playerId', (req, res) => {
    const { serverId, playerId } = req.params;
    //TODO:
    res.sendStatus(200);
});


module.exports = router;