import { body, param, header } from "express-validator";

const phoneValidator = body("phone")
    .notEmpty().withMessage("phone is required.")
    .isMobilePhone("en-IN").withMessage("phone is invalid.");

const nameValidator = body("name")
    .notEmpty().withMessage("name is required.")
    .isString().withMessage("name is invalid.");

const passwordValidator = body("password")
    .notEmpty().withMessage("password is required.")
    .isString().withMessage("password is invalid.")
    .isLength({ min: 8 }).withMessage("password must be at least 8 characters.");

const otpValidator = body("otp")
    .notEmpty().withMessage("otp is required.")
    .isString().withMessage("otp is invalid.")
    .isLength({ min: 6, max: 6 }).withMessage("otp must be 6 characters.");

const otokenValidator = header("x-otoken")
    .notEmpty().withMessage("otoken is required.")
    .isString().withMessage("otoken is invalid.");

export const registerValidator = [
    phoneValidator,
    nameValidator,
    passwordValidator
];

export const verifyValidator = [
    otpValidator,
    otokenValidator
];

export const loginValidator = [
    phoneValidator,
    passwordValidator
];