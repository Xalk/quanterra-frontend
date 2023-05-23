import * as yup from "yup";
import {useTranslate} from "@/contexts/TranslateContext";

export const CreateCrewSchema = () => {
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
        email: yup.string().email(t('auth.valid.email.format')).required(t('auth.valid.email.required')),
        role: yup
            .string()
            .required(t('auth.valid.role.required'))

    });
}
