import { required } from "@vuelidate/validators"

export interface kubernetesInfo {
    version: String,
    pod_cidr: String,
    svc_cidr: String
}

export const defaultKubernetesInfo: kubernetesInfo = {
    version: '1.23.0',
    pod_cidr: 'ㅁㄴㅇㄹ',
    svc_cidr: 'ㅁㄴㅇㄹ'
}

export const defaultKubernetesInfoValidation = {
    version: { required },
    pod_cidr: { required },
    svc_cidr: { required }
}