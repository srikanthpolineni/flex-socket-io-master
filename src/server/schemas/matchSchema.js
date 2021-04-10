const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
    type: { type: String, index: true },
    status: { type: Number, index: true },
    maxPlayers: Number,
    totalPlayers: { type: Number, index: true },
    activePlayers: Number,
    botCount: Number,
    players: [mongoose.ObjectId],
    teams: [String],
    winners: [String],
    startTime: Date,
    endTime: { type: Date, index: true },
    duration: Number
});

module.exports = mongoose.model('MatchSchema', matchSchema, 'matches');