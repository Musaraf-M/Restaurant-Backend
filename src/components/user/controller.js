// Import
const User = require("./model");
const {
    registerValidation,
    loginValidation,
    userValidation,
    passwordValidation
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

// Update user details
const updateUserController = async (req, res) => {
    // Validation
    const {
        error
    } = userValidation(req.body);
    
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const updatedUser = await User.updateOne({
            _id: req.user.id
        }, {
            $set: req.body
        });

        res.json(updatedUser);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Delete user account
const deleteUserController = async (req, res) => {
    try {
        const deletedUser = await User.deleteOne({
            _id: req.user.id,
        });

        res.json(deletedUser);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Change password of an user
const changePasswordController = async (req, res) => {
    // Validation
    const {
        error
    } = passwordValidation(req.body);
    if (error) {
        return res
            .status(400)
            .send(
                "Password of minimum length 6, must contain atleast 1 special character, 1 lowercase letter, 1 uppercase letter and 1 number"
            );
    }

    // Check if user exists
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(400).send("Email not found, try creating an account!");
    }

  // Password check
  const validPassword = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );
  if (!validPassword) {
    console.log(user.password);
    return res.status(400).send("Old password incorrect");
    
  }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.newPassword, salt);

    try {
        const updatedPassword = await User.updateOne({
            _id: req.user.id
        }, {
            $set: {
                password: hashPassword
            }
        });

        res.json(updatedPassword);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

module.exports.registerController = registerController;
module.exports.loginController = loginController;
module.exports.updateUserController = updateUserController;
module.exports.deleteUserController = deleteUserController;
module.exports.changePasswordController = changePasswordController;