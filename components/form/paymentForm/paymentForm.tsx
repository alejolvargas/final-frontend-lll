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
import useOrder from '../../../context/useOrden';
import { setSnackbar, submitCard, submitForm } from '../../../context/action';


export type PaymentFormProps = {
    title: string,
    activeStep: number,
    steps: string[],
    handleFinish: (body: CheckoutInput | any) => any,
    handleBack: () => void,
}

const PaymentForm: FC<PaymentFormProps> = ({ title, activeStep, steps, handleFinish, handleBack }: PaymentFormProps) => {

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
            },
            card: {
                number: data.nroTarjeta,
                cvc: data.codSeguridad,
                expDate: data.fechaExp,
                nameOnCard: data.nombreTarjeta,
            },
            order: {
                name: state.order.comic.title,
                image: state.order.comic.img,
                price: state.order.comic.price,
            }
        }

        submitCard(dispatch, data);
        submitForm(dispatch)
        const res = await handleFinish(body)
    
        if (res.error)
            setSnackbar(dispatch, res.message);
        else
            router.push("/confirmacion-compra") 
    }

    useEffect(() => {
        setFocus("nroTarjeta")
    }, [setFocus])

    return (
        <FormProvider {...methods} >
            <form onSubmit={handleSubmit(onSubmit)} data-testid="payment-container">
                <h4>{title}</h4>
                <Stack >
                    <ControlledTextInput name="nombreTarjeta" label="Nombre Tarjeta" defaultValue="" />
                    <ControlledTextInput name="nroTarjeta" label="Numero Tarjeta" defaultValue="" />
                    <Stack direction="row" spacing={2}>
                        <ControlledTextInput name="fechaExp" label="Fecha de expiración" defaultValue="" />
                        <ControlledTextInput name="codSeguridad" label="Codigo de Seguridad" defaultValue="" type="password" />
                    </Stack>

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
                        {'Finalizar'}
                    </Button>
                </Box>
            </form>
        </FormProvider>
    )
}

export default PaymentForm