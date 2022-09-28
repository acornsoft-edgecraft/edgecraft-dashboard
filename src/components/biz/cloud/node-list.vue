<template>
  <K3Panel :header="`${NodeTypes[type]} Nodes`">
    <template #icons>
      <K3Button icon="pi pi-plus" @click="addNode" />
    </template>
    <template #empty>
      <div class="w-full text-center">
        <p class="text-orange-500">No records found.</p>
      </div>
    </template>

    <K3DataTable :value="nodes">
      <K3Column field="node.node_name" header="Node Name"></K3Column>
      <K3Column header="Status">
        <template #body>
          <i class="pi pi-check text-success"></i>
          <i class="pi pi-times text-danger"></i>
        </template>
      </K3Column>
      <K3Column field="node.ip_address" header="IP Address"></K3Column>
      <K3Column field="baremetal.host_name" header="Baremetal Host Name"></K3Column>
      <K3Column field="baremetal.bmc_address" header="BMC Address"></K3Column>
      <K3Column :style="{ width: '100px' }">
        <template #body="slotProps">
          <K3Button icon="pi pi-trash" class="p-button-danger p-button-text" @click="removeNode(slotProps)" v-if="removable(slotProps.index)"></K3Button>
        </template>
      </K3Column>
    </K3DataTable>
  </K3Panel>
</template>

<script setup lang="ts">
import { MessageTypes, NodeTypes } from "~/models";

const { UI } = useAppHelper();
const props = defineProps({
  modelValue: { type: Object, default: {} },
  type: { type: Number, default: NodeTypes.Master },
});
const emits = defineEmits(["add-node"]);

const nodes = ref(props.modelValue);
const removable = (index) => !(props.type == NodeTypes.Master && index < 1);

const addNode = () => {
  emits("add-node", { type: props.type, display: true });
};

const removeNode = (node) => {
  UI.showConfirm(
    MessageTypes.WARN,
    "노드 삭제",
    `<${node.data.node.node_name}> 노드를 삭제하시겠습니까?`,
    () => {
      console.log("accept");
      // TODO: call api
      nodes.value.splice(node.index, 1);
    },
    () => {
      console.log("reject");
    }
  );
};
</script>
<style scoped lang="scss">
.p-panel:not(:first-child) {
  margin-top: 1rem;
}
</style>
