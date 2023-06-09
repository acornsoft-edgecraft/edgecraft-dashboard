import { required, maxLength, minLength, alphaNum } from "@vuelidate/validators";
import { BackResStatus, BackResType } from "~/models";

export const BackResStatusMap = (addAll: boolean = false, allValue: any = 0) => {
  if (addAll) {
    return [{ name: "All", value: allValue }, ...useAppHelper().Util.getEnumMap(BackResStatus, false)];
  } else {
    return useAppHelper().Util.getEnumMap(BackResStatus, false);
  }
};

export const BackResTypeMap = (addAll: boolean = false, allValue: any = 0) => {
  if (addAll) {
    return [{ name: "All", value: allValue }, ...useAppHelper().Util.getEnumMap(BackResType, false)];
  } else {
    return useAppHelper().Util.getEnumMap(BackResType, false);
  }
};

export interface backresParamInfo {
  backresId: String;
  name: String;
}

export const defaultBackresParamInfo: backresParamInfo = {
  backresId: "",
  name: "",
};

export const defaultBackupValidation = {
  name: { required, alphaNum, minLength: minLength(3), maxLength: maxLength(100) },
};

export const defaultRestoreValidation = {
  backresId: { required },
  name: { required, alphaNum, minLength: minLength(3), maxLength: maxLength(100) },
};
