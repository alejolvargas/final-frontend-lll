import { render, screen } from '@testing-library/react';
import Confirmacion from 'dh-marvel/pages/confirmacion-compra.page';
import useOrder from "../../context/useOrden";
import ContextProvider, { OrderState } from '../../context/index';

jest.mock("../../context/useOrden")
const mockUseOrder = useOrder as jest.MockedFunction<typeof useOrder>
const mockDispatch = jest.fn();
mockUseOrder.mockReturnValue({
    state: {
        orderDetail:{
            order: {
                name: "hulk",
                image: "url:qwert",
                price: 1233,
            },
            customer: {
                name: "hulk",
               
                email: "aa@gmail.com",
                address: {
                    address1: "callefalsa",
                    city: "bogota",
                    
                   
                }
            }
        }
    } as OrderState,
    dispatch: mockDispatch
})


describe('faqa', () => {
    it('should render the faqs', () => {
        render(
            <ContextProvider>
                   <Confirmacion />
            </ContextProvider>
        )
    
     
        const text = screen.getByText(/Que disfrutes tu compra/i)
        expect(text).toBeInTheDocument()
    })
})