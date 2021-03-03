"use strict";

// Import
var User = require("./model");

var _require = require("../../services/validation"),
    registerValidation = _require.registerValidation,
    loginValidation = _require.loginValidation,
    userValidation = _require.userValidation;

var bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken"); // Register controller


var registerController = function registerController(req, res) {
  var _registerValidation, error, isEmailExist, salt, hashPassword, user, savedUser;

  return regeneratorRuntime.async(function registerController$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Validation
          _registerValidation = registerValidation(req.body), error = _registerValidation.error;

          if (!error) {
            _context.next = 9;
            break;
          }

          _context.prev = 2;
          return _context.abrupt("return", res.status(400).send(error.details[0].message));

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](2);
          return _context.abrupt("return", res.status(400).send("Password of minimum length 6, must contain atleast 1 special character, 1 lowercase letter, 1 uppercase letter and 1 number"));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 11:
          isEmailExist = _context.sent;

          if (!isEmailExist) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.status(400).send("Email already exist, try login!"));

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 16:
          salt = _context.sent;
          _context.next = 19;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, salt));

        case 19:
          hashPassword = _context.sent;
          user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            role: req.body.role
          });
          _context.prev = 21;
          _context.next = 24;
          return regeneratorRuntime.awrap(user.save());

        case 24:
          savedUser = _context.sent;
          res.send({
            userId: savedUser._id
          });
          _context.next = 31;
          break;

        case 28:
          _context.prev = 28;
          _context.t1 = _context["catch"](21);
          res.status(400).send(error);

        case 31:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 6], [21, 28]]);
}; // Login controller


var loginController = function loginController(req, res) {
  var _loginValidation, error, user, validPassword, token;

  return regeneratorRuntime.async(function loginController$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // Validation
          _loginValidation = loginValidation(req.body), error = _loginValidation.error;

          if (!error) {
            _context2.next = 9;
            break;
          }

          _context2.prev = 2;
          return _context2.abrupt("return", res.status(400).send(error.details[0].message));

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](2);
          return _context2.abrupt("return", res.status(400).send("Password of minimum length 6, must contain atleast 1 special character, 1 lowercase letter, 1 uppercase letter and 1 number"));

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 11:
          user = _context2.sent;

          if (user) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", res.status(400).send("Email not found, try creating an account!"));

        case 14:
          _context2.next = 16;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user.password));

        case 16:
          validPassword = _context2.sent;

          if (validPassword) {
            _context2.next = 19;
            break;
          }

          return _context2.abrupt("return", res.status(400).send("Password incorrect"));

        case 19:
          token = jwt.sign({
            id: user._id,
            role: user.role
          }, process.env.TOKEN_SECRET);
          res.header("auth-token", token).send({
            "auth-token": token
          });

        case 21:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 6]]);
}; // Update user details


var updateUserController = function updateUserController(req, res) {
  var _userValidation, error, updatedUser;

  return regeneratorRuntime.async(function updateUserController$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          // Validation
          _userValidation = userValidation(req.body), error = _userValidation.error;

          if (!error) {
            _context3.next = 3;
            break;
          }

          return _context3.abrupt("return", res.status(400).send(error.details[0].message));

        case 3:
          _context3.prev = 3;
          _context3.next = 6;
          return regeneratorRuntime.awrap(User.updateOne({
            _id: req.user.id
          }, {
            $set: req.body
          }));

        case 6:
          updatedUser = _context3.sent;
          res.json(updatedUser);
          _context3.next = 13;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](3);
          res.status(400).send(_context3.t0.message);

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[3, 10]]);
}; // Delete user account


var deleteUserController = function deleteUserController(req, res) {
  var deletedUser;
  return regeneratorRuntime.async(function deleteUserController$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.deleteOne({
            _id: req.user.id
          }));

        case 3:
          deletedUser = _context4.sent;
          res.json(deletedUser);
          _context4.next = 10;
          break;

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          res.status(400).send(_context4.t0.message);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

module.exports.registerController = registerController;
module.exports.loginController = loginController;
module.exports.updateUserController = updateUserController;
module.exports.deleteUserController = deleteUserController;