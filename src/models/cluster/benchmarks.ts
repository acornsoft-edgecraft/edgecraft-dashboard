import { BenchmarksStatus } from "~/models";

export const BenchmarksStatusMap = (addAll: boolean = false, allValue: any = 0) => {
    if (addAll) {
        return [{ name: "All", value: allValue }, ...useAppHelper().Util.getEnumMap(BenchmarksStatus, false)];
    } else {
        return useAppHelper().Util.getEnumMap(BenchmarksStatus, false);
    }
};
