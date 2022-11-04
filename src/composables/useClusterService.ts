import { MessageTypes, defaultClusterReg } from "~/models";

const currentCluster = ref("");

export function useClusterService(options: any = {}) {
  const { API, UI, Util } = useAppHelper();
  const url = "api/v1/clusters";

  const getClusters = () => {
    const clusters = ref([] as any);
    const isFetch = ref(false);

    const fetch = () => {
      isFetch.value = true;

      API.get("", url)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "클러스터 목록", res.message);
          } else {
            res.data.forEach((item) => {
              clusters.value.push(item);
            });
          }
          isFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "클러스터 목록", err);
          isFetch.value = false;
        });
    };

    return { clusters, isFetch, fetch };
  };

  const getCluster = () => {
    const cluster = ref(Util.clone(defaultClusterReg));
    const isFetch = ref(false);

    const fetch = async (id) => {
      isFetch.value = true;
      const res = await API.get("", `${url}/${id}`);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "클러스터 정보", res.message);
        isFetch.value = false;
        return false;
      } else {
        cluster.value = res.data;
        isFetch.value = false;
        return true;
      }
    };

    return { cluster, isFetch, fetch };
  };

  const insertCluster = () => {
    const isInsFetch = ref(false);

    const insFetch = async (params) => {
      isInsFetch.value = true;
      const res = await API.post("", url, params);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "클러스터 등록", res.message);
        isInsFetch.value = false;
        return false;
      } else {
        isInsFetch.value = false;
        return true;
      }
    };

    return { isInsFetch, insFetch };
  };

  const updateCluster = () => {
    const isUpFetch = ref(false);

    const upFetch = async (id, params) => {
      isUpFetch.value = true;
      const res = await API.put("", `${url}/${id}`, params);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "클러스터 수정", res.message);
        isUpFetch.value = false;
        return false;
      } else {
        isUpFetch.value = false;
        return true;
      }
    };

    return { isUpFetch, upFetch };
  };

  const deleteCluster = () => {
    const isDelFetch = ref(false);

    const delFetch = async (id) => {
      isDelFetch.value = true;
      const res = await API.delete("", `${url}/${id}`);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "클러스터 삭제", res.message);
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
    currentCluster,

    getClusters,
    getCluster,
    insertCluster,
    updateCluster,
    deleteCluster,
  };
}
