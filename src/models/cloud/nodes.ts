import { helpers, required, requiredIf, ipAddress, between } from "@vuelidate/validators";
import { baremetalHostInfo, defaultBaremetalHostInfo, defaultBaremetalHostInfoValidation } from "./baremetalhost";
import { defaultNodeInfo, defaultNodeInfoValidation, nodeInfo } from "./node";

export enum NodeType {
  MASTER = "Master",
  WORKER = "Worker",
}

export interface nodesInfo {
  use_loadbalancer: Boolean;
  loadbalancer_address: String;
  loadbalancer_port: String;
  master_nodes: Array<{ baremetal: baremetalHostInfo; node: nodeInfo }>;
  worker_nodes: Array<{ baremetal: baremetalHostInfo; node: nodeInfo }>;
}

export const defaultNodesInfo: nodesInfo = {
  use_loadbalancer: false,
  loadbalancer_address: "",
  loadbalancer_port: "",
  master_nodes: [{ baremetal: defaultBaremetalHostInfo, node: defaultNodeInfo }],
  worker_nodes: [{ baremetal: defaultBaremetalHostInfo, node: defaultNodeInfo }],
};

export const defaultNodesInfoValidation = {
  loadbalancer_address: {
    // @ts-ignore:2345
    required: requiredIf((_, vm) => vm.use_loadbalancer),
    ipAddress,
  },
  loadbalancer_port: {
    // @ts-ignore:2345
    required: requiredIf((_, vm) => vm.use_loadbalancer),
    between: between(0, 65536),
  },
};