/*
1. register + profile setup
2. email verify
3. login
4. forget password
5. change password
6. reset password
7. block user
8. Role change
9. my profile
10. list all users admin (aggregation)
11. admin see user by id
*/

const userModel = require("./user.model");
const { comparePassword, hashPassword } = require("../../utils/bcrypt");
const { generateJWT, generateRandomToken } = require("../../utils/token");
const { sendMail } = require("../../services/mailer");

const changePassword = async (request) => {
  const { currentUser, body } = request;
  // user check
  const user = await userModel.findById({
    _id: currentUser,
    isEmailVerified: true,
    isActive: true,
  });
  if (!user) throw new Error("User not found");
  // compare pw with user
  const isValidPw = comparePassword(body?.oldPassword, user?.password);
  if (!isValidPw) throw new Error("Password mismatch");
  // gen hash of new pw
  const newHashedPw = hashPassword(body?.newPassword);
  // store that hash
  const res = await userModel.findByIdAndUpdate(
    { _id: currentUser },
    { password: newHashedPw }
  );
  if (!res) throw new Error("Something went wrong");
  return true;
};

const generateFPToken = async (email) => {
  // Check user exists or not
  // Active ?
  // isEmailVerified ?
  const user = await userModel.findOne({
    email,
    isActive: true,
    isEmailVerified: true,
  });
  if (!user) throw new Error("User not found");
  // new OTP gen
  const newFPToken = generateRandomToken();
  // new OTP store in DB
  const updatedUser = await userModel.updateOne(
    { email },
    { token: newFPToken }
  );
  if (!updatedUser.acknowledged) throw new Error("Something went wrong");
  // send email (otp)
  await sendMail({
    to: email,
    subject: "Forget Password | BlogQuill",
    message: `
  Dear ${user?.name},
  <br/>
  <br/>
  <p>Your OTP for password reset is  <strong>${newFPToken}</strong></p>`,
  });
};

const login = async (payload) => {
  const { email, password } = payload;
  const user = await userModel.findOne({
    email,
  });
  if (!user) throw new Error("User not found");
  if (!user.isEmailVerified) throw new Error("User email verification pending");
  if (!user.isActive) throw new Error("User is banned");
  const pwMatch = comparePassword(password, user?.password);
  if (!pwMatch) throw new Error("Email or Password mismatch.");
  // Token generation (jsonwebtoken)
  const userData = { name: user?.name, email: user?.email, roles: user?.roles };
  const accessToken = generateJWT(userData);
  // User Identifier data
  const { name, email: userEmail } = user;
  const userInfo = { name, email: userEmail, accessToken };
  return userInfo;
};

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

const resetPassword = async (payload) => {
  const { email, newPassword } = payload;
  // user check
  const user = await userModel.findOne({
    email,
    isEmailVerified: true,
    isActive: true,
  });
  if (!user) throw new Error("User not found");
  // gen hash of new pw
  const newHashedPw = hashPassword(newPassword);
  // store that hash
  const res = await userModel.updateOne({ email }, { password: newHashedPw });
  if (!res.acknowledged) throw new Error("Something went wrong");
  return true;
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

const verifyFPToken = async (payload) => {
  const { email, token, password: newPassword } = payload;
  // check if user exists or not
  const user = await userModel.findOne({
    email,
    isActive: true,
    isEmailVerified: true,
  });
  if (!user) throw new Error("User not found");
  // is there token?
  if (!user.token) throw new Error("User not found");
  // match the token
  const isValidToken = user?.token === String(token);
  if (!isValidToken) throw new Error("Email or Token mismatch");
  // convert newPw to hashpw
  const hashPw = hashPassword(newPassword);
  // update the user db
  const updatedUser = await userModel.updateOne(
    { email },
    { password: hashPw, token: "" }
  );
  if (!updatedUser.acknowledged) throw new Error("Something went wrong");
  return true;
};

module.exports = {
  changePassword,
  generateFPToken,
  login,
  register,
  resetPassword,
  verifyEmail,
  verifyFPToken,
};
