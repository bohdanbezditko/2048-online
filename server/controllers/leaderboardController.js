const leaderboardService = require("../services/leaderboardService");
const { logMessage } = require("../utils/logger");

async function saveScore(req, res) {
    logMessage("REQUEST POST /score/save", req.body);

    const { token, score } = req.body;
    

    const result = await leaderboardService.saveScore(token, score);

    logMessage("RESPONSE POST /score/save", result);

    res.status(result.status).json(result);
}

async function getLeaderboard(req, res) {
    logMessage("REQUEST GET /leaderboard", {});

    const leaderboard = await leaderboardService.getLeaderboard();

    logMessage("RESPONSE GET /leaderboard", leaderboard);

    res.json(leaderboard);
}

module.exports = {
    saveScore,
    getLeaderboard
};