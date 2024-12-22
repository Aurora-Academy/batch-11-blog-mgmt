const router = require("express").Router();

const { upload } = require("../../utils/multer");
const userController = require("./user.controller");

router.get("/", (req, res, next) => {
  try {
    res.json({ data: null, msg: "User API is working" });
  } catch (e) {
    next(e);
  }
});

router.post("/register", upload.single("image"), async (req, res, next) => {
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
});

module.exports = router;
