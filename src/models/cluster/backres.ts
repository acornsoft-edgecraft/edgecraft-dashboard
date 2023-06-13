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

export interface backupParamInfo {
  backres_uid: String;
  name: String;
}

export interface restoreParamInfo extends backupParamInfo {
  backup_name: string;
}

export const defaultBackupParamInfo: backupParamInfo = {
  backres_uid: "",
  name: "",
};

export const defaultRestoreParamInfo: restoreParamInfo = {
  backres_uid: "",
  name: "",
  backup_name: "",
};

export const defaultBackupValidation = {
  name: { required, alphaNum, minLength: minLength(3), maxLength: maxLength(100) },
};

export const defaultRestoreValidation = {
  backres_uid: { required },
  name: { required, alphaNum, minLength: minLength(3), maxLength: maxLength(100) },
};
