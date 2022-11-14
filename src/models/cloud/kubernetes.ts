import { required, CIDR } from "~/models/common/validators";
import { K8sVersions } from "~/models";

export const K8sVersionMap = (addAll: boolean = false) => {
  if (addAll) {
    return [{ name: "All", value: "" }, ...useAppHelper().Util.getEnumMap(K8sVersions, false)];
  } else {
    return useAppHelper().Util.getEnumMap(K8sVersions, false);
  }
};

export interface kubeadmExtraConfig {
  pre_kubeadm_commands: String;
  post_kubeadm_commands: String;
  files: String;
  users: String;
  ntp: String;
  format: String;
}

export const defaultKubeadmExtraConfig: kubeadmExtraConfig = {
  pre_kubeadm_commands: "",
  post_kubeadm_commands: "",
  files: "",
  users: "",
  ntp: "",
  format: "",
};

export const kubeadmConfigs = [
  { header: "Pre Kubeadm Commands", id: "pre_kubeadm_commands" },
  { header: "Post Kubeadm Commands", id: "post_kubeadm_commands" },
  { header: "files", id: "files" },
  { header: "users", id: "users" },
  { header: "ntp", id: "ntp" },
  { header: "format", id: "format" },
];

export interface kubernetesInfo {
  version: K8sVersions;
  pod_cidr: String;
  svc_cidr: String;
  svc_domain: String;
  cp_kubeadm_extra_config: kubeadmExtraConfig;
  worker_kubeadm_extra_config: kubeadmExtraConfig;
}

export const defaultKubernetesInfo: kubernetesInfo = {
  version: K8sVersions["1.23.3"],
  pod_cidr: "",
  svc_cidr: "10.96.0.0/12",
  svc_domain: "cluster.local",
  cp_kubeadm_extra_config: defaultKubeadmExtraConfig,
  worker_kubeadm_extra_config: defaultKubeadmExtraConfig,
};

export const defaultKubernetesInfoValidation = {
  version: { required },
  pod_cidr: { required, CIDR },
  svc_cidr: { required, CIDR },
  svc_domain: { required },
};
