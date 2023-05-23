import * as yup from "yup";
import {useTranslate} from "@/contexts/TranslateContext";


export const createWasteSchema = () => {
    const t = useTranslate();

    return  yup.object().shape({
        type: yup
            .string()
            .required(t('waste.valid.type.required'))
            .min(3, t('waste.valid.type.min')),
        description: yup
            .string()
            .required(t('waste.valid.description.required'))
            .min(5, t('waste.valid.description.min'))
        ,
    });
}


