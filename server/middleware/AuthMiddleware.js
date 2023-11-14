const { verify } = require("jsonwebtoken");
require("dotenv").config();

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) {
    return res.json({ error: "User not loggedf in" });
  } else {
    try {
      const validToken = verify(accessToken, process.env.SECRET);
      req.user = validToken;
      if (validToken) {
        return next();
      }
    } catch (error) {
      return res.json({ error: error });
    }
  }
};
module.exports = { validateToken };
