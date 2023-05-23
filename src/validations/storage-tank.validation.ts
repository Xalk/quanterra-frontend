import * as yup from "yup";
import {useTranslate} from "@/contexts/TranslateContext";

export const CreateStorageTankSchema = () => {
    const t = useTranslate();

    return  yup.object().shape({
        unit: yup
            .string()
            .required(t('storage_tank.valid.unit.required')),
        capacity: yup
            .number()
            .required(t('storage_tank.valid.capacity.required'))
            .moreThan(0, t('storage_tank.valid.capacity.more')),
        wasteId: yup
            .string()
            .required(t('storage_tank.valid.waste_type.required'))

    });
}

