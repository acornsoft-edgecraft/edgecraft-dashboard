import { SecurityStatus } from "~/models";

export const SecurityStatusMap = (addAll: boolean = false, allValue: any = 0) => {
  if (addAll) {
    return [{ name: "All", value: allValue }, ...useAppHelper().Util.getEnumMap(SecurityStatus, false)];
  } else {
    return useAppHelper().Util.getEnumMap(SecurityStatus, false);
  }
};
