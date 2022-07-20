import { required } from "@vuelidate/validators"

export interface nodeInfo {
    node_name: String,
    ip_address: String,
    label: String,
    Validations: Object
}

export const defaultNodeInfo: nodeInfo = {
    node_name: '',
    ip_address: '',
    label: '',
    Validations: {
        node_name: { required },
        ip_address: { required },
        label: { required },
    }
}