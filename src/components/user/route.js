const router = require("express").Router();
const jwtverification = require("../../services/jwtverification");
const { 
    registerController, 
    loginController, 
    updateUserController,
    deleteUserController
} = require("./controller");

// Register a user
router.post("/register", registerController);

// Login user
router.post("/login", loginController);

// Update an user
router.patch("/", jwtverification, updateUserController);

// Delete an user
router.delete("/", jwtverification, deleteUserController);

module.exports = router;