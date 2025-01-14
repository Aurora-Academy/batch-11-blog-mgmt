const router = require("express").Router();

const blogRouter = require("../modules/blogs/blog.route");
const bookmarkRouter = require("../modules/bookmarks/bookmark.route");
const userRouter = require("../modules/users/user.route");

router.get("/", (req, res, next) => {
  try {
    res.json({ data: null, msg: "API is working" });
  } catch (e) {
    next(e);
  }
});

router.use("/blogs", blogRouter);
router.use("/bookmarks", bookmarkRouter);
router.use("/users", userRouter);

module.exports = router;
