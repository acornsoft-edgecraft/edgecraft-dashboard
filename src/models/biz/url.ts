import { required } from "@vuelidate/validators"
import { validataion } from './validation'

export interface urlInfo {
    address: String,
    port: String,
}

export const defaultUrlInfo: urlInfo & validataion = {
    address: '',
    port: '',
    validations: {
        address: { required },
        port: { required },
    }
}