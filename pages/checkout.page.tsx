import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useOrder from 'context/useOrden';
import { setSnackbar } from 'context/action';
import { useEffect } from 'react';
import RegisterForm from 'dh-marvel/components/form/RegisterForm/RegisterForm';
import AddressForm from 'dh-marvel/components/form/addressForm/addressForm';
import PaymentForm from 'dh-marvel/components/form/paymentForm/paymentForm';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const steps = ['Datos personales', 'Dirección de entrega', 'Sección de pago'];

const Checkout: NextPage = () => {

    const router = useRouter();
    const { state: { order: { comic: { title, img, price } } }, state: { snackbar: { open, message } }, dispatch } = useOrder();
    console.log(title)
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onSubmit = () => {
        setActiveStep(0);
    };

    const handleClose = () => {
        setSnackbar(dispatch, "")
    }

     useEffect(() => {
        if (title === "")
            router.push("/")
    }, [])
 

    return (
     <LayoutCheckout>
        
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <Box sx={{ width: '100%' }}>
                            <Stepper activeStep={activeStep}>
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
                            
                            
                            
                            
                                { activeStep === 0 &&
                                <RegisterForm title={steps[activeStep]} activeStep={activeStep} steps={steps} handleBack={handleBack} handleNext={handleNext} />
                                }
                                {activeStep === 1 &&
                                <AddressForm title={steps[activeStep]} activeStep={activeStep} steps={steps} handleBack={handleBack} handleNext={handleNext} />
                                }
                                {activeStep === 2 &&
                                <PaymentForm title={steps[activeStep]} activeStep={activeStep} steps={steps} handleBack={handleBack} handleNext={handleNext} />
                                } 
                            
                              
                           
                        </Box>
                    </Grid>
            
                    <Grid item xs={4}>
                        <Item>
                            <Card >
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={img}
                                    alt={title}

                                />
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                                            {title}
                                    </Typography>
                                    <Typography variant="body1">
                                                            {price}
                                    </Typography>
                                    
                                </CardContent>
                            </Card>
                        </Item>
                    </Grid>

                </Grid>
            </Box>
     </LayoutCheckout>
    );
}


export default Checkout;



/*     {activeStep === 0 &&
                                               <RegisterForm title={steps[activeStep]} activeStep={activeStep} steps={steps} handleBack={handleBack} handleNext={handleNext} />
                                           }
                                           {activeStep === 1 &&
                                               <AddressForm title={steps[activeStep]} activeStep={activeStep} steps={steps} handleBack={handleBack} handleNext={handleNext} />
                                           }
                                           {activeStep === 2 &&
                                               <PaymentForm title={steps[activeStep]} activeStep={activeStep} steps={steps} handleBack={handleBack} handleNext={handleNext} />
                                           } */
