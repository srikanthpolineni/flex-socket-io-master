const router = require('express').Router();
const SessionSchema = require('../schemas/sessionSchema');
const { SessionStatus } = require('../models/session');


router.get('/', async (req, res) => {

    const sessions = [];
    let existingSessions = await SessionSchema.find({ status: SessionStatus.INPROGRESS });
    response.setHeader('Content-Type', 'application/json')
    res.status(200).send(sessions);

});