import { required } from "@vuelidate/validators"

export interface etcdInfo {
    endpoints: Array<{ ip_address: String, port: String }>,
    ca_file: String,
    cert_file: String,
    key_file: String,
    validations: Object
}

export const defaultETCDInfo: etcdInfo = {
    endpoints: [],
    ca_file: '',
    cert_file: '',
    key_file: '',
    validations: {
        endpoints: {
            $each: {
                ip_address: { required },
                port: { required }
            }
        },
        ca_file: { required },
        cert_file: { required },
        key_file: { required },
    }
}
