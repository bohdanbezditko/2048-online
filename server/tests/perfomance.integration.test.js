const fs = require("fs");
const path = require("path");
const { performance } = require("perf_hooks");

const usersFile = path.join(__dirname, "../data/users.xml");
const scoresFile = path.join(__dirname, "../data/scores.xml");

describe("Integration performance comparison", () => {
    beforeEach(() => {
        fs.writeFileSync(usersFile, "<users></users>", "utf8");
        fs.writeFileSync(scoresFile, "<scores></scores>", "utf8");
        jest.resetModules();
    });

    test("realObjectsAndMockObjects_CompareExecutionSpeed", async () => {
        const realStart = performance.now();

        const authService = require("../services/authService");
        const leaderboardService = require("../services/leaderboardService");

        await authService.register("speed_user", "12345");
        const loginResult = await authService.login("speed_user", "12345");
        await leaderboardService.saveScore(loginResult.token, 1024);
        await leaderboardService.getLeaderboard();

        const realTime = performance.now() - realStart;

        jest.resetModules();

        jest.doMock("../storage/usersStorage", () => ({
            readUsers: jest.fn().mockResolvedValue([
                {
                    username: "mock_user",
                    password: "12345",
                    bestScore: "0"
                }
            ]),
            writeUsers: jest.fn()
        }));

        jest.doMock("../storage/scoresStorage", () => ({
            readScores: jest.fn().mockResolvedValue([
                {
                    username: "mock_user",
                    score: "2048",
                    date: new Date().toISOString()
                }
            ]),
            writeScores: jest.fn()
        }));

        jest.doMock("../storage/sessionStorage", () => ({
            createSession: jest.fn(),
            getUsernameByToken: jest.fn().mockReturnValue("mock_user")
        }));

        jest.doMock("../utils/tokenGenerator", () => ({
            generateToken: jest.fn().mockReturnValue("mock-token")
        }));

        const mockStart = performance.now();

        const mockedAuthService = require("../services/authService");
        const mockedLeaderboardService = require("../services/leaderboardService");

        const mockedLogin = await mockedAuthService.login("mock_user", "12345");
        await mockedLeaderboardService.saveScore(mockedLogin.token, 2048);
        await mockedLeaderboardService.getLeaderboard();

        const mockTime = performance.now() - mockStart;

        console.log(`Real objects time: ${realTime.toFixed(3)} ms`);
        console.log(`Mock objects time: ${mockTime.toFixed(3)} ms`);

        expect(realTime).toBeGreaterThan(0);
        expect(mockTime).toBeGreaterThan(0);
    });
});