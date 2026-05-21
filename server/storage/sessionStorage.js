const sessions = {};

function createSession(token, username) {
    sessions[token] = username;
}

function getUsernameByToken(token) {
    return sessions[token];
}

module.exports = {
    createSession,
    getUsernameByToken
};