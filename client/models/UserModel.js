class UserModel {
    constructor() {
        this.currentUser = null;
        this.bestScore = 0;
        this.token = null;
    }

    setUser(username, bestScore = 0) {
        this.currentUser = username;
        this.bestScore = bestScore;
    }

    clearUser() {
        this.currentUser = null;
        this.bestScore = 0;
    }

    getUsername() {
        return this.currentUser;
    }

    getBestScore() {
        return this.bestScore;
    }

    updateBestScore(score) {
        if (score > this.bestScore) {
            this.bestScore = score;
        }
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }
}