class AuthController {
    constructor(userModel, authView, profileView, screenView) {
        this.userModel = userModel;
        this.authView = authView;
        this.profileView = profileView;
        this.screenView = screenView;

        this.API_URL = "http://localhost:3000";
    }

    async registerUser() {
        const username = this.authView.getUsername();
        const password = this.authView.getPassword();

        if (!username || !password) {
            this.authView.showMessage("Введіть нікнейм і пароль");
            return;
        }

        try {
            const response = await fetch(`${this.API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            this.authView.showMessage(data.message);
        } catch (error) {
            this.authView.showMessage("Сервер поки не запущено");
        }
    }

    async loginUser() {
        const username = this.authView.getUsername();
        const password = this.authView.getPassword();

        if (!username || !password) {
            this.authView.showMessage("Введіть нікнейм і пароль");
            return;
        }

        try {
            const response = await fetch(`${this.API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            this.authView.showMessage(data.message);

            if (data.success) {
                this.userModel.setUser(username, data.bestScore || 0);
                this.updateUserInfo();
                this.screenView.showScreen("menuScreen");
                this.userModel.token = data.token;
            }
        } catch (error) {
            this.authView.showMessage("Сервер поки не запущено");
        }
    }

    demoLogin() {
        const username = this.authView.getUsername() || "demo_user";

        this.userModel.setUser(username, 0);
        this.authView.showMessage("");
        this.updateUserInfo();
        this.screenView.showScreen("menuScreen");
    }

    logout() {
        this.userModel.clearUser();
        this.authView.clearForm();
        this.updateUserInfo();
        this.screenView.showScreen("loginScreen");
    }

    updateUserInfo() {
        const username = this.userModel.getUsername();
        const bestScore = this.userModel.getBestScore();

        this.profileView.updateMenuUsername(username);
        this.profileView.updateProfile(username, bestScore);
    }
}