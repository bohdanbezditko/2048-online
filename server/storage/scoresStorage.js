const fs = require("fs");
const xml2js = require("xml2js");

const { SCORES_FILE } = require("../config/storage");

const parser = new xml2js.Parser({
    explicitArray: false
});

const builder = new xml2js.Builder({
    headless: false,
    renderOpts: {
        pretty: true
    }
});

async function readScores() {
    const xml = fs.readFileSync(SCORES_FILE, "utf8");

    if (!xml.trim()) {
        return [];
    }

    const result = await parser.parseStringPromise(xml);

    if (!result || !result.scores || !result.scores.score) {
        return [];
    }

    if (Array.isArray(result.scores.score)) {
        return result.scores.score;
    }

    return [result.scores.score];
}

function writeScores(scores) {
    const xml = builder.buildObject({
        scores: {
            score: scores
        }
    });

    fs.writeFileSync(SCORES_FILE, xml, "utf8");
}

module.exports = {
    readScores,
    writeScores
};