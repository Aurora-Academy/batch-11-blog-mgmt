const router = require("express").Router();
const { secureAPI } = require("../../utils/secure");
const bookmarkController = require("./bookmark.controller");

router.get("/", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await bookmarkController.list({
      owner: req.currentUser,
      page,
      limit,
    });
    res.json({ data: result, msg: "Bookmarks listed successfully" });
  } catch (e) {
    next(e);
  }
});

router.post("/", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    const { blog } = req.body;
    if (!blog) throw new Error("Blog is missing");
    const result = await bookmarkController.create(blog, req.currentUser);
    res.json({ data: result, msg: "Bookmark added successfully" });
  } catch (e) {
    const errMsg = e.toString().includes("E11000 duplicate key")
      ? "Duplicate bookmark found"
      : e;
    next(errMsg);
  }
});

router.delete("/:id", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    await bookmarkController.removeBookmark(req.params.id);
    res.json({ data: null, msg: "Bookmark removed successfully" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
