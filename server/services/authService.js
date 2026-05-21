const { readUsers, writeUsers } = require("../storage/usersStorage");

const { generateToken } = require("../utils/tokenGenerator");

const {
    createSession
} = require("../storage/sessionStorage");

async function register(username, password) {
    username = String(username || "").trim();
    password = String(password || "").trim();

    if (!username || !password) {
        return {
            success: false,
            status: 400,
            message: "Введіть нікнейм і пароль"
        };
    }

    const users = await readUsers();

    const existingUser = users.find(user => {
        return String(user.username || "")
            .trim()
            .toLowerCase() === username.toLowerCase();
    });

    if (existingUser) {
        return {
            success: false,
            status: 409,
            message: "Користувач з таким нікнеймом вже існує"
        };
    }

    users.push({
        username,
        password,
        bestScore: "0"
    });

    writeUsers(users);

    return {
        success: true,
        status: 200,
        message: "Користувача успішно зареєстровано"
    };
}

async function login(username, password) {
    const users = await readUsers();

    const user = users.find(item => {
        return item.username === username &&
               item.password === password;
    });

    if (!user) {
        return {
            success: false,
            status: 401,
            message: "Невірний нікнейм або пароль"
        };
    }

    const token = generateToken();

createSession(token, username);

return {
    success: true,
    status: 200,
    message: "Авторизація успішна",
    bestScore: Number(user.bestScore) || 0,
    token: token
};
}

module.exports = {
    register,
    login
};