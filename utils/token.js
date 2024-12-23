const crypto = require("crypto");

const generateRandomToken = () => crypto.randomInt(100000, 999999);

module.exports = { generateRandomToken };
