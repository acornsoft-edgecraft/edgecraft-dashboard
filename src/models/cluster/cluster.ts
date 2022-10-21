import { required, maxLength, minLength, alphaNum } from "@vuelidate/validators";

export interface clusterInfo {
  name: String;
  desc: String;
  namespace: String;
}

export const defaultClusterInfo: clusterInfo = {
  name: "",
  desc: "",
  namespace: "default",
};

export const defaultClusterInfoValidation = {
  name: { required, minLength: minLength(3), maxLength: maxLength(100) },
  desc: {},
  namespace: { required, alphaNum },
};
