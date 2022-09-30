export type CheckoutInput = {
    customer: {
        name: string,
        lastname: string,
        email: string
        address: {
            address1: string,
            address2: string | null,
            city: string,
            state: string,
            zipCode: string
        }
    },
    card: {
        number: string,
        cvc: string,
        expDate: string,
        nameOnCard: string
    },
    order: {
        name: string;
        image: string;
        price: number;
    }
}

export type ComicInfo = {
    img: string,
    price: number,
    title: string,
}

export type RegisterFormData = {
    nombre:string
    apellido: string,
    email: string,
}

export type Address = {
    direccion: string,
    departamento: string,
    ciudad: string,
    provincia: string,
    codigoPostal: string,
}

export type Card = {
    nroTarjeta: string,
    nombreTarjeta: string,
    fechaExp: string,
    codSeguridad: string,
}

export type Order = {
    comic: ComicInfo,
    register: RegisterFormData,
    address: Address,
    card: Card,
}

export type orderDetail = {
    comic: ComicInfo,
    comprador: RegisterFormData,
    direccion: Address,
}

export type Snackbar = {
    open: boolean,
    message: string,
}