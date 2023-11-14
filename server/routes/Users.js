const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/AuthMiddleware");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists in the database
    const existingUser = await Users.findOne({ where: { username: username } });

    if (existingUser) {
      // If the username is already in use, send an error response
      res.status(400).json({ error: "Username already exists" });
    } else {
      // If the username is not in use, proceed to create the user
      const hash = await bcrypt.hash(password, 10);
      const newUser = await Users.create({
        username: username,
        password: hash,
      });

      res.json("SUCCESS");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
