"use strict";

var router = require("express").Router();

var jwtverification = require("../../services/jwtverification");

var _require = require("./controller"),
    registerController = _require.registerController,
    loginController = _require.loginController,
    updateUserController = _require.updateUserController,
    deleteUserController = _require.deleteUserController; // Register a user


router.post("/register", registerController); // Login user

router.post("/login", loginController); // Update an user

router.patch("/", jwtverification, updateUserController); // Delete an user

router["delete"]("/", jwtverification, deleteUserController);
module.exports = router;