import { required } from "@vuelidate/validators";
import { labelInfo, defaultLabelInfo } from "./label";

export interface nodeInfo {
  node_name: String;
  ip_address: String;
  labels: Array<labelInfo>;
}

export const defaultNodeInfo: nodeInfo = {
  node_name: "sadf",
  ip_address: "safd",
  labels: [defaultLabelInfo],
};

export const defaultNodeInfoValidation = {
  node_name: { required },
  ip_address: { required },
  labels: [],
};
