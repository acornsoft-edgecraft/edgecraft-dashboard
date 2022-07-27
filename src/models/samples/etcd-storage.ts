import { required, requiredIf } from "@vuelidate/validators"
import { defaultETCDInfo, defaultETCDInfoValidation, etcdInfo } from "./etcd"
import { defaultStorageClassInfo, defaultStorageClassInfoValidation, storageClassInfo } from "./storage-class"

export interface etcdStorageInfo {
    etcd: etcdInfo,
    storage_class: storageClassInfo,
}

export const defaultEtcdStorageInfo: etcdStorageInfo = {
    etcd: defaultETCDInfo,
    storage_class: defaultStorageClassInfo,
}

export const defaultEtcdStorageInfoValidataion = {
    etcd: { ...defaultETCDInfoValidation },
    storage_class: { ...defaultStorageClassInfoValidation },
}