import { required, requiredIf, ipAddress, between } from "@vuelidate/validators";
import { baremetalHostInfo, defaultBaremetalHostInfo } from "./baremetalhost";
import { nodeInfo, defaultNodeInfo } from "./node";

export interface nodesInfo {
  use_loadbalancer: Boolean;
  loadbalancer_address: String;
  loadbalancer_port: String;
  master_nodes: Array<{ BaremetalHost: baremetalHostInfo; Node: nodeInfo }>;
  worker_nodes: Array<{ BaremetalHost: baremetalHostInfo; Node: nodeInfo }>;
}

export const defaultNodesInfo: nodesInfo = {
  use_loadbalancer: false,
  loadbalancer_address: "",
  loadbalancer_port: "",
  master_nodes: [{ BaremetalHost: defaultBaremetalHostInfo, Node: defaultNodeInfo }],
  worker_nodes: [{ BaremetalHost: defaultBaremetalHostInfo, Node: defaultNodeInfo }],
};

export const defaultNodesInfoValidation = {
  use_loadbalancer: { required },
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
