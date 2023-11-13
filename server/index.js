const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const db = require("./models");

//Routers

//Commence Server
app.listen(process.env.PORT || 3001, () => {
  console.log("listening on http://localhost:3001");
});
