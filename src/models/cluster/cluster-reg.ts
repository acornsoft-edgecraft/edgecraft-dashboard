import { clusterInfo, defaultClusterInfo } from "./cluster";
import { openstackConfInfo, defaultOpenstackConfInfo } from "./openstack";
import { clusterNodesInfo, defaultClusterNodesInfo } from "./nodes";
import { kubernetesInfo, defaultKubernetesInfo, etcdInfo, defaultETCDInfo, storageClassInfo, defaultStorageClassInfo } from "~/models";

export interface cluster_reg {
  cluster: clusterInfo;
  k8s: kubernetesInfo;
  openstack: openstackConfInfo;
  nodes: clusterNodesInfo;
  etcd_storage: {
    etcd: etcdInfo;
    storage_class: storageClassInfo;
  };
  save_only: boolean;
}

export const defaultClusterReg: cluster_reg = {
  cluster: defaultClusterInfo,
  k8s: defaultKubernetesInfo,
  openstack: defaultOpenstackConfInfo,
  nodes: defaultClusterNodesInfo,
  etcd_storage: {
    etcd: defaultETCDInfo,
    storage_class: defaultStorageClassInfo,
  },
  save_only: true,
};
