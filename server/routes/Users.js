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

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
      return res.json({ error: "Invalid username or password" });
    } else {
      // Checks if password from body matches hashed password from database
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        7;
        // Create Access Token
        const accessToken = sign(
          { username: user.username, id: user.id },
          process.env.SECRET
        );
        // Responds with an object with token, username, and ID
        res.json({ token: accessToken, username: user.username, id: user.id });
      } else {
        res.json({ error: "Invalid password" });
      }
    }
  } catch (error) {
    console.error("Error in login route:", error);
    res.json({ error: "Internal server error" });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
