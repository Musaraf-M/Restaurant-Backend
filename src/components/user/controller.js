// Import
const User = require("./model");
const {
    registerValidation,
    loginValidation,
    userValidation
} = require("../../services/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register controller
const registerController = async (req, res) => {
    // Validation
    const {
        error
    } = registerValidation(req.body);

    if (error) {
        try {
            return res.status(400).send(error.details[0].message);
        } catch (err) {
            return res.status(400).send("Password of minimum length 6, must contain atleast 1 special character, 1 lowercase letter, 1 uppercase letter and 1 number");
        }
    }

    // If mail exist
    const isEmailExist = await User.findOne({
        email: req.body.email,
    });

    if (isEmailExist) {
        return res.status(400).send("Email already exist, try login!");
    }

    // Password hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        role: req.body.role,
    });

    try {
        const savedUser = await user.save();
        res.send({
            userId: savedUser._id,
        });
    } catch (err) {
        res.status(400).send(error);
    }
}

// Login controller
const loginController = async (req, res) => {
    // Validation
    const {
        error
    } = loginValidation(req.body);
    if (error) {
        try {
            return res.status(400).send(error.details[0].message);
        } catch (err) {
            return res.status(400).send("Password of minimum length 6, must contain atleast 1 special character, 1 lowercase letter, 1 uppercase letter and 1 number");
        }
    }
    // Check if user exists
    const user = await User.findOne({
        email: req.body.email
    });

    if (!user) {
        return res.status(400).send("Email not found, try creating an account!");
    }

    // Password check
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send("Password incorrect");
    }

    const token = jwt.sign({
            id: user._id,
            role: user.role
        },
        process.env.TOKEN_SECRET
    );

    res.header("auth-token", token).send({
        "auth-token": token,
    });
};



module.exports.registerController = registerController;
module.exports.loginController = loginController;