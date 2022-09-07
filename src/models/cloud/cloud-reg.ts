import { cloudInfo, defaultCloudInfo } from "./cloud";
import { kubernetesInfo, defaultKubernetesInfo } from "./kubernetes";
import { baremetalInfo, defaultBaremetalInfo } from "./baremetal";
import { nodesInfo, defaultNodesInfo } from "./nodes";
import { etcdInfo, defaultETCDInfo } from "./etcd";
import { storageClassInfo, defaultStorageClassInfo } from "./storage-class";
import { openstackInfo, defaultOpenstackInfo } from "./openstack";

export interface cloud_reg {
  cloud: cloudInfo;
  cluster: {
    k8s: kubernetesInfo;
    baremetal: baremetalInfo;
  };
  nodes: nodesInfo;
  etcd_storage: {
    etcd: etcdInfo;
    storage_class: storageClassInfo;
  };
  openstack: openstackInfo;
}

export const defaultCloudReg: cloud_reg = {
  cloud: defaultCloudInfo,
  cluster: {
    k8s: defaultKubernetesInfo,
    baremetal: defaultBaremetalInfo,
  },
  nodes: defaultNodesInfo,
  etcd_storage: {
    etcd: defaultETCDInfo,
    storage_class: defaultStorageClassInfo,
  },
  openstack: defaultOpenstackInfo,
};
