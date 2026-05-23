class ScreenView {
    constructor() {
        this.screens = document.querySelectorAll(".screen");
    }

    showScreen(screenId) {
        this.screens.forEach(screen => {
            screen.classList.add("hidden");
        });

        document.getElementById(screenId).classList.remove("hidden");
    }
}