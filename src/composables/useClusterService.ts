import { MessageTypes } from "~/models";

const currentCluster = ref("");
const { Util } = useAppHelper();

export function useClusterService(options: any = {}) {
  const { API, UI } = useAppHelper();

  const getClusters = () => {
    const url = "api/v1/clusters";
    const clusters = ref([] as any);
    const isFetch = ref(false);

    const fetch = () => {
      isFetch.value = true;

      API.get("", url)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch Clusters", res.message);
          } else {
            res.data.forEach((item) => {
              clusters.value.push(item);
            });
          }
          isFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch Clusters", err);
          isFetch.value = false;
        });
    };

    return { clusters, isFetch, fetch };
  };

  return {
    currentCluster,

    getClusters,
  };
}
