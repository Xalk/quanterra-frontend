import * as yup from "yup";
import {useTranslate} from "@/contexts/TranslateContext";


export const createSensorSchema = () => {
    const t = useTranslate();

    return yup.object().shape({
        name: yup
            .string()
            .required(t('sensor.valid.name.required'))
            .min(3, t('sensor.valid.name.min'))
        ,
    });
}
