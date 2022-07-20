import { required, requiredIf } from "@vuelidate/validators"
import { defaultETCDInfo, etcdInfo } from "./etcd"
import { defaultStorageClassInfo, storageClassInfo } from "./storage-class"
import { validataion } from "./validation"

export interface etcdStorageInfo {
    use_external_etcd: Boolean,
    etcd: etcdInfo,
    use_ceph: Boolean,
    storage_class: storageClassInfo,
}

export const defaultEtcdStorageInfo: etcdStorageInfo & validataion = {
    use_external_etcd: false,
    etcd: defaultETCDInfo,
    use_ceph: false,
    storage_class: defaultStorageClassInfo,
    validations: {
        use_external_etcd: { required },
        etcd: { required: requiredIf(() => { return (this as any)?.use_external_etcd }) },
        use_ceph: { required },
        storage_class: { required: requiredIf(() => { return (this as any)?.use_ceph }) },
    }
}