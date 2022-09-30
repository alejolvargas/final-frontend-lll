import React from 'react'
import { FC, useEffect } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { addressSchema } from './addressFormType';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ControlledTextInput from '../imputText/ControlledTextInput';
import Stack from '@mui/material/Stack';
import { Address } from 'dh-marvel/features/checkout/checkout.types';
import useOrder from 'context/useOrden';
import { submitAddress } from 'context/action';
import Grid from '@mui/material/Grid';

type addressFormProps = {
    title: string,
    activeStep: number,
    steps: string[],
    handleNext: () => void,
    handleBack: () => void,
}

const AddressForm: FC<addressFormProps> = ({ title, activeStep, steps, handleNext, handleBack }: addressFormProps) => {
    const { state: { order: { address: { direccion, departamento, ciudad, provincia, codigoPostal } } }, dispatch } = useOrder();

    const methods = useForm<Address>({
        resolver: yupResolver(addressSchema),
        defaultValues: {
            direccion,
            departamento,
            ciudad,
            provincia,
            codigoPostal,
        }
    })

    const { setFocus, handleSubmit } = methods;

    const onSubmit = (data: Address) => {
        submitAddress(dispatch, data);
        handleNext();
    }

    useEffect(() => {
        setFocus("direccion")
    }, [setFocus])

    return (
        <FormProvider {...methods} >
            <form onSubmit={handleSubmit(onSubmit)}>
                <h4>{title}</h4>
                <Stack>
                    <ControlledTextInput name="direccion" label="dirección " defaultValue="" />
                    <ControlledTextInput name="departamento" label="departamento " defaultValue="" />
                    <ControlledTextInput name="ciudad" label="ciudad " defaultValue="" />
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <ControlledTextInput name="provincia" label="provincia " defaultValue="" />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <ControlledTextInput name="codigoPostal" label="codigo Postal " defaultValue="" />
                        </Grid>

                    </Grid>
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

export default AddressForm