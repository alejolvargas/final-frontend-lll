import { Card, CheckoutInput } from 'dh-marvel/features/checkout/checkout.types';
import React from 'react'
import { FC, useEffect } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import { cardSchema } from './paymentFormType';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ControlledTextInput from '../imputText/ControlledTextInput';
import Stack from '@mui/material/Stack';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from 'next/router';
import useOrder from 'context/useOrden';
import { setSnackbar, submitCard, submitForm } from 'context/action';


type paymentFormProps = {
    title: string,
    activeStep: number,
    steps: string[],
    handleNext: () => void,
    handleBack: () => void,
}

const PaymentForm: FC<paymentFormProps> = ({ title, activeStep, steps, handleNext, handleBack }: paymentFormProps) => {

    const router = useRouter();
    const { state: { order: { card: { nroTarjeta, nombreTarjeta, fechaExp, codSeguridad } } }, dispatch, state } = useOrder();

    const methods = useForm<Card>({
        resolver: yupResolver(cardSchema),
        defaultValues: {
            nroTarjeta,
            nombreTarjeta,
            fechaExp,
            codSeguridad,
        }
    })

    const { setFocus, handleSubmit } = methods;

    const onSubmit = async (data: Card) => {
        const body: CheckoutInput = {
            order: {
                name: state.order.comic.title,
                image: state.order.comic.img,
                price: state.order.comic.price,
            },
            card: {
                number: data.nroTarjeta,
                nameOnCard: data.nombreTarjeta,
                expDate: data.fechaExp,
                cvc: data.codSeguridad,
            },
            customer: {
                name: state.order.register.nombre,
                lastname: state.order.register.apellido,
                email: state.order.register.email,
                address: {
                    address1: state.order.address.direccion,
                    address2: state.order.address.departamento,
                    city: state.order.address.ciudad,
                    state: state.order.address.provincia,
                    zipCode: state.order.address.codigoPostal,
                }
            }
        };
        submitCard(dispatch, data);
        submitForm(dispatch)
        const JSONbody = JSON.stringify(body)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONbody,
        }
        const response = await fetch("/api/checkout", options)
        const result = await response.json()
        if (result.error)
            setSnackbar(dispatch, result.message);
        else
            router.push("/confirmacion-compra")
    }

    useEffect(() => {
        setFocus("nroTarjeta")
    }, [setFocus])

    return (
        <FormProvider {...methods} >
            <form onSubmit={handleSubmit(onSubmit)}>
                <h4>{title}</h4>
                <Stack >
                    <ControlledTextInput name="nroTarjeta" label="Numero Tarjeta " defaultValue="" />
                    <ControlledTextInput name="nombreTarjeta" label="Nombre Tarjeta " defaultValue="" />
                    <ControlledTextInput name="fechaExp" label="Fecha de expiración " defaultValue="" />
                    <ControlledTextInput name="codSeguridad" label="Codigo de Seguridad " defaultValue="" type="password" />
                </Stack>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Anterior
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button type="submit">
                        {activeStep === steps.length - 1 ? 'Finalizar' : 'Proximo'}
                    </Button>
                </Box>
            </form>
        </FormProvider>
    )
}

export default PaymentForm