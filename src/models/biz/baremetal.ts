import { required } from "@vuelidate/validators"

export enum BootModes {
    UEFI
}

export interface baremetalHostInfo {
    host_name: String,
    bmc_address: String,
    boot_mac_address: String,
    boot_mode: BootModes,
    online_power: Boolean,
    external_provisioning: Boolean,
    validataions: Object
}

export const defaultBaremetalHostInfo = {
    host_name: '',
    bmc_address: '',
    boot_mac_address: '',
    boot_mode: BootModes.UEFI,
    online_power: false,
    external_provisioning: false,
    validataions: {
        host_name: { required },
        bmc_address: { required },
        boot_mac_address: { required },
        boot_mode: { required },
        online_power: { required },
        external_provisioning: { required },
    }
}