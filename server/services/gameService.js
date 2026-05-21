function generateStartBoard() {
    const board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    function addRandomTile() {
        const emptyCells = [];

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                if (board[row][col] === 0) {
                    emptyCells.push({ row, col });
                }
            }
        }

        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

        board[randomCell.row][randomCell.col] =
            Math.random() < 0.9 ? 2 : 4;
    }

    addRandomTile();
    addRandomTile();

    return board;
}

module.exports = {
    generateStartBoard
};