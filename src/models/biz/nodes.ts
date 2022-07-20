import { required, requiredIf } from "@vuelidate/validators"
import { baremetalHostInfo } from "./baremetal"
import { nodeInfo } from "./node"

export interface nodesInfo {
    use_loadbalancer: Boolean,
    loadbalancer_address: String,
    loadbalancer_port: String,
    master_nodes: Array<{ barematal: baremetalHostInfo, node: nodeInfo }>,
    worker_nodes: Array<{ barematal: baremetalHostInfo, node: nodeInfo }>,
    validataions: Object
}

export const defaultNodesInfo: nodesInfo = {
    use_loadbalancer: false,
    loadbalancer_address: '',
    loadbalancer_port: '',
    master_nodes: [],
    worker_nodes: [],
    validataions: {
        use_loadbalancer: { required },
        loadbalancer_address: {
            required: requiredIf(() => (this as any)?.use_loadbalancer),
        },
        loadbalancer_port: {
            required: requiredIf(() => (this as any)?.use_loadbalancer),
        },
    }
}