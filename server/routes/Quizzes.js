const express = require("express");
const router = express.Router();
const { QuizCompletion } = require("../models");

router.post("/quiz-completion", async (req, res) => {
  try {
    const { userId, score, subject } = req.body;
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

router.get("/user/high-score/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

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
