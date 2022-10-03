import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddressForm from 'dh-marvel/components/form/addressForm/addressForm';
import useOrder from "../context/useOrden";
import ContextProvider, { OrderState } from '../context/index';


jest.mock("../context/useOrden")
const mockUseOrder = useOrder as jest.MockedFunction<typeof useOrder>
const mockDispatch = jest.fn();
mockUseOrder.mockReturnValue({
    state: {
        order: {
            address: {
                direccion: "callefalsa",
                departamento: "bogota",
                ciudad: "bogota",
                provincia: "bogota",
                codigoPostal: "13"
            },
        }
    } as OrderState,
    dispatch: mockDispatch
})




describe('AddressForm', () => {
    describe('when rendering default form', () => {
        it('should render the form', () => {
            const mockHandleNext = jest.fn();
            const mockHandleBack = jest.fn();
            render(<AddressForm title={"testTitle"} activeStep={0} steps={["step"]} handleNext={mockHandleNext} handleBack={mockHandleBack} />)
            const container = screen.getByTestId("address-container");
            expect(container).toBeInTheDocument()
        })
    })
    describe('when rendering submitting form', () => {
        it('should hit the dispatch', async () => {
            const mockHandleNext = jest.fn();
            const mockHandleBack = jest.fn();
            render(
                <ContextProvider>
                    <AddressForm title={"title"} activeStep={0} steps={["step"]} handleNext={mockHandleNext} handleBack={mockHandleBack} />
                </ContextProvider>
            )

            userEvent.type(screen.getByRole('textbox', { name: 'direccion' }), "callefalsa")
            userEvent.type(screen.getByRole('textbox', { name: 'departamento' }), "bogota")
            userEvent.type(screen.getByRole('textbox', { name: 'ciudad' }), "bogota")
            userEvent.type(screen.getByRole('textbox', { name: 'provincia' }), "bogota")
            userEvent.type(screen.getByRole('textbox', { name: 'codigo Postal' }), "13")



            userEvent.click(screen.getByRole('button', { name: 'Proximo' }));



            await waitFor(() => {
                expect(mockHandleNext).toBeCalled();
            })
            expect(mockDispatch).toBeCalledWith({
                payload: {
                    direccion: "callefalsa",
                    departamento: "bogota",
                    ciudad: "bogota",
                    provincia: "bogota",
                    codigoPostal: "13"
                },
                type: "SUBMIT_ADDRESS"
            })

        })
    })
})