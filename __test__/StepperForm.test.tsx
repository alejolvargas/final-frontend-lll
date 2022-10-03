import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegisterFormProps } from 'dh-marvel/components/form/RegisterForm/RegisterForm';
import { AddressFormProps } from 'dh-marvel/components/form/addressForm/addressForm';
import { PaymentFormProps } from 'dh-marvel/components/form/paymentForm/paymentForm';
import StepperForm from 'dh-marvel/components/StepperForm';


const mockRegisterFormProps = jest.fn();
jest.mock('dh-marvel/components/form/RegisterForm/RegisterForm', () => jest.fn((props: RegisterFormProps) => {
    mockRegisterFormProps(props);
    return <div onClick={() => props.handleNext()}>
        RegisterForm
    </div>
}))


const mockAddressFormProps = jest.fn();
jest.mock('dh-marvel/components/form/addressForm/addressForm', () => jest.fn((props: AddressFormProps) => {
    mockAddressFormProps(props);
    return <div onClick={() => props.handleNext()}>
        AddressForm
    </div>
}))

const mockPaymentFormProps = jest.fn();
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({}),
    }),
) as jest.Mock

jest.mock('dh-marvel/components/form/paymentForm/paymentForm', () => jest.fn((props: PaymentFormProps) => {
    mockPaymentFormProps(props);
    return <div onClick={() => props.handleFinish({})}>
        PaymentForm
    </div>
}))



describe('StepperForm', () => {
    describe('when rendering default form', () => {
        it('should render the container', () => {
            render(<StepperForm />)
            const container = screen.getByTestId("stepper-container");
            expect(container).toBeInTheDocument()
        })
        it('should render the step 0 with title', () => {
            render(<StepperForm />)
            const form = screen.getByText('RegisterForm')
            expect(form).toBeInTheDocument()

            expect(mockRegisterFormProps).toBeCalledWith(
                expect.objectContaining({ activeStep: 0 })
            )
        })
    })
})

describe('when submitting register form', () => {
    it('should not render RegisterForm', async () => {
        render(<StepperForm />)
        const form = screen.getByText('RegisterForm')
        await userEvent.click(form); 
        expect(screen.queryByText('RegisterForm')).not.toBeInTheDocument();
    })
    it('should render AddressForm', async () => {
        render(<StepperForm />)
        const form = screen.getByText('RegisterForm')
        await userEvent.click(form);
        expect(screen.queryByText('AddressForm')).toBeInTheDocument();
    })
    it('should render PaymentForm', async () => {
        render(<StepperForm />)
        const form = screen.getByText('RegisterForm')
        await userEvent.click(form);

        const addressForm = screen.getByText('AddressForm')
        await userEvent.click(addressForm);

        expect(screen.queryByText('PaymentForm')).toBeInTheDocument();
    })
    it('should render Finished', async () => {
        render(<StepperForm />)

        const form = screen.getByText('RegisterForm')
        await userEvent.click(form);

        const addressForm = screen.getByText('AddressForm')
        await userEvent.click(addressForm);

        const PaymentForm = screen.getByText('PaymentForm')
        await userEvent.click(PaymentForm);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith(
            "/api/checkout", { "body": "{}", "headers": { "Accept-Type": "application/json", "Content-Type": "application/json" }, "method": "POST" }
        );
               
    })
    

})