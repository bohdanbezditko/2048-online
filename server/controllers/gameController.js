const { generateStartBoard } = require("../services/gameService");
const { logMessage } = require("../utils/logger");

function startGame(req, res) {
    logMessage("REQUEST GET /game/start", {});

    const response = {
        success: true,
        board: generateStartBoard(),
        score: 0
    };

    logMessage("RESPONSE GET /game/start", response);

    res.json(response);
}

module.exports = {
    startGame
};