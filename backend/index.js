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

app.post("/addPassword", (req, res) => {
  const { name, password } = req.body;

  // AES encryption with CBC mode and a random IV
  const algorithm = process.env.ALGO;
  const key = Buffer.from(process.env.KEY, "hex");
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");

//   const decipher = crypto.createDecipheriv(algorithm, key, iv);
//   let decrypted = decipher.update(encrypted, "hex", "utf8");
//   decrypted += decipher.final("utf8");
//   console.log("Decrypted:", decrypted);

  const newPassword = new Password({
    name,
    password: encrypted.toString("hex"),
    iv: iv.toString("hex")
  });

  newPassword
    .save()
    .then((res) => {
      res.json("Successfully created!");
    })
    .catch((err) => {
      res.json(err);
    });
});

app.listen(port, () => {
  console.log("Server is running at", port);
});
