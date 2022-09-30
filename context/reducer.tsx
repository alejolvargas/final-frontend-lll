import { OrderState } from 'context';
import { Address, Card, CheckoutInput, ComicInfo, RegisterFormData } from 'dh-marvel/features/checkout/checkout.types';


export type Action =
    | { type: 'ADD_COMIC', payload: ComicInfo }
    | { type: 'SUBMIT_REGISTER', payload: RegisterFormData }
    | { type: 'SUBMIT_ADDRESS', payload: Address }
    | { type: 'SUBMIT_CARD', payload: Card }
    | { type: 'SUBMIT_FORM' }
    | { type: 'RESTORE_STATE' }
    | { type: 'SET_SNACKBAR', payload: string }

export const initialState: OrderState = {
    order: {
        comic: {
            img: "",
            price: 0,
            title: "",
        },
        register: {
            nombre: "pepe",
            apellido: "diaz",
            email: "as@gmail.com",
        },
        address: {
            direccion: "calle 123",
            departamento: "bogota",
            ciudad: "bogota",
            provincia: "bogota",
            codigoPostal: "123",
        },
        card: {
            nroTarjeta: "4242 4242 4242 4242",
            nombreTarjeta: "diaz pepe",
            fechaExp: "12/22",
            codSeguridad: "",
        },
    },
    snackbar: {
        open: false,
        message: "",
    },
    orderDetail: {} as CheckoutInput,
};

export const reducer = (state: OrderState, action: Action) => {
    switch (action.type) {
        case 'ADD_COMIC':
            return {
                ...state,
                order: {
                    ...state.order,
                    comic: action.payload
                }
            }
        case 'SUBMIT_REGISTER':
            return {
                ...state,
                order: {
                    ...state.order,
                    register: action.payload
                }
            }
        case 'SUBMIT_ADDRESS':
            return {
                ...state,
                order: {
                    ...state.order,
                    address: action.payload
                }
            }
        case 'SUBMIT_CARD':
            return {
                ...state,
                order: {
                    ...state.order,
                    card: action.payload
                }
            }
        case 'SUBMIT_FORM':
            return {
                ...state,
                orderDetail: {
                    order: {
                        name: state.order.comic.title,
                        image: state.order.comic.img,
                        price: state.order.comic.price,
                    },
                    card: {
                        number: state.order.card.nroTarjeta,
                        nameOnCard: state.order.card.nombreTarjeta,
                        expDate: state.order.card.fechaExp,
                        cvc: state.order.card.codSeguridad,
                    },
                    customer: {
                        name: state.order.register.nombre,
                        lastname: state.order.register.apellido,
                        email: state.order.register.email,
                        address: {
                            address1: state.order.address.direccion,
                            address2: state.order.address.departamento,
                            city: state.order.address.ciudad,
                            state: state.order.address.provincia,
                            zipCode: state.order.address.codigoPostal,
                        }
                    }
                }
            }
        case 'SET_SNACKBAR':
            return { ...state, snackbar: { open: !state.snackbar.open, message: action.payload } }
        default:
            return state;
    }
}