const express = require("express");
const router = express.Router();
const { Subject } = require("../models");

router.get("/", async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    res.json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:id", async (req, res) => {
  const subjectId = req.params.id;
  try {
    const subject = await Subject.findByPk(subjectId);
    console.log(subject);

    if (subject) {
      res.status(200).json({ subject });
    } else {
      res.status(404).json({ error: "subject not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
