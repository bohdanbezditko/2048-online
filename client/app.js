const userModel = new UserModel();
const gameModel = new GameModel();

const screenView = new ScreenView();
const authView = new AuthView();
const gameView = new GameView();
const leaderboardView = new LeaderboardView();
const profileView = new ProfileView();

const authController = new AuthController(
    userModel,
    authView,
    profileView,
    screenView
);

const gameController = new GameController(
    gameModel,
    userModel,
    gameView
);

const navigationController = new NavigationController(
    screenView,
    userModel,
    profileView,
    gameController,
    leaderboardView
);

document.getElementById("registerBtn").addEventListener("click", function() {
    authController.registerUser();
});

document.getElementById("loginBtn").addEventListener("click", function() {
    authController.loginUser();
});

document.getElementById("demoLoginBtn").addEventListener("click", function() {
    authController.demoLogin();
});

document.getElementById("logoutBtn").addEventListener("click", function() {
    authController.logout();
});

document.getElementById("newGameBtn").addEventListener("click", function() {
    navigationController.openGame();
});

document.getElementById("leaderboardBtn").addEventListener("click", function() {
    navigationController.openLeaderboard();
});

document.getElementById("profileBtn").addEventListener("click", function() {
    navigationController.openProfile();
});

document.getElementById("restartGameBtn").addEventListener("click", function() {
    gameController.startGame();
});

document.getElementById("saveScoreBtn").addEventListener("click", function() {
    gameController.saveScore();
});

document.getElementById("refreshLeaderboardBtn").addEventListener("click", function() {
    navigationController.loadLeaderboard();
});

document.getElementById("backToMenuFromGameBtn").addEventListener("click", function() {
    navigationController.showMenu();
});

document.getElementById("backToMenuFromLeaderboardBtn").addEventListener("click", function() {
    navigationController.showMenu();
});

document.getElementById("backToMenuFromProfileBtn").addEventListener("click", function() {
    navigationController.showMenu();
});

document.addEventListener("keydown", function(event) {
    if (document.getElementById("gameScreen").classList.contains("hidden")) {
        return;
    }

    if (event.key === "ArrowLeft") {
        event.preventDefault();
        gameController.handleMove("left");
    } else if (event.key === "ArrowRight") {
        event.preventDefault();
        gameController.handleMove("right");
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        gameController.handleMove("up");
    } else if (event.key === "ArrowDown") {
        event.preventDefault();
        gameController.handleMove("down");
    }
});
setInterval(() => {
    const leaderboardScreen =
        document.getElementById("leaderboardScreen");

    if (!leaderboardScreen.classList.contains("hidden")) {
        navigationController.loadLeaderboard();
    }
}, 5000);

gameController.renderGame();