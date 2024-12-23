const router = require("express").Router();

const { upload } = require("../../utils/multer");
const userController = require("./user.controller");
const { registerValidation } = require("./user.validation");

router.get("/", (req, res, next) => {
  try {
    res.json({ data: null, msg: "User API is working" });
  } catch (e) {
    next(e);
  }
});

router.post(
  "/register",
  upload.single("image"),
  registerValidation,
  async (req, res, next) => {
    try {
      if (req.file) {
        const image = req.file.path.replace("public", "");
        req.body.image = image;
      }
      const result = await userController.register(req.body);
      res.json({ data: null, msg: "User registered successfully." });
    } catch (e) {
      next(e);
    }
  }
);

router.post("/login", async (req, res, next) => {
  try {
    const result = await userController.login(req.body);
    res.json({ data: result, msg: "User logged in successfully." });
  } catch (e) {
    next(e);
  }
});

router.post("/verify-email", async (req, res, next) => {
  try {
    const { email, token } = req.body;
    if (!email || !token) throw new Error("Email or token is missing.");
    const result = await userController.verifyEmail(req.body);
    res.json({ data: result, msg: "Email verified successfully." });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
