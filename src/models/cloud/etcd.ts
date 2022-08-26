import { helpers, required, requiredIf, ipAddress, between } from "@vuelidate/validators";

export interface etcdInfo {
  use_external_etcd: Boolean;
  endpoints: Array<{ ip_address: String; port: String }>;
  ca_file: String;
  cert_file: String;
  key_file: String;
}

export const defaultETCDInfo: etcdInfo = {
  use_external_etcd: false,
  endpoints: [{ ip_address: "", port: "" }],
  ca_file: "",
  cert_file: "",
  key_file: "",
};

export const defaultETCDInfoValidation = {
  use_external_etcd: {},
  endpoints: [],
  // @ts-ignore
  ca_file: { required: requiredIf((_, vm) => vm.use_external_etcd) },
  // @ts-ignore
  cert_file: { required: requiredIf((_, vm) => vm.use_external_etcd) },
  // @ts-ignore
  key_file: { required: requiredIf((_, vm) => vm.use_external_etcd) },
};

export const defaultEndpointValidation = {
  ip_address: { required, ipAddress },
  port: { required, between: between(0, 65536) },
};
