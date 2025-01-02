const router = require("express").Router();

const blogController = require("./blog.controller");
const { secureAPI } = require("../../utils/secure");
const { upload, storage } = require("../../utils/multer");

const blogUpload = upload(storage("public/blogs"));

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

router.post(
  "/",
  secureAPI(["admin", "user"]),
  blogUpload.single("image"),
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.image = req.file.path.replace("public", "");
      }
      req.body.currentUser = req?.currentUser;
      const result = await blogController.create(req.body);
      res.json({
        data: result,
        msg: "Blog added successfully",
      });
    } catch (e) {
      next(e);
    }
  }
);

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

router.put(
  "/:slug",
  blogUpload.single("image"),
  secureAPI(["admin", "user"]),
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.image = req.file.path.replace("public", "");
      }
      req.body.currentUser = req?.currentUser;
      const result = await blogController.updateBySlug(
        req.params.slug,
        req.body
      );
      res.json({
        data: result,
        msg: "Blog updated successfully",
      });
    } catch (e) {
      next(e);
    }
  }
);

router.patch("/:slug", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    const result = await blogController.updateStatusBySlug(req.params.slug);
    res.json({
      data: result,
      msg: "Blog status updated successfully",
    });
  } catch (e) {
    next(e);
  }
});

router.delete(
  "/:slug",
  secureAPI(["admin", "user"]),
  async (req, res, next) => {
    try {
      const owner = req.currentUser;
      const result = await blogController.removeBySlug(req.params.slug, owner);
      res.json({
        data: result,
        msg: "Blog deleted successfully",
      });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
