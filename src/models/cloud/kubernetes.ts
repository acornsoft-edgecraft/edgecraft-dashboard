import { required, CIDR } from "~/models/common/validators";
import { K8sVersions } from "~/models";

export const K8sVersionMap = (addAll: boolean = false) => {
  if (addAll) {
    return [{ name: "All", value: "" }, ...useAppHelper().Util.getEnumMap(K8sVersions, false)];
  } else {
    return useAppHelper().Util.getEnumMap(K8sVersions, false);
  }
};

export interface kubernetesInfo {
  version: K8sVersions;
  pod_cidr: String;
  svc_cidr: String;
}

export const defaultKubernetesInfo: kubernetesInfo = {
  version: K8sVersions["1.23.0"],
  pod_cidr: "",
  svc_cidr: "",
};

export const defaultKubernetesInfoValidation = {
  version: { required },
  pod_cidr: { required, CIDR },
  svc_cidr: { required, CIDR },
};
