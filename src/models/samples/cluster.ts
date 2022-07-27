import { defaultKubernetesInfo, kubernetesInfo } from "./kubernetes"
import { defaultSecretInfo, secretInfo } from "./secret"

export interface clusterInfo {
    k8s: kubernetesInfo,
    secret: secretInfo
}

export const defaultClusterInfo: clusterInfo = {
    k8s: defaultKubernetesInfo,
    secret: defaultSecretInfo
}