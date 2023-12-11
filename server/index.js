// Setting up express app
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const db = require("./models");

//built in middleware
app.use(express.json());
app.use(cors());

//Routers
const usersRouter = require("./routes/Users");
app.use("/users", usersRouter);

const quizCompletionRouter = require("./routes/Quizzes");
app.use("/quiz", quizCompletionRouter);

const subjectRouter = require("./routes/Subjects");
app.use("/subjects", subjectRouter);

const favouriteRouter = require("./routes/Favourites");
app.use("/favourites", favouriteRouter);

//Commence Server
db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log("listening on http://localhost:3001");
  });
});
