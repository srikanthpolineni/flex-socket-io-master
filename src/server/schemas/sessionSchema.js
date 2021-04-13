const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    ip: { type: String, index: true, required: true },
    port: { type: Number, index: true, required: true },
    status: { type: Number, index: true },
    isSingleMatch: Boolean,
    matches: [mongoose.ObjectId],
    startTime: Date,
    lastUpdatedTime: { type: Date, index: true }
});

module.exports = mongoose.model('SessionSchema', sessionSchema, 'sessions');