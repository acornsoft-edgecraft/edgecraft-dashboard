import { required, helpers } from "@vuelidate/validators";
import { K8sVersions, validators } from "../common";

const cidr = helpers.withMessage("This field type is mismatched. (e.g. 10.244.0.0/16)", validators.CIDR);

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
  pod_cidr: "10.244.0.0/16",
  svc_cidr: "10.244.0.0/16",
};

export const defaultKubernetesInfoValidation = {
  version: { required },
  pod_cidr: { required, cidr },
  svc_cidr: { required, cidr },
};
