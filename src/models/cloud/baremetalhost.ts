import { required, macAddress } from "@vuelidate/validators";
import { BootModes } from "~/models";

export const BootModesMap = (addAll: boolean = false) => {
  if (addAll) {
    return [{ name: "All", value: "" }, ...useAppHelper().Util.getEnumMap(BootModes, false)];
  } else {
    return useAppHelper().Util.getEnumMap(BootModes, false);
  }
};

export interface baremetalHostInfo {
  host_name: String;
  bmc_address: String;
  boot_mac_address: String;
  boot_mode: BootModes;
  online_power: Boolean;
  external_provisioning: Boolean;
}

export const defaultBaremetalHostInfo = {
  host_name: "",
  bmc_address: "",
  boot_mac_address: "",
  boot_mode: BootModes.UEFI,
  online_power: false,
  external_provisioning: false,
};

export const defaultBaremetalHostInfoValidation = {
  host_name: { required },
  bmc_address: { required, macAddress: macAddress(":") },
  boot_mac_address: { required, macAddress: macAddress(":") },
  boot_mode: { required },
  online_power: {},
  external_provisioning: {},
};
