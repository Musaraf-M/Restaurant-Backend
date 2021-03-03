const router = require("express").Router();
const { 
    registerController, 
    loginController 
} = require("./controller");

// Register a user
router.post("/register", registerController);

// Login user
router.post("/login", loginController);

module.exports = router;