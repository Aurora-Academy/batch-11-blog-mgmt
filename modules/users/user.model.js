const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is already in use"],
    },
    password: { type: String, required: true },
    roles: {
      type: [String],
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    isEmailVerified: { type: Boolean, default: false }, // false
    isActive: { type: Boolean, default: true }, // Blocked or not?
    image: { type: String },
    token: { type: String },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
