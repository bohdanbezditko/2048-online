const express = require("express");

const router = express.Router();

const {
    startGame
} = require("../controllers/gameController");

router.get("/game/start", startGame);

module.exports = router;