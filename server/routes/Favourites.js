const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/AuthMiddleware");
const { Favourite, Subject } = require("../models");

router.post("/like", validateToken, async (req, res) => {
  const { subjectId } = req.body;
  const userId = req.user.id;

  try {
    const found = await Favourite.findOne({
      where: {
        SubjectId: subjectId,
        UserId: userId,
      },
    });
    if (!found) {
      await Favourite.create({
        SubjectId: subjectId,
        UserId: userId,
      });
      res.status(200).json({ favourited: true });
    } else {
      await Favourite.destroy({
        where: {
          SubjectId: subjectId,
          UserId: userId,
        },
      });
      res.json({ favourited: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/", validateToken, async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  try {
    const foundFavourites = await Favourite.findAll({
      where: {
        UserId: userId,
      },
      include: [
        {
          model: Subject,
          attributes: ["id", "name", "description", "timeToComplete"],
        },
      ],
    });

    console.log(foundFavourites);

    res.status(200).json({ foundFavourites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
