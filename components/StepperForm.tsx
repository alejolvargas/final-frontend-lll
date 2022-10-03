import React, { FC } from 'react'
import RegisterForm from 'dh-marvel/components/form/RegisterForm/RegisterForm';
import AddressForm from 'dh-marvel/components/form/addressForm/addressForm';
import PaymentForm from 'dh-marvel/components/form/paymentForm/paymentForm';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { CheckoutInput } from 'dh-marvel/features/checkout/checkout.types';
import router from 'next/router';

const steps = ['Datos personales', 'Dirección de entrega', 'Datos de pago'];

const StepperForm: FC = () => {
    const [activeStep, setActiveStep] = React.useState(0);


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleFinish = async (body: CheckoutInput | any) => {
        
        const response = await fetch("/api/checkout", {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Accept-Type': 'application/json', },
            body: JSON.stringify(body)
        });
        console.log(response)
        return await response.json();
        
    }


  return (
      <>
          <Stepper activeStep={activeStep} data-testid="stepper-container">
              {steps.map((label, index) => {
                  const stepProps: { completed?: boolean } = {};
                  const labelProps: {
                      optional?: React.ReactNode;
                  } = {};

                  return (
                      <Step key={label} {...stepProps}>
                          <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                  );
              })}
          </Stepper>
          {activeStep === 0 &&
              <RegisterForm title={steps[activeStep]} activeStep={activeStep} steps={steps} handleBack={handleBack} handleNext={handleNext} />
          }
          {activeStep === 1 &&
              <AddressForm title={steps[activeStep]} activeStep={activeStep} steps={steps} handleBack={handleBack} handleNext={handleNext} />
          }
          {activeStep === 2 &&
              <PaymentForm title={steps[activeStep]} activeStep={activeStep} steps={steps} handleBack={handleBack} handleFinish={handleFinish} />
          }
      </> 

  )
        
}

export default StepperForm