const { verify } = require("jsonwebtoken");
require("dotenv").config();

const validateToken = (req, res, next) => {
  //Get the access token from the request header
  const accessToken = req.header("accessToken");

  // Error if no token
  if (!accessToken) {
    return res.json({ error: "User not logged in" });
  } else {
    // Verify the token using env Secret,
    try {
      const validToken = verify(accessToken, process.env.SECRET);
      // Set the user information if the token is valid
      req.user = validToken;

      //Continue to the next route
      if (validToken) {
        return next();
      }
    } catch (error) {
      //Handles Errors
      return res.json({ error: error });
    }
  }
};
module.exports = { validateToken };
