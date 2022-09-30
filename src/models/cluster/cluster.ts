import { required, maxLength, minLength, alphaNum } from "@vuelidate/validators";

export interface clusterInfo {
  name: String;
  desc: String;
}

export const defaultClusterInfo: clusterInfo = {
  name: "",
  desc: "",
};

export const defaultClusterInfoValidation = {
  name: { required, minLength: minLength(3), maxLength: maxLength(100) },
  desc: {},
};
