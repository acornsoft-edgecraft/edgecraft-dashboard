import { MessageTypes, defaultCloudReg } from "~/models";

const currentCloud = ref("");
const { Util } = useAppHelper();

export function useCloudService(options: any = {}) {
  const { API, UI } = useAppHelper();

  const getClouds = () => {
    const url = "api/v1/clouds";
    const clouds = ref([] as any);
    const isFetch = ref(false);

    const fetch = () => {
      isFetch.value = true;
      API.get("", url)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch Clouds", res.message);
          } else {
            res.data.forEach((item) => {
              clouds.value.push(item);
            });
          }
          isFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch Clouds", err);
          isFetch.value = false;
        });
    };

    return { clouds, isFetch, fetch };
  };

  const getCloud = () => {
    // const url = `api/v1/clouds`;
    const url = `api/v1/cloud`;
    const cloud = ref(Util.clone(defaultCloudReg));
    const isFetch = ref(false);

    const fetch = (id) => {
      if (id == 0) return;

      isFetch.value = true;
      API.get("", `${url}/${id}`)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch Cloud", res.message);
          } else {
            cloud.value = res.data;
          }
          isFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch Cloud", err);
          isFetch.value = false;
        });
    };

    return { cloud, isFetch, fetch };
  };

  const insertCloud = () => {
    const url = "api/v1/clouds";
    const isInsFetch = ref(false);

    const insFetch = (params) => {
      isInsFetch.value = true;
      API.post("", url, params)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch Cloud", res.message);
          }
          isInsFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch Cloud", err);
          isInsFetch.value = false;
        });
    };

    return { isInsFetch, insFetch };
  };

  const updateCloud = () => {
    const url = "api/v1/cloud";
    const isUpFetch = ref(false);

    const upFetch = (id, params) => {
      isUpFetch.value = true;
      API.put("", `${url}/${id}`, params)
        .then((res) => {
          console.log(res);
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch Cloud", res.message);
          } else {
            console.log(res.data);
          }
          isUpFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch Cloud", err);
          isUpFetch.value = false;
        });
    };

    return { isUpFetch, upFetch };
  };

  const deleteCloud = () => {
    const url = "api/v1/clouds";
    const isDelFetch = ref(false);

    const delFetch = (id) => {
      isDelFetch.value = true;
      API.delete("", `${url}/${id}`)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch Cloud", res.message);
          }
          isDelFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch Cloud", err);
          isDelFetch.value = false;
        });
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
