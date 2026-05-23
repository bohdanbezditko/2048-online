const fs = require("fs");
const xml2js = require("xml2js");

const { USERS_FILE } = require("../config/storage");

const parser = new xml2js.Parser({
    explicitArray: false
});

const builder = new xml2js.Builder({
    headless: false,
    renderOpts: {
        pretty: true
    }
});

async function readUsers() {
    const xml = fs.readFileSync(USERS_FILE, "utf8");

    const result = await parser.parseStringPromise(xml);

    if (!result.users || !result.users.user) {
        return [];
    }

    if (Array.isArray(result.users.user)) {
        return result.users.user;
    }

    return [result.users.user];
}

function writeUsers(users) {
    const xml = builder.buildObject({
        users: {
            user: users
        }
    });

    fs.writeFileSync(USERS_FILE, xml, "utf8");
}

module.exports = {
    readUsers,
    writeUsers
};