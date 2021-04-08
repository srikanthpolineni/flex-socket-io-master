class Session {

    constructor(id) {
        this._id = id;
        this.ip = '';
        this.port = '';
        this.status = SessionStatus.INITIALIZING;
        this.isSingleMatch = true;
        this.matches = [];
        this.startTime = undefined;
        this.lastUpdatedTime = undefined
    }

};

const SessionStatus = { INITIALIZING: 0, CREATED: 1, INPROGRESS: 3, CLOSED: 4 };
Object.freeze(SessionStatus);

module.exports = { Session: Session, SessionStatus: SessionStatus }