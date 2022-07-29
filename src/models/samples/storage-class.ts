import { required, requiredIf } from "@vuelidate/validators"

export interface storageClassInfo {
    use_ceph: Boolean,
    label1: String,
    label2: String,
    label3: String
}

export const defaultStorageClassInfo: storageClassInfo = {
    use_ceph: false,
    label1: '',
    label2: '',
    label3: '',
}

export const defaultStorageClassInfoValidation = {
    // @ts-ignore-end
    label1: { required: requiredIf((_, vm) => vm.use_ceph) },
    // @ts-ignore-end
    label2: { required: requiredIf((_, vm) => vm.use_ceph) },
    // @ts-ignore-end
    label3: { required: requiredIf((_, vm) => vm.use_ceph) },
}