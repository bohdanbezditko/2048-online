const express = require("express");

const router = express.Router();

const {
    saveScore,
    getLeaderboard
} = require("../controllers/leaderboardController");

router.post("/score/save", saveScore);
router.get("/leaderboard", getLeaderboard);

module.exports = router;