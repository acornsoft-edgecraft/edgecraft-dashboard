import { MessageTypes, defaultCloudReg } from "~/models";

const currentCloud = ref("");

export function useCloudService(options: any = {}) {
  const { API, UI, Util } = useAppHelper();
  const url = "api/v1/clouds";

  const getClouds = () => {
    const clouds = ref([] as any);
    const isFetch = ref(false);

    const fetch = () => {
      isFetch.value = true;
      API.get("", url)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "클라우드 목록", res.message);
          } else {
            res.data.forEach((item) => {
              clouds.value.push(item);
            });
          }
          isFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "클라우드 목록", err);
          isFetch.value = false;
        });
    };

    return { clouds, isFetch, fetch };
  };

  const getCloud = () => {
    const cloud = ref(Util.clone(defaultCloudReg));
    const isFetch = ref(false);

    const fetch = async (id) => {
      isFetch.value = true;
      const res = await API.get("", `${url}/${id}`);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "클라우드 정보", res.message);
        isFetch.value = false;
        return false;
      } else {
        cloud.value = res.data;
        isFetch.value = false;
        return true;
      }
    };

    return { cloud, isFetch, fetch };
  };

  const insertCloud = () => {
    const isInsFetch = ref(false);

    const insFetch = async (params) => {
      isInsFetch.value = true;
      const res = await API.post("", url, params);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "클라우드 등록", res.message);
        isInsFetch.value = false;
        return false;
      } else {
        isInsFetch.value = false;
        return true;
      }
    };

    return { isInsFetch, insFetch };
  };

  const updateCloud = () => {
    const isUpFetch = ref(false);

    const upFetch = async (id, params) => {
      isUpFetch.value = true;
      const res = await API.put("", `${url}/${id}`, params);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "클라우드 수정", res.message);
        isUpFetch.value = false;
        return false;
      } else {
        isUpFetch.value = false;
        return true;
      }
    };

    return { isUpFetch, upFetch };
  };

  const deleteCloud = () => {
    const isDelFetch = ref(false);

    const delFetch = async (id) => {
      isDelFetch.value = true;
      const res = await API.delete("", `${url}/${id}`);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "클라우드 삭제", res.message);
        isDelFetch.value = false;
        return false;
      } else {
        isDelFetch.value = false;
        return true;
      }
    };

    return { isDelFetch, delFetch };
  };

  return {
    currentCloud,

    getClouds,
    getCloud,
    insertCloud,
    updateCloud,
    deleteCloud,
  };
}
