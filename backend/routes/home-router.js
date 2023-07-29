// home-router.js

const express = require("express");
const router = express.Router();
const Password = require("../models/password-model");
const authMiddleware = require("../middlewares/auth");

router.route("/getpasswords").get(authMiddleware, (req, res) => {
  try {
    // Fetch passwords from the database based on the userId
    const data = Password.find({ userId: req.user });
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

  //   const decipher = crypto.createDecipheriv(algorithm, key, iv);
  //   let decrypted = decipher.update(encrypted, "hex", "utf8");
  //   decrypted += decipher.final("utf8");
  //   console.log("Decrypted:", decrypted);

  const newPassword = new Password({
    name,
    password: encrypted.toString("hex"),
    iv: iv.toString("hex"),
    userId: req.body.userId,
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

router.route("/decryptpassword").post(authMiddleware, (req, res) => {
  // Decrypt the password for showing the user
  const { password, iv } = req.body;

  const algorithm = process.env.ALGO;
  const key = Buffer.from(process.env.KEY, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(password, "hex", "utf8");
  decrypted += decipher.final("utf8");
  res.json({ password: decrypted });
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
//   .put((req, res) => {
//     Password.findByIdAndUpdate(req.params.Id).then((item) => {
//         item.name = req.body.name;
//         item.password = req.body.password;
//         item
//         .save()
//         .then(() => res.json({ message: "Successfully updated!" }))
//         .catch((err) =>
//           res.status(400).json({ message: "Error in updating!", error: err })
//         );
//     });
//   });

module.exports = router;
