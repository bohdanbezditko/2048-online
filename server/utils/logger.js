const fs = require("fs");
const { LOG_FILE } = require("../config/storage");

function logMessage(type, data) {
    const time = new Date().toISOString();
    const logLine = `[${time}] ${type}: ${JSON.stringify(data)}\n`;

    fs.appendFileSync(LOG_FILE, logLine, "utf8");
}

module.exports = {
    logMessage
};