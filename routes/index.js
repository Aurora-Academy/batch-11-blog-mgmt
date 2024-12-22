const router = require("express").Router();

const userRouter = require("../modules/users/user.route");

router.get("/", (req, res, next) => {
  try {
    res.json({ data: null, msg: "API is working" });
  } catch (e) {
    next(e);
  }
});

router.use("/users", userRouter);

module.exports = router;
