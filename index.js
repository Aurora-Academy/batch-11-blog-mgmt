require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const indexRouter = require("./routes");
const PORT = Number(process.env.PORT) || 8000;

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database is connected..."))
  .catch((e) => console.log("Database connection failed", e.toString()));

app.use(morgan("tiny"));
app.use(express.json()); // enabling req.body
app.use("/resources", express.static("public")); // enabling file access from public folder

app.use("/api/v1", indexRouter);

app.use((err, req, res, next) => {
  const errMsg = err.toString() || "Something went wrong";
  res.status(500).json({ data: null, msg: errMsg });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
