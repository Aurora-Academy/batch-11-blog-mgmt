/*
1. register + profile setup
2. email verify
3. login
4. forget password
5. change password
6. block user

*/

const userModel = require("./user.model");
const { hashPassword } = require("../../utils/bcrypt");
const { sendMail } = require("../../services/mailer");

const register = async (payload) => {
  const { roles, password, ...rest } = payload;
  rest.password = hashPassword(password);
  const user = await userModel.create(rest);
  if (user) {
    await sendMail({
      to: rest.email,
      subject: "Welcome to BlogQuill",
      message: `
    Dear ${rest.name},
    <br/>
    <p>Thank you for signing up!</p>`,
    });
  }
};

module.exports = { register };
