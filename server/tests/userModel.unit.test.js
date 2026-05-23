const UserModel = require("../../client/models/UserModel");

describe("UserModel unit-tests", () => {
    test("setUser_ValidData_UserIsSaved", () => {
        const user = new UserModel();

        user.setUser("test_user", 100);

        expect(user.getUsername()).toBe("test_user");
        expect(user.getBestScore()).toBe(100);
        expect(user.isLoggedIn()).toBe(true);
    });

    test("updateBestScore_BiggerScore_BestScoreUpdated", () => {
        const user = new UserModel();

        user.setUser("test_user", 50);
        user.updateBestScore(150);

        expect(user.getBestScore()).toBe(150);
    });

    test("clearUser_UserExists_UserDataCleared", () => {
        const user = new UserModel();

        user.setUser("test_user", 100);
        user.clearUser();

        expect(user.getUsername()).toBe(null);
        expect(user.getBestScore()).toBe(0);
        expect(user.isLoggedIn()).toBe(false);
    });
});