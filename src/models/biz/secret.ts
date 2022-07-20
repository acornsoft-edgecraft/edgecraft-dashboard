import { required } from "@vuelidate/validators"

export interface secretInfo {
    secret_name: String,
    user_name: String,
    password: String,
    validataions: Object
}

export const defaultSecretInfo: secretInfo = {
    secret_name: '',
    user_name: '',
    password: '',
    validataions: {
        secret_name: { required },
        user_name: { required },
        password: { required },
    }
}