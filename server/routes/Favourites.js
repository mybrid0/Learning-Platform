const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/AuthMiddleware");
const { Favourite, Subject } = require("../models");

//Route to like a subject
router.post("/like", validateToken, async (req, res) => {
  const { subjectId } = req.body;
  const userId = req.user.id;
  //Finds Favourite
  try {
    const found = await Favourite.findOne({
      where: {
        SubjectId: subjectId,
        UserId: userId,
      },
    });

    //if the favourite is not there, then it creates a field.
    if (!found) {
      await Favourite.create({
        SubjectId: subjectId,
        UserId: userId,
      });
      res.status(200).json({ favourited: true });

      //If there is already a field, then the field is removed.
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

//Getting all favourites
router.get("/", validateToken, async (req, res) => {
  const userId = req.user.id;
  //Find all Favourites for the user that is logged in
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

    res.status(200).json({ foundFavourites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
