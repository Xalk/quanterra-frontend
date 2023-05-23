import * as yup from "yup";
import {useTranslate} from "@/contexts/TranslateContext";


const currentYear = new Date().getFullYear();

export const createShipSchema = () => {
    const t = useTranslate();

    return yup.object().shape({
        shipName: yup
            .string()
            .required(t('ship.valid.ship_name.required'))
            .min(3, t('ship.valid.ship_name.min')),
        shipType: yup
            .string()
            .required(t('ship.valid.ship_type.required'))
        ,
        buildYear: yup
            .number().typeError(t('ship.valid.build_year.number'))
            .required(t('ship.valid.build_year.required'))
            .moreThan(1800, t('ship.valid.build_year.more'))
            .max(currentYear + 1, t('ship.valid.build_year.max'))
    });
}


