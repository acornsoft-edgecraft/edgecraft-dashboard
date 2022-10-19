import { required, integer, between } from "@vuelidate/validators";
import { labelInfo, defaultLabelInfo } from "~/models";

export interface nodesetInfo {
  name: String;
  node_count: Number;
  flavor: String;
  labels: Array<labelInfo>;
}

export const defaultNodesetInfo: nodesetInfo = {
  name: "",
  node_count: 3,
  flavor: "",
  labels: [defaultLabelInfo],
};

export const defaultNodesetInfoValidation = {
  name: { required },
  node_count: { required, integer, between: between(1, 100) },
  flavor: { required },
  labels: [],
};
