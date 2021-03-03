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
const registerController = async (req,res) => {
    // Validation
    const { error } = registerValidation(req.body);

    if(error){
        try{
            return res.status(400).send(error.details[0].message);
        } catch (err) {
            return res.status(400).send("Password of minimum length 6, must contain atleast 1 special character, 1 lowercase letter, 1 uppercase letter and 1 number");
        }
    }

    // If mail exist
    const isEmailExist = await User.findOne({
        email: req.body.email,
    });

    if(isEmailExist) {
        return res.status(400).send("Email already exist, try login!");
    }

    // Password hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role,
    });

    try{
        const savedUser = await user.save();
        res.send({
            userId: savedUser._id,
        });
    } catch (err) {
        res.status(400).send(error);
    }
}

module.exports.registerController = registerController;