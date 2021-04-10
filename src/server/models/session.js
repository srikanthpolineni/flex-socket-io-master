class Session {

    constructor(id) {
        this._id = id;
        this.ip = '';
        this.port = 0;
        this.status = SessionStatus.INITIALIZING;
        this.isSingleMatch = true;
        this.matches = [];
        this.startTime = undefined;
        this.lastUpdatedTime = undefined
    }

};

const SessionStatus = { CREATED: 0, INPROGRESS: 1, CLOSED: 2 };
Object.freeze(SessionStatus);

module.exports = { Session: Session, SessionStatus: SessionStatus }