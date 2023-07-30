// home-router.js

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const crypto = require("crypto");
const Password = require("../models/password-model");

router.route("/getpasswords").get(authMiddleware, async (req, res) => {
  try {
    // Fetch notes from the database based on the userId
    const data = await Password.find({ userId: req.user });
    res.json(data);
  } catch (error) {
    res.status(500).json("Error", error);
  }
});

router.route("/addPassword").post(authMiddleware, (req, res) => {
  const { name, password } = req.body;

  // AES encryption with CBC mode and a random IV
  const algorithm = process.env.ALGO;
  const key = Buffer.from(process.env.KEY, "hex");
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");

  const newPassword = new Password({
    name,
    password: encrypted.toString("hex"),
    iv: iv.toString("hex"),
    userId: req.body.userId,
  });

  newPassword
    .save()
    .then((result) => {
      res.status(200).json("Successfully created!");
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.route("/decryptpassword").post(authMiddleware, (req, res) => {
  // Decrypt the password for showing the user
  const { password, iv } = req.body;

  const algorithm = process.env.ALGO;
  const key = Buffer.from(process.env.KEY, "hex");
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(iv, "hex")
  );
  let decrypted = decipher.update(password, "hex", "utf8");
  decrypted += decipher.final("utf8");
  res.json({ password: decrypted });
});

router.route("/getrandom").get((req, res) => {
  // Generate a random password of the specified length
  function generateRandomPassword(length) {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!{}_@#+[=]-$%_;'^:^';--&*()~||!";
    const passwordBytes = crypto.randomBytes(length);
    const passwordArray = new Array(length);
    for (let i = 0; i < length; i++) {
      const randomIndex = passwordBytes[i] % charset.length;
      passwordArray[i] = charset[randomIndex];
    }
    return passwordArray.join("");
  }

  // Example usage
  const randomPassword = generateRandomPassword(12); // Generate a random password of length 12
  res.json({ password: randomPassword });
});

router.route("/password/:Id").delete(authMiddleware, (req, res) => {
  Password.findByIdAndDelete(req.params.Id)
    .then(() => {
      res.status(200).json({ message: "Successfully Deleted!" });
    })
    .catch((err) =>
      res.status(400).json({ message: "Error in fetching", error: err })
    );
});

module.exports = router;
