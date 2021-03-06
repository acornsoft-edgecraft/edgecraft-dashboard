import { required } from "@vuelidate/validators"

export enum BootModes {
    UEFI
}

export const BootModesMap = (addAll: boolean = false) => {
    if (addAll) {
        return [{ name: 'All', value: '' }, ...useAppHelper().Util.getEnumMap(BootModes, false)]
    } else {
        return useAppHelper().Util.getEnumMap(BootModes, false)
    }
}

export interface baremetalHostInfo {
    host_name: String,
    bmc_address: String,
    boot_mac_address: String,
    boot_mode: BootModes,
    online_power: Boolean,
    external_provisioning: Boolean,
}

export const defaultBaremetalHostInfo = {
    host_name: 'sadf',
    bmc_address: 'sadf',
    boot_mac_address: 'saf',
    boot_mode: BootModes.UEFI,
    online_power: false,
    external_provisioning: false,
}

export const defaultBaremetalHostInfoValidation = {
    host_name: { required },
    bmc_address: { required },
    boot_mac_address: { required },
    boot_mode: { required },
}