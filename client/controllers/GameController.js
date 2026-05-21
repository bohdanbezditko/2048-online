class GameController {
    constructor(gameModel, userModel, gameView) {
        this.gameModel = gameModel;
        this.userModel = userModel;
        this.gameView = gameView;

        this.API_URL = "http://localhost:3000";
    }

    async startGame() {
        try {
            const response = await fetch(`${this.API_URL}/game/start`);
            const data = await response.json();

            if (data.success) {
                this.gameModel.startNewGame(data.board, data.score);
            }
        } catch (error) {
            this.gameModel.startNewGame();
        }

        this.gameView.updateGameUsername(this.userModel.getUsername());
        this.gameView.showMessage("Керуйте плитками стрілками на клавіатурі");
        this.renderGame();
    }

    handleMove(direction) {
        let moved = false;

        if (direction === "left") {
            moved = this.gameModel.moveLeft();
        } else if (direction === "right") {
            moved = this.gameModel.moveRight();
        } else if (direction === "up") {
            moved = this.gameModel.moveUp();
        } else if (direction === "down") {
            moved = this.gameModel.moveDown();
        }

        if (moved) {
            this.gameModel.addRandomTile();

            const score = this.gameModel.getScore();
            this.userModel.updateBestScore(score);

            this.renderGame();

            if (this.gameModel.isGameOver()) {
                this.gameView.showMessage("Гру завершено. Можна зберегти результат або почати заново.");
            }
        }
    }

    renderGame() {
        this.gameView.renderBoard(
            this.gameModel.getBoard(),
            this.gameModel.getScore()
        );
    }

    async saveScore() {
        if (!this.userModel.isLoggedIn()) {
            alert("Спочатку увійдіть у систему");
            return;
        }

        try {
            const response = await fetch(`${this.API_URL}/score/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
    token: this.userModel.token,
    score: this.gameModel.score
})
            });

            const data = await response.json();
            alert(data.message);
        } catch (error) {
            alert("Сервер поки не запущено. Результат локально не збережено.");
        }
    }
}