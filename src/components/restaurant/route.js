const router = require("express").Router();
const jwtverification = require("../../services/jwtverification");
const { adminVerification } = require("../../services/jwtverification");
const { restaurantRegisterController, getDetailController } = require("./controller");

// Register a user
router.post("/register", jwtverification, restaurantRegisterController);

// Get a result
router.get("/", jwtverification, getDetailController);

module.exports = router;