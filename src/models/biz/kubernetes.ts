import { required } from "@vuelidate/validators"

export interface kubernetesInfo {
    version: String,
    pod_cidr: String,
    svc_cidr: String,
    validataions: Object
}

export const defaultKubernetesInfo: kubernetesInfo = {
    version: '1.23.0',
    pod_cidr: '',
    svc_cidr: '',
    validataions: {
        version: { required },
        pod_cidr: { required },
        svc_cidr: { required }
    }
}