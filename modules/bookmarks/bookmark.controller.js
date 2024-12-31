const bookmarkModel = require("./bookmark.model");
const { ObjectId } = require("mongoose").Types;

const create = (blogId, userId) => {
  return bookmarkModel.create({ blog: blogId, user: userId });
};

const list = async ({ owner, page = 1, limit = 10 }) => {
  const query = []; // pipeline
  // Search
  query.push({
    $match: {
      user: new ObjectId(owner),
    },
  });
  query.push(
    {
      $lookup: {
        from: "blogs",
        localField: "blog",
        foreignField: "_id",
        as: "blog",
      },
    },
    {
      $unwind: {
        path: "$blog",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $project: {
        "blog.title": 1,
        "blog.slug": 1,
        createdAt: 1,
      },
    }
  );
  // Cursor based Pagination
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
  const result = await bookmarkModel.aggregate(query);
  return {
    total: result[0]?.total || 0,
    data: result[0]?.data,
    page: +page,
    limit: +limit,
  };
};

const removeBookmark = (bookmarkId) => {
  return bookmarkModel.deleteOne({ _id: bookmarkId });
};

module.exports = { create, list, removeBookmark };
