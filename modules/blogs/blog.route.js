const router = require("express").Router();

const blogController = require("./blog.controller");
const { secureAPI } = require("../../utils/secure");

router.get("/", secureAPI(["admin"]), async (req, res, next) => {
  try {
    const { title, status, page, limit } = req.query;
    const search = { title, status };
    const result = await blogController.list({ search, page, limit });
    res.json({ data: result, msg: "Blog list generated successfully" });
  } catch (e) {
    next(e);
  }
});

router.post("/", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    req.body.currentUser = req?.currentUser;
    const result = await blogController.create(req.body);
    res.json({
      data: result,
      msg: "Blog added successfully",
    });
  } catch (e) {
    next(e);
  }
});

router.get(
  "/my-blogs",
  secureAPI(["admin", "user"]),
  async (req, res, next) => {
    try {
      const { title, status, page, limit } = req.query;
      const search = { title, status };
      const result = await blogController.getAllMyBlogs({
        id: req.currentUser,
        search,
        page,
        limit,
      });
      res.json({ data: result, msg: "All my blogs are listed successfully" });
    } catch (e) {
      next(e);
    }
  }
);

router.get("/:slug", async (req, res, next) => {
  try {
    const result = await blogController.getBySlug(req.params.slug);
    res.json({
      data: result,
      msg: "Public blog details generated successfully",
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
