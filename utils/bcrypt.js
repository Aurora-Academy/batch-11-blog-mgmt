const bcrypt = require("bcryptjs");

const hashPassword = (text) => {
  return bcrypt.hashSync(text, Number(process.env.SALT_ROUND));
};

const comparePassword = (text, hashedText) => {
  return bcrypt.compareSync(text, hashedText);
};

module.exports = { hashPassword, comparePassword };
