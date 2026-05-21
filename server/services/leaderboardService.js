const { readScores, writeScores } = require("../storage/scoresStorage");
const { readUsers, writeUsers } = require("../storage/usersStorage");
const { getUsernameByToken } = require("../storage/sessionStorage");

async function saveScore(token, score) {
    const username = getUsernameByToken(token);
    if (!username || score === undefined) {
        return {
            success: false,
            status: 400,
            message: "Некоректні дані результату"
        };
    }

    const users = await readUsers();

    const user = users.find(item => item.username === username);

    if (!user) {
        return {
            success: false,
            status: 404,
            message: "Користувача не знайдено"
        };
    }

    const currentScore = Number(score);
    const currentBest = Number(user.bestScore) || 0;

    if (currentScore > currentBest) {
        user.bestScore = String(currentScore);
        writeUsers(users);
    }

    const scores = await readScores();

    scores.push({
        username,
        score: String(currentScore),
        date: new Date().toISOString()
    });

    writeScores(scores);

    return {
        success: true,
        status: 200,
        message: "Результат збережено"
    };
}

async function getLeaderboard() {
    const scores = await readScores();

    const bestScores = {};

    scores.forEach(item => {
        const username = item.username;
        const score = Number(item.score) || 0;

        if (!bestScores[username] || score > bestScores[username]) {
            bestScores[username] = score;
        }
    });

    return Object.keys(bestScores)
        .map(username => ({
            username,
            score: bestScores[username]
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);
}

module.exports = {
    saveScore,
    getLeaderboard
};