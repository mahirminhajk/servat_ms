import * as Yup from "yup";
import { InferType } from "yup";

export const loginValidationSchema = Yup.object().shape({
    phone: Yup.string()
        .matches(/^[0-9]*$/, "Phone number must contain only digits")
        .required("Phone number is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
});

export type LoginFormValues = InferType<typeof loginValidationSchema>;

export const registerValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
        .matches(/^[0-9]*$/, "Phone number must contain only digits")
        .required("Phone number is required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
});

export type RegisterFormValues = InferType<typeof registerValidationSchema>;