import { body, param } from "express-validator";

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

export const registerValidator = [
    phoneValidator,
    nameValidator,
    passwordValidator
];