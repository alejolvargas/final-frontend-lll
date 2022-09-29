import { CheckoutInput, Order, Snackbar } from 'dh-marvel/features/checkout/checkout.types';
import React, { useMemo, useReducer, createContext, FC, Dispatch, PropsWithChildren } from 'react';

import { reducer, initialState, Action } from './reducer';

export interface OrderState {
    order: Order,
    snackbar: Snackbar,
    finishedOrder: CheckoutInput,
}

export type OrderContextState = {
    state: { order: Order, snackbar: Snackbar, finishedOrder: CheckoutInput },
    dispatch: Dispatch<Action>
}

export const OrderContext = createContext<OrderContextState | undefined>(undefined);

const ContextProvider: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const contextValue = useMemo(
        () => ({
            state,
            dispatch,
        }),
        [state, dispatch],
    );

    return (
        <OrderContext.Provider value={contextValue} >
            {children}
        </OrderContext.Provider>
    )

};

export default ContextProvider;