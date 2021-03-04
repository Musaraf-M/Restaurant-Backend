const router = require("express").Router();
const jwtverification = require("../../services/jwtverification");
const { 
    dishRegisterController, getDetailController
} = require("./controller");

// Register a user
router.post("/register", dishRegisterController);

// Get a result
router.get("/", getDetailController);

module.exports = router;