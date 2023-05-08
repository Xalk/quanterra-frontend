import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().email("Incorrect format").required("E-mail is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(4, "Password must be at least 4 characters"),
});

export const registerSchema = yup.object().shape({
    email: yup.string().email("Incorrect format").required("E-mail is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(4, "Password must be at least 4 characters"),
    firstName: yup
        .string()
        .required("First name is required")
        .min(2, "First name must be at least 2 characters"),
    lastName: yup
        .string()
        .required("Last name is required")
        .min(2, "Last name must be at least 2 characters"),
});
