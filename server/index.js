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

//Commence Server
db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log("listening on http://localhost:3001");
  });
});
