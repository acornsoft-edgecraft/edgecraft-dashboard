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

    <K3DataTable :value="modelValue">
      <template #empty>
        <div class="w-full text-center">
          <p class="text-orange-500">No nodes found.</p>
        </div>
      </template>
      <K3Column field="Node.node_name" header="Node Name" />
      <K3Column header="Status">
        <template #body>
          <i class="pi pi-check text-success"></i>
          <i class="pi pi-times text-danger"></i>
        </template>
      </K3Column>
      <K3Column field="Node.ip_address" header="IP Address" />
      <K3Column field="BaremetalHost.host_name" header="Baremetal Host Name" />
      <K3Column field="BaremetalHost.bmc_address" header="BMC Address" />
      <K3Column :style="{ width: '100px' }">
        <template #body="slotProps">
          <K3Button icon="pi pi-trash" class="p-button-danger p-button-text" @click="removeNode(slotProps.data)"></K3Button>
        </template>
      </K3Column>
    </K3DataTable>
  </K3Panel>
</template>

<script setup lang="ts">
import { MessageTypes, NodeTypes } from "~/models";

const { UI } = useAppHelper();

const props = defineProps({
  modelValue: { type: Array, required: true },
  type: { type: Number, default: NodeTypes.Master },
});
const emits = defineEmits(["add-node", "remove-node"]);

const addNode = () => {
  emits("add-node", { type: props.type, display: true });
};
const removeNode = (data) => {
  if (props.type === NodeTypes.Master && props.modelValue.length === 1) {
    UI.showMessage(MessageTypes.ERROR, "노드 삭제 오류", "노드를 삭제할 수 없습니다. Master Node는 한개 이상 존재해야 합니다.");
    return;
  }
  emits("remove-node", data);
};
</script>
<style scoped lang="scss">
.p-panel:not(:first-child) {
  margin-top: 1rem;
}
</style>
