import { required, alphaNum, url } from "@vuelidate/validators";
import { ImageChecksumTypes, ImageFormats } from "~/models";

export const ImageChecksumTypesMap = (addAll: boolean = false) => {
  if (addAll) {
    return [{ name: "All", value: "" }, ...useAppHelper().Util.getEnumMap(ImageChecksumTypes, false)];
  } else {
    return useAppHelper().Util.getEnumMap(ImageChecksumTypes, false);
  }
};

export const ImageFormatsMap = (addAll: boolean = false) => {
  if (addAll) {
    return [{ name: "All", value: "" }, ...useAppHelper().Util.getEnumMap(ImageFormats, false)];
  } else {
    return useAppHelper().Util.getEnumMap(ImageFormats, false);
  }
};

export const kubeadmConfigs = [
  { header: "Pre Kubeadm Commands", id: "pre_kubeadm_commands" },
  { header: "Post Kubeadm Commands", id: "post_kubeadm_commands" },
  { header: "files", id: "files" },
  { header: "users", id: "users" },
  { header: "ntp", id: "ntp" },
  { header: "format", id: "format" },
];

export interface kubeadmExtraConfig {
  pre_kubeadm_commands: String;
  post_kubeadm_commands: String;
  files: String;
  users: String;
  ntp: String;
  format: String;
}

export const defaultKubeadmExtraConfig: kubeadmExtraConfig = {
  pre_kubeadm_commands: "",
  post_kubeadm_commands: "",
  files: "",
  users: "",
  ntp: "",
  format: "",
};

export interface baremetalInfo {
  secret_name: String;
  user_name: String;
  password: String;
  image_url: string;
  image_checksum: string;
  image_checksum_type: ImageChecksumTypes;
  image_format: ImageFormats;
  cp_kubeadm_extra_config: kubeadmExtraConfig;
  worker_kubeadm_extra_config: kubeadmExtraConfig;
}

export const defaultBaremetalInfo: baremetalInfo = {
  secret_name: "",
  user_name: "",
  password: "",
  image_url: "",
  image_checksum: "",
  image_checksum_type: ImageChecksumTypes.md5,
  image_format: ImageFormats.qcow2,
  cp_kubeadm_extra_config: defaultKubeadmExtraConfig,
  worker_kubeadm_extra_config: defaultKubeadmExtraConfig,
};

export const defaultBaremetalInfoValidation = {
  secret_name: { required, alphaNum },
  user_name: { required, alphaNum },
  password: { required, alphaNum },
  image_url: { required }, // url
  image_checksum: { required },
  image_checksum_type: { required },
  image_format: { required },
};
