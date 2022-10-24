import { MessageTypes } from "~/models";
import { defaultClusterReg } from "~/models";

const currentCluster = ref("");

export function useClusterService(options: any = {}) {
  const { API, UI, Util } = useAppHelper();

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

  const getCluster = () => {
    const url = "api/v1/cluster";
    const cluster = ref(Util.clone(defaultClusterReg));
    const isFetch = ref(false);

    const fetch = (id) => {
      if (id == 0) return;

      isFetch.value = true;
      API.get("", `${url}/${id}`)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch Cluster", res.message);
          } else {
            cluster.value = res.data;
          }
          isFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch Cluster", err);
          isFetch.value = false;
        });
    };

    return { cluster, isFetch, fetch };
  };

  const insertCluster = () => {
    const url = "api/v1/cluster";
    const isInsFetch = ref(false);

    const insFetch = (params) => {
      isInsFetch.value = true;
      API.post("", url, params)
        .then((res) => {
          console.log(res);
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch Cluster", res.message);
          } else {
            console.log(res.data);
          }
          isInsFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch Cluster", err);
          isInsFetch.value = false;
        });
    };

    return { isInsFetch, insFetch };
  };

  const updateCluster = () => {
    const url = "api/v1/cluster";
    const isUpFetch = ref(false);

    const upFetch = (id, params) => {
      isUpFetch.value = true;
      API.put("", `${url}/${id}`, params)
        .then((res) => {
          console.log(res);
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch Cluster", res.message);
          } else {
            console.log(res.data);
          }
          isUpFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch Cluster", err);
          isUpFetch.value = false;
        });
    };

    return { isUpFetch, upFetch };
  };

  const deleteCluster = () => {
    const url = "api/v1/clusters";
    const isDelFetch = ref(false);

    const delFetch = (id) => {
      isDelFetch.value = true;
      API.delete("", `${url}/${id}`)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "Fetch Cluster", res.message);
          }
          isDelFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "Fetch Cluster", err);
          isDelFetch.value = false;
        });
    };

    return { isDelFetch, delFetch };
  };

  return {
    currentCluster,

    getClusters,
    getCluster,
    insertCluster,
    updateCluster,
    deleteCluster,
  };
}
