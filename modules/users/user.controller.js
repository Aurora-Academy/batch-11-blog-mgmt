/*
1. register + profile setup
2. email verify
3. login
4. forget password
5. change password
6. block user

*/

const userModel = require("./user.model");
const { comparePassword, hashPassword } = require("../../utils/bcrypt");
const { generateRandomToken } = require("../../utils/token");
const { sendMail } = require("../../services/mailer");

const register = async (payload) => {
  const { roles, password, ...rest } = payload;
  rest.password = hashPassword(password);
  rest.token = generateRandomToken();
  const user = await userModel.create(rest);
  if (user) {
    await sendMail({
      to: rest.email,
      subject: "Welcome to BlogQuill",
      message: `
    Dear ${rest.name},
    <br/>
    <br/>
    <p>Thank you for signing up! <br/> Your OTP FOR email verification is  <strong>${rest.token}</strong></p>`,
    });
  }
};

const login = async (payload) => {
  const { email, password } = payload;
  // does email exists?
  // is user banned?
  // is user email verified?
  // does password match?
  // allow the user to login (TODO)
  const user = await userModel.findOne({
    email,
  });
  if (!user) throw new Error("User not found");
  if (!user.isEmailVerified) throw new Error("User email verification pending");
  if (!user.isActive) throw new Error("User is banned");
  const pwMatch = comparePassword(password, user?.password);
  if (!pwMatch) throw new Error("Email or Password mismatch.");
  // Token generation (jsonwebtoken)
  // User Identifier data
  return "logged in";
};

const verifyEmail = async (payload) => {
  const { email, token } = payload;
  const user = await userModel.findOne({ email, isActive: true });
  if (!user) throw new Error("User not found");
  const isValidToken = token === user?.token;
  if (!isValidToken) throw new Error("Token mismatch");
  const updateUser = await userModel.updateOne(
    { email },
    { token: "", isEmailVerified: true }
  );
  if (!updateUser) throw new Error("Process failed. Try again later");
  return "Email verification completed";
};

module.exports = { login, register, verifyEmail };
