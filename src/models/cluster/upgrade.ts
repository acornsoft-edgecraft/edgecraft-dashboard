import { required } from "@vuelidate/validators";

export interface upgradeInfo {
  version: number;
  image: String;
}

export const defaultUpgradeInfo: upgradeInfo = {
  version: 1,
  image: "",
};

export const defaultUpgradeInfoValidation = {
  version: { required },
  image: { required },
};
