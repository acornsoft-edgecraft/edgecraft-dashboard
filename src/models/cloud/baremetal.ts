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
  secret_name: "secret1",
  user_name: "asdf",
  password: "asdf",
  image_url: "http://192.168.0.1/ubuntu.qcow2",
  image_checksum: "http://192.168.0.1/ubuntu.qcow2.md5sum",
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
