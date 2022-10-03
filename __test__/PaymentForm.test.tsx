import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useOrder from "../context/useOrden";
import ContextProvider, { OrderState } from '../context/index';
import PaymentForm from 'dh-marvel/components/form/paymentForm/paymentForm';


jest.mock("../context/useOrden")
const mockUseOrder = useOrder as jest.MockedFunction<typeof useOrder>
const mockDispatch = jest.fn();
mockUseOrder.mockReturnValue({
    state: {
        order: {
            card: {
                nroTarjeta: "1234",
                nombreTarjeta: "diaz",
                fechaExp: "12/22",
                codSeguridad: "123"
            }/* 
            register: {
                nombre: "nameTest",
                apellido: "diaz",
                email: "emailTest@gmail.com",
            },
            address: {
                direccion: "callefalsa",
                departamento: "bogota",
                ciudad: "bogota",
                provincia: "bogota",
                codigoPostal: "13"
            },
            comic: {
                title:"hulk",
                img: "gfdsdfgfddfg",
                price: 40,
            }
            */
        }

    } as OrderState,
    dispatch: mockDispatch
})

describe('PaymentForm', () => {
    describe('when rendering default form', () => {
        it('should render the form', () => {
            const mockHandleFinish = jest.fn();
            const mockHandleBack = jest.fn();
            render(<PaymentForm title={"testTitle"} activeStep={0} steps={["step"]} handleFinish={mockHandleFinish} handleBack={mockHandleBack} />)
            const container = screen.getByTestId("payment-container");
            expect(container).toBeInTheDocument()
        })
    })

    describe('when rendering submitting form', () => {
        it('should hit the dispatch', async () => {
            const mockHandleFinish = jest.fn();
            const mockHandleBack = jest.fn();
            render(
                <ContextProvider>
                    <PaymentForm title={"testTitle"} activeStep={0} steps={["step"]} handleFinish={mockHandleFinish} handleBack={mockHandleBack} />
                </ContextProvider>
            )

            userEvent.type(screen.getByRole('textbox', { name: 'Nombre Tarjeta' }), "diaz")
            userEvent.type(screen.getByRole('textbox', { name: 'Numero Tarjeta' }), "1234")
            userEvent.type(screen.getByRole('textbox', { name: 'Fecha de expiración' }), "12/22")
            userEvent.type(screen.getByLabelText(/Codigo de Seguridad/i),"123") 
     


            userEvent.click(screen.getByRole('button', { name: 'Finalizar' }));



         /*    await waitFor(() => {
                expect(mockHandleFinish).toBeCalled();
            }) */
            expect(mockDispatch).toBeCalledWith({
                payload: { 
                    codSeguridad: "123", 
                    fechaExp: "12/22",
                    nombreTarjeta: "diaz",
                    nroTarjeta: "1234" 
                }, type: "SUBMIT_CARD"
            })
       
        })
    })

})    