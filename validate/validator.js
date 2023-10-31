import { check, validationResult } from "express-validator";


const userRegiVal = [

    check("username").notEmpty().withMessage("Username cannot be empty"),
    check("email").notEmpty().withMessage("Email cannot be empty"),
    check("password").notEmpty().withMessage("Password cannot be empty"),

    (req, res, next) => {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            return res.send({ status: 0, response: errors[0].msg });
        } else {
            return next();
        }
    },
];

const userVerify = [

    check("otp").notEmpty().withMessage("OTP cannot be empty"),

    (req, res, next) => {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            return res.send({ status: 0, response: errors[0].msg });
        } else {
            return next();
        }
    },
];


const userLogVal = [

    check("email").notEmpty().withMessage("Email cannot be empty"),
    check("password").notEmpty().withMessage("Password cannot be empty"),

    (req, res, next) => {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            return res.send({ status: 0, response: errors[0].msg });
        } else {
            return next();
        }
    },
];


const creatVal = [

    check("title").notEmpty().withMessage("Title cannot be empty"),
    check("author").notEmpty().withMessage("Author cannot be empty"),
    check("summary").notEmpty().withMessage("Summary cannot be empty"),

    (req, res, next) => {
        const errors = validationResult(req).array();
        if (errors.length > 0) {
            return res.send({ status: 0, response: errors[0].msg });
        } else {
            return next();
        }
    },
];



export { userRegiVal, userLogVal, userVerify, creatVal }

