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
      return res;
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

  const getNodeSets = () => {
    const isGetFetch = ref(false);

    const getFetch = async (cloudId, clusterId) => {
      isGetFetch.value = true;
      const res = await API.get("", `${url_prefix}/${cloudId}/clusters/${clusterId}/nodesets`);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "노드셋 목록", res.message);
      }
      isGetFetch.value = false;
      return res;
    };

    return { isGetFetch, getFetch };
  };

  const addNodeSet = () => {
    const isAddFetch = ref(false);

    const addFetch = async (cloudId, clusterId, params) => {
      isAddFetch.value = true;
      const res = await API.post("", `${url_prefix}/${cloudId}/clusters/${clusterId}/nodesets`, params);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "노드셋 추가", res.message);
      }
      isAddFetch.value = false;
      return res;
    };

    return { isAddFetch, addFetch };
  };

  const getNodeSet = () => {
    const isGetFetch = ref(false);

    const getFetch = async (cloudId, clusterId, nodesetId) => {
      isGetFetch.value = true;
      const res = await API.get("", `${url_prefix}/${cloudId}/clusters/${clusterId}/nodesets/${nodesetId}`);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "노드셋 정보", res.message);
      }
      isGetFetch.value = false;
      return res;
    };

    return { isGetFetch, getFetch };
  };

  const removeNodeSet = () => {
    const isRemFetch = ref(false);

    const removeFetch = async (cloudId, clusterId, nodesetId) => {
      isRemFetch.value = true;
      const res = await API.delete("", `${url_prefix}/${cloudId}/clusters/${clusterId}/nodesets/${nodesetId}`);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "노드셋 삭제", res.message);
      }
      isRemFetch.value = false;
      return res;
    };

    return { isRemFetch, removeFetch };
  };

  const updateNodeCount = () => {
    const isUpCntFetch = ref(false);

    const upCntFetch = async (cloudId, clusterId, nodeSetId, nodeCount) => {
      isUpCntFetch.value = true;
      const res = await API.get("", `${url_prefix}/${cloudId}/clusters/${clusterId}/nodesets/${nodeSetId}/${nodeCount}`);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "노드 개수 수정", res.message);
      }
      isUpCntFetch.value = false;
      return res;
    };

    return { isUpCntFetch, upCntFetch };
  };

  const getBenchmarksList = () => {
    const cluster = ref({} as any);
    const benchmarks = ref([] as any);
    const isFetch = ref(false);

    const fetch = (cloudId, clusterId) => {
      isFetch.value = true;

      API.get("", `${url_prefix}/${cloudId}/clusters/${clusterId}/benchmarks`)
        .then((res) => {
          if (res.isError) {
            UI.showToastMessage(MessageTypes.ERROR, "CIS Benchmarks 목록", res.message);
          } else {
            cluster.value = res.data.cluster;
            res.data.list.forEach((item) => {
              item.created = new Date(item.created);
              benchmarks.value.push(item);
            });
          }
          isFetch.value = false;
        })
        .catch((err) => {
          UI.showToastMessage(MessageTypes.ERROR, "CIS Benchmarks 목록", err);
          isFetch.value = false
        });
    };

    return { cluster, benchmarks, isFetch, fetch };
  };

  const getBenchmarks = () => {
    const benchmarks = ref();
    const isFetch = ref(false);

    const fetch = async (cloudId, clusterId, id) => {
      isFetch.value = true;
      const res = await API.get("", `${url_prefix}/${cloudId}/clusters/${clusterId}/benchmarks/${id}`);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "Benchmarks 정보", res.message);
      } else {
        benchmarks.value = res.data;
      }
      isFetch.value = false;
      return res;
    };

    return { benchmarks, isFetch, fetch };
  };

  const execBenchmarks = () => {
    const isExecFetch = ref(false);

    const execFetch = async (cloudId, clusterId) => {
      isExecFetch.value = true;
      const res = await API.post("", `${url_prefix}/${cloudId}/clusters/${clusterId}/benchmarks`, null);
      if (res.isError) {
        UI.showToastMessage(MessageTypes.ERROR, "Benchmarks 실행", res.message);
      }
      isExecFetch.value = false;
      return res;
    };

    return { isExecFetch, execFetch };
  }

  return {
    currentCluster,

    getClusters,
    getCluster,
    insertCluster,
    updateCluster,
    deleteCluster,
    provisionCluster,

    getNodeSets,
    getNodeSet,
    addNodeSet,
    removeNodeSet,
    updateNodeCount,

    getBenchmarksList,
    getBenchmarks,
    execBenchmarks,
  };
}
