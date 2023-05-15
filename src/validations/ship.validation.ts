import * as yup from "yup";


const currentYear = new Date().getFullYear();

export const createShipSchema = yup.object().shape({
    shipName: yup
        .string()
        .required("Ship name is required")
        .min(3, "Ship name must be at least 3 characters"),
    shipType: yup
        .string()
        .required("Ship type is required")
    ,
    buildYear: yup
        .number()
        .required("Build year is required")
        .moreThan(1800, "Build year must be more than 1800")
        .max(currentYear + 1)
});