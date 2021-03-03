"use strict";

var jwt = require("jsonwebtoken");

var User = require("../components/user/model");

module.exports = function (req, res, next) {
  var token = req.header("auth-token");

  if (!token) {
    return res.status(400).send("Some error happened during authentication, please login again and try later");
  }

  try {
    var verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    console.log(req.user);
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};