import { required, minLength, email, PasswordRequirement } from './validators'
import { IUser } from './user'

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

export interface IAuth {
    token?: string
    isAuthenticated: boolean
    user: IUser
}

export const defaultAuth: IAuth = {
    token: '',
    isAuthenticated: false,
    user: null
}