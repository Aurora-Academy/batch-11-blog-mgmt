const router = require("express").Router();

const {
  FPValidation,
  registerValidation,
  verifyFPValidation,
} = require("./user.validation");
const { secureAPI } = require("../../utils/secure");
const { upload } = require("../../utils/multer");

const userController = require("./user.controller");

router.get("/", secureAPI(["admin"]), async (req, res, next) => {
  try {
    const { name, role, page, limit } = req.query;
    const search = { name, role };
    const result = await userController.list(search, page, limit);
    res.json({ data: result, msg: "User list generated successfully" });
  } catch (e) {
    next(e);
  }
});

router.get("/profile", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    const result = await userController.getProfile(req?.currentUser);
    res.json({ data: result, msg: "Profile generate successfully" });
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

router.post("/generate-fp", FPValidation, async (req, res, next) => {
  try {
    const { email } = req.body;
    await userController.generateFPToken(email);
    res.json({
      data: null,
      msg: "Password reset link generated successfully.",
    });
  } catch (e) {
    next(e);
  }
});

router.post("/verify-fp", verifyFPValidation, async (req, res, next) => {
  try {
    await userController.verifyFPToken(req.body);
    res.json({
      data: null,
      msg: "Password reset successfully.",
    });
  } catch (e) {
    next(e);
  }
});

router.put(
  "/change-password",
  secureAPI(["user", "admin"]),
  async (req, res, next) => {
    try {
      await userController.changePassword(req);
      res.json({
        data: null,
        msg: "Password changed successfully.",
      });
    } catch (e) {
      next(e);
    }
  }
);

router.put("/reset-password", secureAPI(["admin"]), async (req, res, next) => {
  try {
    await userController.resetPassword(req.body);
    res.json({
      data: null,
      msg: "Password reset successfully.",
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:id", secureAPI(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.getById(req.params.id);
    res.json({ data: result, msg: "User details generated successfully" });
  } catch (e) {
    next(e);
  }
});

router.patch("/:id/roles", secureAPI(["admin"]), async (req, res, next) => {
  try {
    const { id } = req.params;
    await userController.updateRole(id, req.body);
    res.json({ data: null, msg: "User roles updated successfully" });
  } catch (e) {
    next(e);
  }
});

router.patch("/:id/block", secureAPI(["admin"]), async (req, res, next) => {
  try {
    const { id } = req.params;
    await userController.blockUser(id);
    res.json({ data: null, msg: "User status updated successfully" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
