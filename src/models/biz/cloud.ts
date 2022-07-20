import { required } from "@vuelidate/validators"
import { clusterInfo, defaultClusterInfo } from "./cluster"
import { nodesInfo, defaultNodesInfo } from './nodes'

// TODO: 서버 코드 관리와 연계
export enum CloudTypes {
    Baremetal = 1,
    Openstack = 2,
}

export const CloudTypesMap = (addAll: boolean = false) => {
    if (addAll) {
        return [{ name: 'All', value: '' }, ...useAppHelper().UI.getEnumMap(CloudTypes, false)]
    } else {
        return useAppHelper().UI.getEnumMap(CloudTypes, false)
    }
}

// TODO: 서버 코드 관리와 연계
export enum CloudStatus {
    Saved = 1,        // 임시저장
    Registered = 2,   // 등록완료
    Installing = 3,   // 설치중
    Installed = 4,    // 설치완료
    Deleting = 5,     // 삭제중
    Deleted = 6       // 삭제완료
}
export const CloudStatusMap = (addAll: boolean = false) => {
    if (addAll) {
        return [{ name: 'All', value: '' }, ...useAppHelper().UI.getEnumMap(CloudStatus, false)]
    } else {
        return useAppHelper().UI.getEnumMap(CloudStatus, false)
    }
}

export interface cloudInfo {
    name: String,
    type: Number,
    desc: String,
    validataions: Object
}

export const defaultCloudInfo: cloudInfo = {
    name: '',
    type: 1,
    desc: '',
    validataions: {
        name: { required },
        type: { required },
        desc: { required }
    }
}

export interface cloud_reg {
    cloud: cloudInfo,
    cluster: clusterInfo,
    nodes: nodesInfo,
    storage: storageInfo,
    openstack: openstackInfo
}

export const defaultCloudReg: cloud_reg = {
    cloud: defaultCloudInfo,
    cluster: defaultClusterInfo,
    nodes: defaultNodesInfo,
    storage: defaultStorageInfo,
    openstack: defaultOpenstackInfo
}