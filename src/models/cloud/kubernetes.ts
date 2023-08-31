import { required, CIDR } from "~/models/common/validators";
import { K8sVersions, KubeadmK8sVersions, MicroK8sK8sVersions, K3sK8sVersions, BootstrapProviders } from "~/models";

export const K8sVersionMap = (bootstrapProvider: string = "") => {
  switch (useAppHelper().Util.getEnumKeyName(BootstrapProviders, bootstrapProvider)) {
    case "Kubeadm":
      return useAppHelper().Util.getEnumMap(KubeadmK8sVersions, false);
    case "MicroK8s":
      return useAppHelper().Util.getEnumMap(MicroK8sK8sVersions, false);
    case "K3s":
      return useAppHelper().Util.getEnumMap(K3sK8sVersions, false);
    default:
      return useAppHelper().Util.getEnumMap(K8sVersions, false);
  }
  // if (bootstrapProvider == "") {
  //   return [{ name: "All", value: "" }, ...useAppHelper().Util.getEnumMap(K8sVersions, false)];
  // } else {
  //   return useAppHelper().Util.getEnumMap(K8sVersions, false);
  // }
};

export const BootstrapProviderMap = (addAll: boolean = false) => {
  if (addAll) {
    return [{ name: "All", value: "" }, ...useAppHelper().Util.getEnumMap(BootstrapProviders, false)];
  } else {
    return useAppHelper().Util.getEnumMap(BootstrapProviders, false);
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
  bootstrap_provider: BootstrapProviders;
  version: Object;
  pod_cidr: String;
  svc_cidr: String;
  svc_domain: String;
  cp_kubeadm_extra_config: kubeadmExtraConfig;
  worker_kubeadm_extra_config: kubeadmExtraConfig;
}

export const defaultKubernetesInfo: kubernetesInfo = {
    bootstrap_provider: BootstrapProviders["Kubeadm"],
    version: K8sVersions["1.23.3"],
    pod_cidr: "",
    svc_cidr: "10.96.0.0/12",
    svc_domain: "cluster.local",
    cp_kubeadm_extra_config: defaultKubeadmExtraConfig,
    worker_kubeadm_extra_config: defaultKubeadmExtraConfig,
};

export const defaultKubernetesInfoValidation = {
  bootstrap_provider: { required },
  version: { required },
  pod_cidr: { required, CIDR },
  svc_cidr: { required, CIDR },
  svc_domain: { required },
};