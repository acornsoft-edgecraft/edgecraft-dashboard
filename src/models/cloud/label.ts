import { required } from "@vuelidate/validators";

export interface labelInfo {
  key: String;
  value: String;
}

export const defaultLabelInfo: labelInfo = {
  key: "",
  value: "",
};

export const defaultLabelInfoValidation = {
  key: { required },
  value: {},
};
