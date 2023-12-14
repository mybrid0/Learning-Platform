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

router.put("/update-xp/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { score } = req.body;

    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    const xpEarned = score * 50;

    // Calculate new XP and XP level
    const newXP = user.xp + xpEarned;
    const newLevel = calculateXPLevel(newXP);

    await user.update({ xp: newXP, xpLevel: newLevel });
    res.json({ success: true, message: "XP UPDATED" });
  } catch (error) {
    console.log("Error Updating XP:", error);
    res.status(500).json({ error: "internal server error" });
  }
});

const calculateXPLevel = (xp) => {
  // Define XP thresholds for each level
  const levelThresholds = [
    0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
  ];

  // Find the highest threshold that the user's XP exceeds
  let level = 0;
  while (levelThresholds[level + 1] && xp >= levelThresholds[level + 1]) {
    level++;
  }

  return level;
};

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/userData", validateToken, async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  try {
    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      xp: user.xp,
      xpLevel: user.xpLevel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/leaderboards", async (req, res) => {
  try {
    // Fetch the top 10 users based on XP
    const leaderboards = await Users.findAll({
      attributes: ["id", "username", "xp"],
      order: [["xp", "DESC"]],
      limit: 10,
    });

    res.status(200).json(leaderboards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getUser/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await Users.findByPk(userId, {
      attributes: ["id", "username", "xp", "xpLevel"],
    });
    if (!user) {
      res.status(404).json({ error: "User Not Found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
