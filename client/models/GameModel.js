class GameModel {
    constructor() {
        this.score = 0;
        this.board = this.createEmptyBoard();
    }

    createEmptyBoard() {
        return [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
    }

    startNewGame(board = null, score = 0) {
        this.score = score;

        if (board) {
            this.board = board;
        } else {
            this.board = this.createEmptyBoard();
            this.addRandomTile();
            this.addRandomTile();
        }
    }

    getBoard() {
        return this.board;
    }

    getScore() {
        return this.score;
    }

    addRandomTile() {
        const emptyCells = [];

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (this.board[row][col] === 0) {
                    emptyCells.push({ row, col });
                }
            }
        }

        if (emptyCells.length === 0) {
            return;
        }

        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        this.board[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
    }

    moveLeft() {
        let moved = false;

        for (let row = 0; row < 4; row++) {
            const originalRow = [...this.board[row]];
            let filteredRow = this.board[row].filter(value => value !== 0);

            for (let i = 0; i < filteredRow.length - 1; i++) {
                if (filteredRow[i] === filteredRow[i + 1]) {
                    filteredRow[i] *= 2;
                    this.score += filteredRow[i];
                    filteredRow.splice(i + 1, 1);
                }
            }

            while (filteredRow.length < 4) {
                filteredRow.push(0);
            }

            this.board[row] = filteredRow;

            if (originalRow.toString() !== this.board[row].toString()) {
                moved = true;
            }
        }

        return moved;
    }

    moveRight() {
        this.reverseRows();
        const moved = this.moveLeft();
        this.reverseRows();

        return moved;
    }

    moveUp() {
        this.transposeBoard();
        const moved = this.moveLeft();
        this.transposeBoard();

        return moved;
    }

    moveDown() {
        this.transposeBoard();
        this.reverseRows();
        const moved = this.moveLeft();
        this.reverseRows();
        this.transposeBoard();

        return moved;
    }

    reverseRows() {
        for (let row = 0; row < 4; row++) {
            this.board[row].reverse();
        }
    }

    transposeBoard() {
        const newBoard = this.createEmptyBoard();

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                newBoard[row][col] = this.board[col][row];
            }
        }

        this.board = newBoard;
    }

    isGameOver() {
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (this.board[row][col] === 0) {
                    return false;
                }

                if (col < 3 && this.board[row][col] === this.board[row][col + 1]) {
                    return false;
                }

                if (row < 3 && this.board[row][col] === this.board[row + 1][col]) {
                    return false;
                }
            }
        }

        return true;
    }
}

if (typeof module !== "undefined") {
    module.exports = GameModel;
}