const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");

const {
    DATA_DIR,
    LOG_DIR,
    USERS_FILE,
    SCORES_FILE,
    LOG_FILE
} = require("./config/storage");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../client")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/index.html"));
});

function ensureStorage() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR);
    }

    if (!fs.existsSync(LOG_DIR)) {
        fs.mkdirSync(LOG_DIR);
    }

    if (
        !fs.existsSync(USERS_FILE) ||
        fs.readFileSync(USERS_FILE, "utf8").trim() === ""
    ) {
        fs.writeFileSync(USERS_FILE, "<users></users>", "utf8");
    }

    if (
        !fs.existsSync(SCORES_FILE) ||
        fs.readFileSync(SCORES_FILE, "utf8").trim() === ""
    ) {
        fs.writeFileSync(SCORES_FILE, "<scores></scores>", "utf8");
    }

    if (!fs.existsSync(LOG_FILE)) {
        fs.writeFileSync(LOG_FILE, "", "utf8");
    }
}

ensureStorage();

app.use(authRoutes);
app.use(gameRoutes);
app.use(leaderboardRoutes);

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Сервер запущено: http://localhost:${PORT}`);
    });
}

module.exports = app;