class GameView {
    renderBoard(board, score) {
        const boardElement = document.getElementById("board");
        boardElement.innerHTML = "";

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const value = board[row][col];

                const cell = document.createElement("div");
                cell.className = "cell";

                if (value !== 0) {
                    cell.textContent = value;
                    cell.classList.add("cell-" + value);
                }

                boardElement.appendChild(cell);
            }
        }

        document.getElementById("score").textContent = score;
    }

    showMessage(message) {
        document.getElementById("gameMessage").textContent = message;
    }

    updateGameUsername(username) {
        document.getElementById("gameUsername").textContent = username || "---";
    }
}