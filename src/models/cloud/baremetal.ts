import { required } from "@vuelidate/validators";

export enum ImageChecksumTypes {
  md5 = "md5",
  sha256 = "sha256",
  sha512 = "sha512",
}

export const ImageChecksumTypesMap = (addAll: boolean = false) => {
  if (addAll) {
    return [{ name: "All", value: "" }, ...useAppHelper().Util.getEnumMap(ImageChecksumTypes, false)];
  } else {
    return useAppHelper().Util.getEnumMap(ImageChecksumTypes, false);
  }
};

export enum ImageFormats {
  raw = "raw",
  qcow2 = "qcow2",
  vdi = "vdi",
  vmdk = "vmdk",
  "live-iso" = "live-iso",
}

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
  secret_name: "ㅁㅁ",
  user_name: "ㅇㅇ",
  password: "ㄹㄹ",
  image_url: "ㅇㅇ",
  image_checksum: "ff",
  image_checksum_type: ImageChecksumTypes.md5,
  image_format: ImageFormats.qcow2,
  cp_kubeadm_extra_config: defaultKubeadmExtraConfig,
  worker_kubeadm_extra_config: defaultKubeadmExtraConfig,
};

export const defaultBaremetalInfoValidation = {
  secret_name: { required },
  user_name: { required },
  password: { required },
  image_url: { required },
  image_checksum: { required },
  image_checksum_type: { required },
  image_format: { required },
};
