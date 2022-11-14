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

export interface baremetalInfo {
  namespace: String;
  secret_name: String;
  user_name: String;
  password: String;
  image_url: string;
  image_checksum: string;
  image_checksum_type: ImageChecksumTypes;
  image_format: ImageFormats;
}

export const defaultBaremetalInfo: baremetalInfo = {
  namespace: "default",
  secret_name: "",
  user_name: "",
  password: "",
  image_url: "",
  image_checksum: "",
  image_checksum_type: ImageChecksumTypes.md5,
  image_format: ImageFormats.qcow2,
};

export const defaultBaremetalInfoValidation = {
  namespace: { required, alphaNum },
  secret_name: { required, alphaNum },
  user_name: { required, alphaNum },
  password: { required, alphaNum },
  image_url: { required }, // url
  image_checksum: { required },
  image_checksum_type: { required },
  image_format: { required },
};
