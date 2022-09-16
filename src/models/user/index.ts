import { required, email, minLength, maxLength, alphaNum } from "@vuelidate/validators";
import { UserRoles } from "~/models";

export interface userInfo {
  email: String;
  name: String;
  password: String;
  role: String;
}

export const defaultUserInfo: userInfo = {
  email: "",
  name: "",
  password: "",
  role: UserRoles.User,
};

export const defaultUserInfoValidation = {
  email: { required, email, maxLength: maxLength(100) },
  name: { required, minLength: minLength(3), maxLength: maxLength(100), alphaNum },
  password: { required, minLength: minLength(8), maxLength: maxLength(100) },
  role: { required },
};

export const UserRolesMap = (addAll: boolean = false, allValue: any = 0) => {
  if (addAll) {
    return [{ name: "All", value: allValue }, ...useAppHelper().Util.getEnumMap(UserRoles, false)];
  } else {
    return useAppHelper().Util.getEnumMap(UserRoles, false);
  }
};
