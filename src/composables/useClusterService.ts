import { MessageTypes, defaultClusterReg } from "~/models";

const currentCluster = ref("");

export function useClusterService(options: any = {}) {
  const { API, UI, Util } = useAppHelper();
  const url_prefix = "api/v1/clouds";

  const getClusters = () => {
    const clusters = ref([] as any);
    const isFetch = ref(false);

    const fetch = (cloudId) => {
      isFetch.value = true;

      API.get("", `${url_prefix}/${cloudId}/clusters`)
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

    const fetch = async (cloudId, id) => {
      isFetch.value = true;
      const res = await API.get("", `${url_prefix}/${cloudId}/clusters/${id}`);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "클러스터 정보", res.message);
      } else {
        cluster.value = res.data;
      }
      isFetch.value = false;
      return !res.isError;
    };

    return { cluster, isFetch, fetch };
  };

  const insertCluster = () => {
    const isInsFetch = ref(false);

    const insFetch = async (cloudId, params) => {
      isInsFetch.value = true;
      const res = await API.post("", `${url_prefix}/${cloudId}/clusters`, params);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "클러스터 등록", res.message);
      }
      isInsFetch.value = false;
      return res;
    };

    return { isInsFetch, insFetch };
  };

  const updateCluster = () => {
    const isUpFetch = ref(false);

    const upFetch = async (cloudId, clusterId, params) => {
      isUpFetch.value = true;
      const res = await API.put("", `${url_prefix}/${cloudId}/clusters/${clusterId}`, params);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "클러스터 수정", res.message);
      }
      isUpFetch.value = false;
      return res;
    };

    return { isUpFetch, upFetch };
  };

  const deleteCluster = () => {
    const isDelFetch = ref(false);

    const delFetch = async (cloudId, clusterId) => {
      isDelFetch.value = true;
      const res = await API.delete("", `${url_prefix}/${cloudId}/clusters/${clusterId}`);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "클러스터 삭제", res.message);
      }
      isDelFetch.value = false;
      return res;
    };

    return { isDelFetch, delFetch };
  };

  const provisionCluster = () => {
    const isProFetch = ref(false);

    const proFetch = async (cloudId, clusterId) => {
      isProFetch.value = true;
      const res = await API.post("", `${url_prefix}/${cloudId}/clusters/${clusterId}`, null);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "클러스터 생성", res.message);
      }
      isProFetch.value = false;
      return res;
    };

    return { isProFetch, proFetch };
  };

  return {
    currentCluster,

    getClusters,
    getCluster,
    insertCluster,
    updateCluster,
    deleteCluster,
    provisionCluster,
  };
}
