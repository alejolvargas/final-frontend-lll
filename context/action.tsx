import { Address, Card, ComicInfo, RegisterFormData } from 'dh-marvel/features/checkout/checkout.types';
import { Dispatch } from 'react';
import { Action } from './reducer';


export const selectComic = (dispatch: Dispatch<Action>, comic: ComicInfo) => {
    dispatch({ type: 'ADD_COMIC', payload: comic })
}

export const submitRegister = (dispatch: Dispatch<Action>, register: RegisterFormData) => {
    dispatch({ type: 'SUBMIT_REGISTER', payload: register });
}

export const submitAddress = (dispatch: Dispatch<Action>, address: Address) => {
    dispatch({ type: 'SUBMIT_ADDRESS', payload: address });
}

export const submitCard = (dispatch: Dispatch<Action>, card: Card) => {
    dispatch({ type: 'SUBMIT_CARD', payload: card });
}

export const submitForm = (dispatch: Dispatch<Action>) => {
    dispatch({ type: 'SUBMIT_FORM' })
};

export const restoreState = (dispatch: Dispatch<Action>) => {
    dispatch({ type: 'RESTORE_STATE' })
}

export const setSnackbar = (dispatch: Dispatch<Action>, snackbar: string) => {
    dispatch({ type: 'SET_SNACKBAR', payload: snackbar })
}