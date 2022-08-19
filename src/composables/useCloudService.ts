import { MessageTypes } from "../models";
import { defaultCloudReg } from "~/models";

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

  const getCloud = (id) => {
    // const url = `api/v1/clouds/${id}`;
    const url = `api/v1/cloud/1`;
    let cloud = ref(Util.clone(defaultCloudReg));
    const isFetch = ref(false);

    const fetch = (id) => {
      isFetch.value = true;
      API.get("", url)
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

  return {
    currentCloud,

    getClouds,
    getCloud,
  };
}