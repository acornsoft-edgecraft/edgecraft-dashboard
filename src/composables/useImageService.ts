import { defaultImageInfo, MessageTypes } from "~/models";

const url = "api/v1/images";

export function useImageService(options: any = {}) {
  const { API, UI, Util } = useAppHelper();

  const getImages = () => {
    const images = ref([] as any);
    const isFetch = ref(false);

    const fetch = () => {
      isFetch.value = true;
      API.get("", url)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch Images", res.message);
          } else {
            res.data.forEach((item) => {
              images.value.push(item);
            });
          }
          isFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch Images", err);
          isFetch.value = false;
        });
    };

    return { images, isFetch, fetch };
  };

  const getImage = () => {
    const image = ref(Util.clone(defaultImageInfo));
    const isFetch = ref(false);

    const fetch = (id) => {
      if (id == 0) return;

      isFetch.value = true;
      API.get("", `${url}/${id}`)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch Images", res.message);
          } else {
            image.value = res.data;
          }
          isFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch Images", err);
          isFetch.value = false;
        });
    };

    return { image, isFetch, fetch };
  };

  const insertImage = () => {
    const isInsFetch = ref(false);

    const insFetch = (params) => {
      isInsFetch.value = true;
      API.post("", url, params)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch Image", res.message);
          }
          isInsFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch Image", err);
          isInsFetch.value = false;
        });
    };

    return { isInsFetch, insFetch };
  };

  const updateImage = () => {
    const isUpFetch = ref(false);

    const upFetch = (id, params) => {
      isUpFetch.value = true;
      API.put("", `${url}/${id}`, params)
        .then((res) => {
          console.log(res);
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch Image", res.message);
          } else {
            console.log(res.data);
          }
          isUpFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch Image", err);
          isUpFetch.value = false;
        });
    };

    return { isUpFetch, upFetch };
  };

  const deleteImage = () => {
    const isDelFetch = ref(false);

    const delFetch = (id) => {
      isDelFetch.value = true;
      API.delete("", `${url}/${id}`)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch Image", res.message);
          }
          isDelFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch Image", err);
          isDelFetch.value = false;
        });
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
