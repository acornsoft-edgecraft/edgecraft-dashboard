import { nodesetInfo, defaultNodesetInfo, defaultNodesetInfoValidation } from "./nodeset";

export interface clusterNodesInfo {
  use_loadbalancer: Boolean;
  master_sets: Array<nodesetInfo>;
  worker_sets: Array<nodesetInfo>;
}

export const defaultClusterNodesInfo: clusterNodesInfo = {
  use_loadbalancer: false,
  master_sets: [defaultNodesetInfo],
  worker_sets: [defaultNodesetInfo],
};

export const defaultClusterNodesInfoValidation = {
  use_loadbalancer: {},
  // master_sets: defaultNodesetInfoValidation,
  // worker_sets: defaultNodesetInfoValidation,
};
