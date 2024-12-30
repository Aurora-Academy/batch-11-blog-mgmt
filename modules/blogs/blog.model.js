const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    author: { type: ObjectId, ref: "User", required: true },
    image: { type: String },
    content: { type: String, required: true },
    status: { type: String, enum: ["published", "draft"], default: "draft" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Blog", blogSchema);
