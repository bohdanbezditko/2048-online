const request = require("supertest");
const fs = require("fs");
const path = require("path");
const app = require("../server");

const usersFile = path.join(__dirname, "../data/users.xml");
const scoresFile = path.join(__dirname, "../data/scores.xml");

describe("2048 Online integration-tests", () => {
    beforeEach(() => {
        fs.writeFileSync(usersFile, "<users></users>", "utf8");
        fs.writeFileSync(scoresFile, "<scores></scores>", "utf8");
    });

    test("registerAndLogin_ValidUser_ReturnsToken", async () => {
        const registerResponse = await request(app)
            .post("/register")
            .send({
                username: "integration_user",
                password: "12345"
            });

        expect(registerResponse.status).toBe(200);
        expect(registerResponse.body.success).toBe(true);

        const loginResponse = await request(app)
            .post("/login")
            .send({
                username: "integration_user",
                password: "12345"
            });

        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body.success).toBe(true);
        expect(loginResponse.body.token).toBeDefined();
    });

    test("saveScore_ValidToken_ScoreSavedToLeaderboard", async () => {
        await request(app)
            .post("/register")
            .send({
                username: "score_user",
                password: "12345"
            });

        const loginResponse = await request(app)
            .post("/login")
            .send({
                username: "score_user",
                password: "12345"
            });

        const token = loginResponse.body.token;

        const saveResponse = await request(app)
            .post("/score/save")
            .send({
                token,
                score: 512
            });

        expect(saveResponse.status).toBe(200);
        expect(saveResponse.body.success).toBe(true);

        const leaderboardResponse = await request(app)
            .get("/leaderboard");

        expect(leaderboardResponse.status).toBe(200);
        expect(leaderboardResponse.body[0].username).toBe("score_user");
        expect(leaderboardResponse.body[0].score).toBe(512);
    });

    test("gameStart_Request_ReturnsBoardAndScore", async () => {
        const response = await request(app).get("/game/start");

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.board.length).toBe(4);
        expect(response.body.score).toBe(0);
    });
});