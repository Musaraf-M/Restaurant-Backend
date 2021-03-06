const router = require("express").Router();
const jwtverification = require("../../services/jwtverification");
const { adminVerification } = require("../../services/jwtverification");
const { 
    dishRegisterController, getDetailController, filterController
} = require("./controller");

// Register a user
router.post("/register", adminVerification, dishRegisterController);

// Get a result
router.get("/", jwtverification, getDetailController);


module.exports = router;