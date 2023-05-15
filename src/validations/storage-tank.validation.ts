import * as yup from "yup";

export const CreateStorageTankSchema = yup.object().shape({
    unit: yup
        .string()
        .required("Unit name is required"),
    capacity: yup
        .number()
        .required("Capacity is required")
        .moreThan(0, "Capacity must be more than 0"),
    wasteId: yup
        .string()
        .required("Waste is required")

});