require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(require("./middlewares/auth"));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/todo", require("./routes/ToDo"));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

// listen
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
