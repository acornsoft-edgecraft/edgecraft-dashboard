import { required, integer, between } from "@vuelidate/validators";
import { labelInfo, defaultLabelInfo } from "../cloud";

export interface nodesetInfo {
  namespace: String;
  name: String;
  node_count: Number;
  flavor: String;
  labels: Array<labelInfo>;
}

export const defaultNodesetInfo: nodesetInfo = {
  namespace: "",
  name: "",
  node_count: 3,
  flavor: "",
  labels: [defaultLabelInfo],
};

export const defaultNodesetInfoValidation = {
  namespace: {},
  name: { required },
  node_count: { required, integer, between: between(1, 100) },
  flavor: { required },
  labels: [],
};
