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

module.exports = router;
