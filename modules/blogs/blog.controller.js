const blogModel = require("./blog.model");
const userModel = require("../users/user.model");

const { ObjectId } = require("mongoose").Types;
const { generateSlug } = require("../../utils/string");

const create = async (payload) => {
  const { currentUser, ...rest } = payload;
  // create slug of title
  rest.slug = generateSlug(rest.title);
  rest.author = currentUser;
  const slugExists = await blogModel.findOne({ slug: rest.slug });
  if (slugExists) throw new Error("Slug already exists. Try again!!");
  return blogModel.create(rest);
};

const getBySlug = (slug) => {
  return blogModel
    .findOne({ slug, status: "published" })
    .populate({ path: "author", select: "name email bio" });
};

const list = async ({ search, page = 1, limit = 10 }) => {
  const query = []; // pipeline
  // Search
  if (search?.title) {
    query.push({
      $match: {
        title: new RegExp(search?.name, "gi"),
      },
    });
  }
  // Filter
  if (search?.status) {
    query.push({
      $match: {
        status: search?.status,
      },
    });
  }
  // Cursor based Pagination
  query.push(
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $project: {
        "author.name": 1,
        "author.email": 1,
        "author.bio": 1,
        title: 1,
        content: 1,
        status: 1,
        slug: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    }
  );
  query.push(
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (+page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ],
      },
    },
    {
      $addFields: {
        total: {
          $arrayElemAt: ["$metadata.total", 0],
        },
      },
    }
  );
  const result = await blogModel.aggregate(query);
  return {
    total: result[0]?.total || 0,
    data: result[0]?.data,
    page: +page,
    limit: +limit,
  };
};

const getAllMyBlogs = async ({ id, search, page = 1, limit = 10 }) => {
  const query = []; // pipeline
  // Search
  if (search?.title) {
    query.push({
      $match: {
        title: new RegExp(search?.name, "gi"),
      },
    });
  }
  // Filter
  if (search?.status) {
    query.push({
      $match: {
        status: search?.status,
      },
    });
  }
  // Cursor based Pagination
  query.push(
    {
      $match: {
        author: new ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $project: {
        "author.name": 1,
        "author.email": 1,
        "author.bio": 1,
        title: 1,
        content: 1,
        status: 1,
        slug: 1,
        createdAt: 1,
        updatedAt: 1,
      },
    }
  );
  query.push(
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (+page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ],
      },
    },
    {
      $addFields: {
        total: {
          $arrayElemAt: ["$metadata.total", 0],
        },
      },
    }
  );
  const result = await blogModel.aggregate(query);
  return {
    total: result[0]?.total || 0,
    data: result[0]?.data,
    page: +page,
    limit: +limit,
  };
};

const removeBySlug = async (slug, owner) => {
  const blog = await blogModel.findOne({ slug });
  if (!blog) throw new Error("Blog not found");
  const user = await userModel.findOne({ _id: owner });
  if (
    blog?.author.toString() !== owner.toString() ||
    !!user?.roles.includes("admin")
  ) {
    throw new Error("User unauthorized");
  }
  return blogModel.deleteOne({ slug });
};

const updateBySlug = async (slug, payload) => {
  const { title, ...rest } = payload;
  const existingBlog = await blogModel.findOne({ slug });
  if (!existingBlog) throw new Error("Blog not found");
  if (existingBlog?.title !== title) {
    const newSlug = generateSlug(title);
    rest.slug = newSlug;
    rest.title = title;
  }
  return blogModel.findOneAndUpdate({ slug }, rest, { new: true });
};

const updateStatusBySlug = async (slug) => {
  const existingBlog = await blogModel.findOne({ slug });
  if (!existingBlog) throw new Error("Blog not found");
  const newStatus = existingBlog?.status === "draft" ? "published" : "draft";
  return blogModel.findOneAndUpdate({ slug }, { status: newStatus });
};

module.exports = {
  create,
  getAllMyBlogs,
  getBySlug,
  list,
  removeBySlug,
  updateBySlug,
  updateStatusBySlug,
};
