class AuthView {
    getUsername() {
        return document.getElementById("username").value.trim();
    }

    getPassword() {
        return document.getElementById("password").value.trim();
    }

    showMessage(message) {
        document.getElementById("authMessage").textContent = message;
    }

    clearForm() {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("authMessage").textContent = "";
    }
}