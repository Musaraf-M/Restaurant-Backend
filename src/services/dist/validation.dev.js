"use strict";

var joi = require("joi"); // RegisterValidation


var registerValidation = function registerValidation(data) {
  var schema = joi.object({
    name: joi.string().min(6).required(),
    email: joi.string().min(6).email(),
    role: joi.string().valid('admin', 'user').insensitive(),
    password: joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")).error(function () {
      return new Error("");
    })
  });
  return schema.validate(data);
}; // Login Validation


var loginValidation = function loginValidation(data) {
  var schema = joi.object({
    email: joi.string().min(6).email(),
    password: joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")).error(function () {
      return new Error("");
    })
  });
  return schema.validate(data);
}; // User data validation


var userValidation = function userValidation(data) {
  var schema = joi.object({
    name: joi.string().min(6).required()
  });
  return schema.validate(data);
}; // Password Validation


var passwordValidation = function passwordValidation(data) {
  var schema = joi.object({
    oldPassword: joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")).error(function () {
      return new Error("");
    }),
    newPassword: joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")).error(function () {
      return new Error("");
    })
  });
  return schema.validate(data);
}; // Exports


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.userValidation = userValidation;
module.exports.passwordValidation = passwordValidation;