import RegisterForm, { RegisterFormProps } from "dh-marvel/components/form/RegisterForm/RegisterForm";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useOrder from "../context/useOrden";
import ContextProvider, { OrderState} from '../context/index';


jest.mock("../context/useOrden")
const mockUseOrder = useOrder as jest.MockedFunction<typeof useOrder>
const mockDispatch = jest.fn();
mockUseOrder.mockReturnValue({
    state: {
        order: {
            register: {
                nombre: "nameTest",
                apellido: "diaz",
                email: "emailTest@gmail.com",
             },
        }
    } as OrderState,
    dispatch: mockDispatch
})



describe('RegisterForm', () => {
    describe('when rendering default form', () => {
        it('should render the form', () => {
            const mockHandleNext = jest.fn();
            const mockHandleBack = jest.fn();
            render(<RegisterForm title={"testTitle"} activeStep={0} steps={["step"] } handleNext={mockHandleNext} handleBack={mockHandleBack} />)
            const container = screen.getByTestId("register-container");
            expect(container).toBeInTheDocument()
        })
    })
    describe('when rendering submitting form', () => {
        it('should hit the dispatch', async () => {
            const mockHandleNext = jest.fn();
            const mockHandleBack = jest.fn();
            render(
                <ContextProvider>
                    <RegisterForm title={"title"} activeStep={0} steps={["step"]} handleNext={mockHandleNext} handleBack={mockHandleBack } />
                </ContextProvider>
            )

            userEvent.type(screen.getByRole('textbox', { name: 'nombre' }), "nameTest")
            userEvent.type(screen.getByRole('textbox', { name: 'apellido' }), "diaz")
            userEvent.type(screen.getByRole('textbox', { name: 'email@.com' }), "emailTe@gmail.com")



            userEvent.click(screen.getByRole('button', { name: 'Proximo' }));



            await waitFor(() => {
                expect(mockHandleNext).toBeCalled();
            })
            expect(mockDispatch).toBeCalledWith({
                payload: {
                    nombre: 'nameTest',
                    apellido: 'diaz',
                    email: 'emailTest@gmail.com'
                },
                type: "SUBMIT_REGISTER"
            })

        })
    })
})        