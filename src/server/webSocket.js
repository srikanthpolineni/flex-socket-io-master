const ws = require('ws');
const moment = require('moment');
const SessionSchema = require('./schemas/sessionSchema');
const MatchSchema = require('./schemas/matchSchema');
const { SessionStatus } = require('./models/session');
const { MatchStatus } = require('./models/match');

const strDateTimeNow = () => moment().format('DD.MM.YYYY HH:mm:ss');

const createWebSocketServer = (app, webServer) => {
    const webSocketServer = new ws.Server({ server: webServer });
    webSocketServer.on("connection", (webSocket) => {

        //req.headers['x-forwarded-for'] || req.connection.remoteAddress
        console.log(`[${strDateTimeNow()}] Server connected from ${webSocket._socket.remoteAddress}:${webSocket._socket.remotePort}`);

        app.locals.servers = webSocketServer.clients;

        webSocket.on('message', async (data) => {
            if (!data)
                return;

            try {
                console.log(`[${strDateTimeNow()}] message from [${webSocket._socket.remoteAddress}]: `, data.toString());
                const { action, message } = JSON.parse(data);
                console.log("action:", action);
                console.log("message:", message);
                if (action === 'SESSIONCREATE') {

                    let existingSession = await SessionSchema.find({ ip: message.ip, status: { $lte: SessionStatus.CLOSED } });
                    if (existingSession && existingSession.length > 0) {
                        console.error("Session already exists for the IP:" + message.ip);
                        webSocket.send(JSON.stringify({ action: "SESSIONCREATE", code: 409, sessionId: existingSession[0]._id, message: "Active Session already exists for the given IP." }));
                        return;
                    }

                    const newSession = new SessionSchema({
                        ip: message.ip,
                        port: message.port,
                        isSingleMatch: true,
                        status: SessionStatus.CREATED,
                        matches: [],
                        startTime: new Date(),
                        lastUpdatedTime: new Date()
                    });
                    await newSession.save();
                    console.log(newSession);
                    webSocket.send(JSON.stringify({ action: "SESSIONCREATE", code: 200, sessionId: newSession._id, message: "Session Created." }));
                }
                else if (action === 'MATCHINIT') {

                    const newMatch = new MatchSchema({
                        type: "PvP",
                        status: MatchStatus.WaitingToStart,
                        maxPlayers: 100,
                        totalPlayers: 0,
                        activePlayers: 0,
                        botCount: 0,
                        players: [],
                        teams: [],
                        winners: [],
                        startTime: new Date(),
                        endTime: undefined,
                        duration: 3600
                    });

                    await newMatch.save();
                    console.log(newMatch);

                    const result = await SessionSchema.updateOne(
                        { ip: message.ip, status: SessionStatus.CREATED },
                        { $push: { matches: newMatch._id }, status: SessionStatus.INPROGRESS, lastUpdatedTime: new Date() }
                    );
                    console.log("Number of documents updated:" + result.nModified);
                    webSocket.send(JSON.stringify({ action: "MATCHINIT", code: 200, matchId: newMatch._id, message: "Match init successful." }));
                }
            } catch (err) {
                console.error(err);
            }
        });

        webSocket.on('error', function (err) {
            console.log(`[${strDateTimeNow()}] ${webSocket._socket.remoteAddress} disconnected due to error: ${err}`);
        });

        webSocket.on('close', function (err) {
            console.log(`[${strDateTimeNow()}] ${webSocket._socket.remoteAddress} connection closed`);
        });

    });
    return webSocketServer;
}

module.exports = { strDateTimeNow, createWebSocketServer };