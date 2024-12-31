const { Schema, model } = require("mongoose");
const { ObjectId } = require("mongoose").Types;

const bookmarkSchema = new Schema(
  {
    blog: { type: ObjectId, ref: "Blog", required: true },
    user: { type: ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

bookmarkSchema.index({ blog: 1, user: 1 }, { unique: true });

module.exports = model("Bookmark", bookmarkSchema);
