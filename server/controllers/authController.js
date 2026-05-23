const authService = require("../services/authService");
const { logMessage } = require("../utils/logger");

async function register(req, res) {
    logMessage("REQUEST POST /register", req.body);

    const { username, password } = req.body;

    const result = await authService.register(username, password);

    logMessage("RESPONSE POST /register", result);

    res.status(result.status).json(result);
}

async function login(req, res) {
    logMessage("REQUEST POST /login", req.body);

    const { username, password } = req.body;

    const result = await authService.login(username, password);

    logMessage("RESPONSE POST /login", result);

    res.status(result.status).json(result);
}

module.exports = {
    register,
    login
};