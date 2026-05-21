const path = require("path");

const DATA_DIR = path.join(__dirname, "../data");
const LOG_DIR = path.join(__dirname, "../logs");

module.exports = {
    DATA_DIR,
    LOG_DIR,

    USERS_FILE: path.join(DATA_DIR, "users.xml"),
    SCORES_FILE: path.join(DATA_DIR, "scores.xml"),
    LOG_FILE: path.join(LOG_DIR, "logs.txt")
};