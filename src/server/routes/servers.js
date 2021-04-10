const router = require("express").Router();
const webSocket = require("ws");
const SessionSchema = require('../schemas/sessionSchema');
const MatchSchema = require('../schemas/matchSchema');
const { SessionStatus } = require('../models/session');
const { MatchStatus } = require('../models/match');

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

router.post('/', async (req, res) => {
    try {
        let { action, message } = req.body;
        console.log("action:", action);
        console.log("message:", message);
        if (action === 'INITIALIZE') {

            let existingSession = await SessionSchema.find({ ip: message.ip, status: { $lte: SessionStatus.CLOSED } });
            if (existingSession && existingSession.length > 0) {
                console.error("Session already exists for the IP:" + message.ip);
                res.status(400).send(400, "Session already exists for the given IP.");
                return;
            }

            const newSession = new SessionSchema({
                ip: message.ip,
                port: message.port,
                isSingleMatch: true,
                status: SessionStatus.INITIALIZING,
                matches: [],
                startTime: new Date(),
                lastUpdatedTime: new Date()
            });
            await newSession.save();
            console.log(newSession);
        }
        else if (action === 'SESSIONCREATE') {

            const newMatch = new MatchSchema({
                type: "PvP",
                status:MatchStatus.WaitingToStart,
                maxPlayers:100,
                totalPlayers:0,
                activePlayers:0,
                botCount: 0,
                players:[],
                teams:[],
                winners:[],
                startTime: new Date(),
                endTime:undefined,
                duration: 3600
            });

            await newMatch.save();
            console.log(newMatch);

            const result = await SessionSchema.updateOne(
                { ip: message.ip, status: SessionStatus.INITIALIZING },
                { $push: { matches: newMatch._id }, status: SessionStatus.CREATED, lastUpdatedTime: new Date() }
            );


            console.log("Number of documents updated:" + result.nModified);
        }
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.put('/:serverId', (req, res) => {
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