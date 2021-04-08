class Match {
    constructor(id) {
        this._id = id;
        this.status = MatchStatus.WaitingToStart;
        this.maxPlayers = 100;
        this.totalPlayers = 0;
        this.activePlayers = 0;
        this.botCount = 0;
        this.players = [];
        this.teams = 0;
        this.winners = [];
        this.startTime = '';
        this.endTime = '';
        this.type = '';
        this.duration = 0;
    }
}

const MatchStatus = { WaitingToStart: 0, INPROGRESS: 1, POSTMATCH: 2, FINISH: 3, ABORTED: 4 };
Object.freeze(MatchStatus);

module.exports = { Match: Match, MatchStatus: MatchStatus }