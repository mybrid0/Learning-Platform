const express = require("express");
const router = express.Router();
const { QuizCompletion } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");
//Posts a field once a quiz has been completed
router.post("/quiz-completion", validateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { score, subject } = req.body;
    console.log(userId, score, subject);

    const quizCompletion = await QuizCompletion.create({
      score: score,
      subject: subject,
      UserId: userId,
    });

    res.status(201).json({ success: true, data: quizCompletion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//Gets the high scores based of the user ID
router.get("/user/high-score", validateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const subjects = await QuizCompletion.findAll({
      attributes: ["subject"],
      where: { UserId: userId },
      group: ["subject"],
    });
    const highestScores = await Promise.all(
      subjects.map(async (subject) => {
        const highestScore = await QuizCompletion.max("score", {
          where: { subject: subject.subject, UserId: userId },
        });
        return { subject: subject.subject, score: highestScore };
      })
    );
    res.json({ success: true, data: highestScores });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
