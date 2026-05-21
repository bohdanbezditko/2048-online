class ProfileView {
    updateProfile(username, bestScore) {
        document.getElementById("profileUsername").textContent = username || "---";
        document.getElementById("bestScore").textContent = bestScore;
    }

    updateMenuUsername(username) {
        document.getElementById("menuUsername").textContent = username || "гравець";
    }
}