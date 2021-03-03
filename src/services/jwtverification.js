const jwt = require("jsonwebtoken");
const User = require("../components/user/model");

module.exports = function (req, res, next) {
    const token = req.header("auth-token");

  if (!token) {
    return res
      .status(400)
      .send(
        "Some error happened during authentication, please login again and try later"
      );
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};