import * as yup from "yup";


export const createSensorSchema = yup.object().shape({
    name: yup
        .string()
        .required("Sensor name is required")
        .min(3, "Sensor name must be at least 3 characters")
    ,
});
