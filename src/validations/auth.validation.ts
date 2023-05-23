import * as yup from "yup";
import {useTranslate} from "@/contexts/TranslateContext";

export const loginSchema = () => {
    const t = useTranslate();

    return yup.object().shape({
        email: yup.string().email(t('auth.valid.email.format')).required(t('auth.valid.email.required')),
        password: yup
            .string()
            .required("Password is required")
            .min(3, "Password must be at least 3 characters"),
    });
}

export const registerSchema = () => {
    const t = useTranslate();

    return yup.object().shape({
        email: yup.string().email(t('auth.valid.email.format')).required(t('auth.valid.email.required')),
        password: yup
            .string()
            .required(t('auth.valid.password.required'))
            .min(3, t('auth.valid.password.min')),
        firstName: yup
            .string()
            .required(t('auth.valid.first_name.required'))
            .min(2, t('auth.valid.first_name.min')),
        lastName: yup
            .string()
            .required(t('auth.valid.last_name.required'))
            .min(2, t('auth.valid.last_name.min')),
    });
}

export const profileSchema = () => {
    const t = useTranslate();

    return yup.object().shape({
        firstName: yup
            .string()
            .required(t('auth.valid.first_name.required'))
            .min(2, t('auth.valid.first_name.min')),
        lastName: yup
            .string()
            .required(t('auth.valid.last_name.required'))
            .min(2, t('auth.valid.last_name.min')),
    });
}
