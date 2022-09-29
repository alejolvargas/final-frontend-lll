import React from 'react'
import { FC, useEffect } from "react";
import ControlledTextInput from '../imputText/ControlledTextInput';
import { FormProvider, useForm } from "react-hook-form";
import Stack from '@mui/material/Stack';
import { registerSchema } from './RegisterForm.types';
import { yupResolver } from "@hookform/resolvers/yup";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { RegisterFormData } from 'dh-marvel/features/checkout/checkout.types';
import useOrder from 'context/useOrden';
import { submitRegister } from 'context/action';



type RegisterFormProps = {
    title: string,
    activeStep: number,
    steps: string[],
    handleNext: () => void,
    handleBack: () => void,
}

const RegisterForm: FC<RegisterFormProps> = ({ title, activeStep, steps, handleNext, handleBack }: RegisterFormProps) => {
    const { state: { order: { register: { nombre, apellido, email } } }, dispatch } = useOrder();

    const methods = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            nombre: nombre,
            apellido: apellido,
            email: email,
        }
    
    })
    const { setFocus, handleSubmit } = methods;


    const onSubmit = (data: RegisterFormData) => {
        submitRegister(dispatch, data);
        handleNext();
    }

    useEffect(() => {
        setFocus("nombre")
    }, []);

  return ( 

     <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
             <h4>{title}</h4>
            <Stack>
                    <ControlledTextInput name="nombre" label="nombre" />
                    <ControlledTextInput name="apellido" label="apellido" />
                    <ControlledTextInput name="email" label="email@.com" />
            
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

export default RegisterForm


/* 
  ejemplo

import { Stack } from "@mui/material";
import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ControlledTextInput from "../ControlledTextInput";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import StepperNavigation from "../StepperNavigation";
import { RegisterFormData, registerFormSchema } from "./RegisterForm.types";



export type RegisterFormProps = {
    activeStep: number,
    handleNext: (data: RegisterFormData) => void;
}

const RegisterForm: FC<RegisterFormProps> = ({ activeStep, handleNext }: RegisterFormProps) => {

    const methods = useForm<RegisterFormData>({
        resolver: yupResolver(registerFormSchema),
        defaultValues: {
            firstname: "Test",
            lastname: "User",
            email: "test@user.com",
        }
    });
    const { setFocus, handleSubmit } = methods;

    const onSubmit = (data: RegisterFormData) => {
        console.log(JSON.stringify(data));
        handleNext();
    }

    useEffect(() => {
        setFocus("email")
    }, []);

    return <Stack>
        <h4>Paso 1</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormProvider {...methods}>
                <ControlledTextInput name="email" label="Email" />
                <ControlledTextInput name="firstname" label="First Name" />
                <ControlledTextInput name="lastname" label="Last Name" />
            </FormProvider>
        </form>
        <StepperNavigation activeStep={activeStep}
            onPrevClick={() => console.log('do nothing')}
            onNextClick={handleSubmit(onSubmit)}
        />
    </Stack>
}

export default RegisterForm; */