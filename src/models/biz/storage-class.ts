import { required } from "@vuelidate/validators"
import { validataion } from "./validation"

export interface storageClassInfo {
    label1: String,
    label2: String,
    label3: String
}

export const defaultStorageClassInfo: storageClassInfo & validataion = {
    label1: '',
    label2: '',
    label3: '',
    validations: {
        label1: { required },
        label2: { required },
        label3: { required }
    }
}