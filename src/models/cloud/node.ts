import { required } from "@vuelidate/validators";

export interface nodeInfo {
  node_name: String;
  ip_address: String;
  label: String;
}

export const defaultNodeInfo: nodeInfo = {
  node_name: "sadf",
  ip_address: "safd",
  label: "asdf",
};

export const defaultNodeInfoValidation = {
  node_name: { required },
  ip_address: { required },
  label: { required },
};
