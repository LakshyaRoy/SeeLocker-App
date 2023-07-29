const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const crypto = require("crypto");
const port = 8000 || process.env.PORT;
const Password = require("./models/password-model");

const app = express();
require("dotenv").config();

// Middlewares
app.use(cors());
app.use(express.json());

// Connecting to database
mongoose.connect(process.env.ATLAS_URI);
mongoose.connection.once("open", () => {
  console.log("Connected to the database!");
});

// Routes
const HomeRouter = require("./routes/home-router");
const UserRouter = require("./routes/user-router");

app.use("/api", HomeRouter);
app.use("/user", UserRouter);

app.listen(port, () => {
  console.log("Server is running at", port);
});
