import { defaultImageInfo, MessageTypes } from "~/models";

export function useImageService(options: any = {}) {
  const { API, UI, Util } = useAppHelper();
  const url = "api/v1/images";

  const getImages = () => {
    const images = ref([] as any);
    const isFetch = ref(false);

    const fetch = () => {
      isFetch.value = true;
      API.get("", url)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "이미지 목록", res.message);
          } else {
            res.data.forEach((item) => {
              images.value.push(item);
            });
          }
          isFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "이미지 목록", err);
          isFetch.value = false;
        });
    };

    return { images, isFetch, fetch };
  };

  const getImage = () => {
    const image = ref(Util.clone(defaultImageInfo));
    const isFetch = ref(false);

    const fetch = async (id) => {
      isFetch.value = true;
      const res = await API.get("", `${url}/${id}`);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "이미지 정보", res.message);
      } else {
        image.value = res.data;
      }
      isFetch.value = false;
      return !res.isError;
    };

    return { image, isFetch, fetch };
  };

  const insertImage = () => {
    const isInsFetch = ref(false);

    const insFetch = async (params) => {
      isInsFetch.value = true;
      const res = await API.post("", url, params);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "이미지 등록", res.message);
      }
      isInsFetch.value = false;
      return res;
    };

    return { isInsFetch, insFetch };
  };

  const updateImage = () => {
    const isUpFetch = ref(false);

    const upFetch = async (id, params) => {
      isUpFetch.value = true;
      const res = await API.put("", `${url}/${id}`, params);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "이미지 수정", res.message);
      }
      isUpFetch.value = false;
      return res;
    };

    return { isUpFetch, upFetch };
  };

  const deleteImage = () => {
    const isDelFetch = ref(false);

    const delFetch = async (id) => {
      isDelFetch.value = true;
      const res = await API.delete("", `${url}/${id}`);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "이미지 삭제", res.message);
      }
      isDelFetch.value = false;
      return res;
    };

    return { isDelFetch, delFetch };
  };

  return {
    getImages,
    getImage,
    insertImage,
    updateImage,
    deleteImage,
  };
}
