import { required, minLength, maxLength, alphaNum } from "@vuelidate/validators";
import { clusterInfo, defaultClusterInfo } from "./cluster";
import { nodesInfo, defaultNodesInfo } from "./nodes";
import { etcdStorageInfo, defaultEtcdStorageInfo } from "./etcd-storage";
import { openstackInfo, defaultOpenstackInfo } from "./openstack";

// TODO: 서버 코드 관리와 연계
export enum CloudTypes {
  Baremetal = 1,
  Openstack = 2,
}

export const CloudTypesMap = (addAll: boolean = false, allValue: any = 0) => {
  if (addAll) {
    return [{ name: "All", value: allValue }, ...useAppHelper().Util.getEnumMap(CloudTypes, false)];
  } else {
    return useAppHelper().Util.getEnumMap(CloudTypes, false);
  }
};

// TODO: 서버 코드 관리와 연계
export enum CloudStatus {
  Saved = 1, // 저장
  Provisioning = 2, // 설치중
  Provisioned = 3, // 설치완료
  Failed = 4, //설치 실패
  Deleting = 5, // 삭제중
  Deleted = 6, // 삭제완료
}
export const CloudStatusMap = (addAll: boolean = false, allValue: any = 0) => {
  if (addAll) {
    return [{ name: "All", value: allValue }, ...useAppHelper().Util.getEnumMap(CloudStatus, false)];
  } else {
    return useAppHelper().Util.getEnumMap(CloudStatus, false);
  }
};

export interface cloudInfo {
  name: String;
  type: CloudTypes;
  desc: String;
}

export const defaultCloudInfo: cloudInfo = {
  name: "ff",
  type: CloudTypes.Baremetal,
  desc: "",
};

export const defaultCloudInfoValidation = {
  name: { required, minLength: minLength(3), maxLength: maxLength(20), alphaNum },
  type: { required },
  desc: {},
};

export interface cloud_reg {
  cloud: cloudInfo;
  cluster: clusterInfo;
  nodes: nodesInfo;
  etcd_storage: etcdStorageInfo;
  openstack: openstackInfo;
}

export const defaultCloudReg: cloud_reg = {
  cloud: defaultCloudInfo,
  cluster: defaultClusterInfo,
  nodes: defaultNodesInfo,
  etcd_storage: defaultEtcdStorageInfo,
  openstack: defaultOpenstackInfo,
};
