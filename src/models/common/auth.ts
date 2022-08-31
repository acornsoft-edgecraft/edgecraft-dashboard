import { required, minLength, email, PasswordRequirement } from './validators'

// export interface IAuthType {
//     isAuthenticated: boolean,
//     strategy: string,
//     schema: string,
//     provider: string
// }

// export const defaultAuthType: IAuthType = {
//     isAuthenticated: false,
//     strategy: "",
//     schema: null,
//     provider: "",
// }

export interface ILogin {
    email: string
    password: string
}

export const defaultLogin: ILogin = {
    email: '',
    password: ''
}

export const defaultLoginValidation = {
    email: {
        required,
        email
    },
    password: {
        required,
        minLength: minLength(6),
        PasswordRequirement
    }
}

export interface IAuth extends ILogin {
    token?: string
    isAuthenticated: boolean
}

export const defaultAuth: IAuth = {
    email: '',
    password: '',
    token: '',
    isAuthenticated: false
}