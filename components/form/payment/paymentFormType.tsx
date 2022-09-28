import *  as yup from 'yup';

export const cardSchema = yup.object({
    nroTarjeta: yup.string().required("Ingrese un número de tarjeta"),
    nombreTarjeta: yup.string().required("El nombre como figura en la tarjeta es requerido"),
    fechaExp: yup.string().required("La fecha de expiración es requerida"),
    codSeguridad: yup.string().required("Código de seguridad requerido"),
})


