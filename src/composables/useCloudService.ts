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

  const getCloud = () => {
    // const url = `api/v1/clouds`;
    const url = `api/v1/cloud`;
    let cloud = ref(Util.clone(defaultCloudReg));
    const isFetch = ref(false);

    const fetch = (id) => {
      if (id == 0) return;

      isFetch.value = true;
      API.get("", `${url}/${id}`)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch Cloud", res.message);
          } else {
            console.log("res.data", res.data);
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
