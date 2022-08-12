import { required, helpers } from "@vuelidate/validators";

export const cidrRegex = helpers.regex(/^([0-9]{1,3}\.){3}[0-9]{1,3}(\/([0-9]|[1-2][0-9]|3[0-2]))?$/);

export enum K8sVersions {
  "1.22.0",
  "1.23.0",
}
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
  svc_cidr: "10.244.0.0/1",
};

export const defaultKubernetesInfoValidation = {
  version: { required },
  pod_cidr: { required, cidrRegex },
  svc_cidr: { required, cidrRegex },
};
