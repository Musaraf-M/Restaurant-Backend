const joi = require("joi");

// RegisterValidation
const registerValidation = (data) => {
    const schema = joi.object({
        name: joi.string().min(6).required(),
        email: joi.string().min(6).email(),
        role: joi.string().valid('admin', 'user').insensitive(),
        password: joi
            .string()
            .pattern(
                new RegExp(
                    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
                )
            )
            .error(() => {
                return new Error("");
            }),
    });

    return schema.validate(data);
};

// Login Validation
const loginValidation = (data) => {
    const schema = joi.object({
        email: joi.string().min(6).email(),
        password: joi
            .string()
            .pattern(
                new RegExp(
                    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
                )
            )
            .error(() => {
                return new Error("");
            }),
    });

    return schema.validate(data);
};

// User data validation
const userValidation = (data) => {
    const schema = joi.object({
        name: joi.string().min(6).required()
    });

    return schema.validate(data);
};

// Password Validation
const passwordValidation = (data) => {
    const schema = joi.object({
        oldPassword: joi
            .string()
            .pattern(
                new RegExp(
                    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
                )
            )
            .error(() => {
                return new Error("");
            }),
        newPassword: joi
            .string()
            .pattern(
                new RegExp(
                    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
                )
            )
            .error(() => {
                return new Error("");
            }),
    });

    return schema.validate(data);
};

// Exports
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.userValidation = userValidation;
module.exports.passwordValidation = passwordValidation;