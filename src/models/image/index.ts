import { required, minLength, maxLength } from "@vuelidate/validators";
import { ImageTypes, ImageFormats, ImageOsTypes } from "~/models";

export interface imageInfo {
  name: String;
  type: ImageTypes;
  file: String;
  format: ImageFormats;
  os: ImageOsTypes;
  desc: String;
}

export const defaultImageInfo: imageInfo = {
  name: "",
  type: ImageTypes["Baremetal Cloud"],
  file: "",
  format: ImageFormats.qcow2,
  os: ImageOsTypes["Ubuntu 20.04"],
  desc: "",
};

export const defaultImageInfoValidation = {
  name: { required, minLength: minLength(3), maxLength: maxLength(100) },
  type: { required },
  file: { required },
  format: { required },
  os: { required },
  desc: {},
};

export const ImageTypesMap = (addAll: boolean = false, allValue: any = 0) => {
  if (addAll) {
    return [{ name: "All", value: allValue }, ...useAppHelper().Util.getEnumMap(ImageTypes, false)];
  } else {
    return useAppHelper().Util.getEnumMap(ImageTypes, false);
  }
};

export const ImageOsTypesMap = (addAll: boolean = false, allValue: any = 0) => {
  if (addAll) {
    return [{ name: "All", value: allValue }, ...useAppHelper().Util.getEnumMap(ImageOsTypes, false)];
  } else {
    return useAppHelper().Util.getEnumMap(ImageOsTypes, false);
  }
};
