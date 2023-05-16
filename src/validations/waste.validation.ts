import * as yup from "yup";


export const createWasteSchema = yup.object().shape({
    type: yup
        .string()
        .required("Type is required")
        .min(3, "Type must be at least 3 characters"),
    description: yup
        .string()
        .required("Description type is required")
        .min(5, "Description must be at least 5 characters")
    ,
});
