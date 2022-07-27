import { required } from "@vuelidate/validators"

export interface secretInfo {
    secret_name: String,
    user_name: String,
    password: String
}

export const defaultSecretInfo: secretInfo = {
    secret_name: 'ㅁㅇㄹ',
    user_name: 'ㅁㄴㅇㄹ',
    password: 'ㅁㄴㅇㄹ'
}

export const defaultSecretInfoValidation = {
    secret_name: { required },
    user_name: { required },
    password: { required },
}

