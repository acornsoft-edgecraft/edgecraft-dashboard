<template>
  <K3Panel :header="`${type} Nodes`">
    <template #icons>
      <K3Button icon="pi pi-plus" @click="addNode" />
    </template>
    <template #empty>
      <div class="w-full text-center">
        <p class="text-orange-500">No records found.</p>
      </div>
    </template>

    <K3DataTable :value="modelValue">
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
          <K3Button icon="pi pi-trash" class="p-button-danger p-button-text" @click="removeNode(slotProps.data)" v-if="removable(slotProps.index)"></K3Button>
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
  type: { type: String, default: NodeTypes.MASTER },
});
const emits = defineEmits(["add-node"]);

const removable = (index) => !(props.type == NodeTypes.MASTER && index < 1);

const addNode = () => {
  emits("add-node", { type: props.type, display: true });
};

const removeNode = (data) => {
  UI.showConfirm(
    MessageTypes.WARN,
    "노드 삭제",
    `<${data.node.node_name}> 노드를 삭제하시겠습니까?`,
    () => {
      console.log("accept");
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
