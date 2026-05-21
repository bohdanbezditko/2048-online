class LeaderboardView {
    renderLeaderboard(data, bestScore = 0) {
        const list = document.getElementById("leaderboard");
        list.innerHTML = "";

        if (!data || data.length === 0) {
            list.innerHTML = "<li>Поки немає результатів</li>";
            return;
        }

        data.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<span>${index + 1}. ${item.username}</span><span>${item.score}</span>`;
            list.appendChild(li);
        });
    }

    renderDemoLeaderboard(bestScore) {
        const demoData = [
            { username: "demo_user", score: bestScore },
            { username: "player_1", score: 2048 },
            { username: "player_2", score: 1024 }
        ];

        this.renderLeaderboard(demoData, bestScore);
    }
}