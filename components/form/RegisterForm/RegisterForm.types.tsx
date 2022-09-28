import * as yup from "yup";

export const registerSchema = yup.object({
    nombre: yup.string().required("El nombre es requerido"),
    apellido: yup.string().required("El apellido es requerido"),
    email: yup.string().email("Debe ser un email válido").required("El campo es requerido"),
})

