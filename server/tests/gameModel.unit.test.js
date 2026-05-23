const GameModel = require("../../client/models/GameModel");

describe("GameModel unit-tests", () => {
    test("moveLeft_EqualTiles_TilesMergedAndScoreUpdated", () => {
        const game = new GameModel();

        game.board = [
            [2, 2, 0, 0],
            [4, 4, 0, 0],
            [2, 0, 2, 0],
            [0, 0, 0, 0]
        ];

        const moved = game.moveLeft();

        expect(moved).toBe(true);
        expect(game.board).toEqual([
            [4, 0, 0, 0],
            [8, 0, 0, 0],
            [4, 0, 0, 0],
            [0, 0, 0, 0]
        ]);
        expect(game.score).toBe(16);
    });

    test("moveRight_EqualTiles_TilesMergedRight", () => {
        const game = new GameModel();

        game.board = [
            [2, 2, 0, 0],
            [0, 4, 4, 0],
            [2, 0, 2, 0],
            [0, 0, 0, 0]
        ];

        const moved = game.moveRight();

        expect(moved).toBe(true);
        expect(game.board).toEqual([
            [0, 0, 0, 4],
            [0, 0, 0, 8],
            [0, 0, 0, 4],
            [0, 0, 0, 0]
        ]);
    });

    test("isGameOver_FullBoardWithoutMoves_ReturnsTrue", () => {
        const game = new GameModel();

        game.board = [
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 2]
        ];

        expect(game.isGameOver()).toBe(true);
    });

    test("isGameOver_BoardHasEmptyCell_ReturnsFalse", () => {
        const game = new GameModel();

        game.board = [
            [2, 4, 2, 4],
            [4, 0, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 2]
        ];

        expect(game.isGameOver()).toBe(false);
    });
});