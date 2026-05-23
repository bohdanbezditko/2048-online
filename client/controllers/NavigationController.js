class NavigationController {
    constructor(screenView, userModel, profileView, gameController, leaderboardView) {
        this.screenView = screenView;
        this.userModel = userModel;
        this.profileView = profileView;
        this.gameController = gameController;
        this.leaderboardView = leaderboardView;

        this.API_URL = "http://localhost:3000";
    }

    async openGame() {
        await this.gameController.startGame();
        this.screenView.showScreen("gameScreen");
    }

    async openLeaderboard() {
        await this.loadLeaderboard();
        this.screenView.showScreen("leaderboardScreen");
    }

    openProfile() {
        this.profileView.updateProfile(
            this.userModel.getUsername(),
            this.userModel.getBestScore()
        );

        this.screenView.showScreen("profileScreen");
    }

    showMenu() {
        this.profileView.updateMenuUsername(this.userModel.getUsername());
        this.screenView.showScreen("menuScreen");
    }

    async loadLeaderboard() {
        try {
            const response = await fetch(`${this.API_URL}/leaderboard`);
            const data = await response.json();

            this.leaderboardView.renderLeaderboard(data);
        } catch (error) {
            this.leaderboardView.renderDemoLeaderboard(this.userModel.getBestScore());
        }
    }
}