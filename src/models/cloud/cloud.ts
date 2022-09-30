import { required, minLength, maxLength } from "@vuelidate/validators";
import { CloudTypes, CloudStatus } from "~/models";

export const CloudTypesMap = (addAll: boolean = false, allValue: any = 0) => {
  if (addAll) {
    return [{ name: "All", value: allValue }, ...useAppHelper().Util.getEnumMap(CloudTypes, false)];
  } else {
    return useAppHelper().Util.getEnumMap(CloudTypes, false);
  }
};

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
  name: "",
  type: CloudTypes.Baremetal,
  desc: "",
};

export const defaultCloudInfoValidation = {
  name: { required, minLength: minLength(3), maxLength: maxLength(100) },
  type: { required },
  desc: {},
};
