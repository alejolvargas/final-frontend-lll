import * as yup from "yup";


export const addressSchema = yup.object({
    direccion: yup.string().required("La dirección es requerida"),
    departamento: yup.string(),
    ciudad: yup.string().required("La ciudad es requerida"),
    provincia: yup.string().required("La provincia es requerida"),
    codigoPostal: yup.string().required("El codigo postal es requerido"),
})

