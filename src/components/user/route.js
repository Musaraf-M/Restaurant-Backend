const router = require("express").Router();
const { registerController } = require("./controller");

// Register a user
router.post("/register", registerController);

module.exports = router;