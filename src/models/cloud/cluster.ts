import { defaultKubernetesInfo, kubernetesInfo } from "./kubernetes";
import { defaultBaremetalInfo, baremetalInfo } from "./baremetal";

export interface clusterInfo {
  k8s: kubernetesInfo;
  baremetal: baremetalInfo;
}

export const defaultClusterInfo: clusterInfo = {
  k8s: defaultKubernetesInfo,
  baremetal: defaultBaremetalInfo,
};
