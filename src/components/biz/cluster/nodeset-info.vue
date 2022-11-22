<template>
  <div class="flex justify-content-end button-wrapper" v-if="type === NodeTypes.Worker && provisioned">
    <K3Button label="Add WorkerSet" icon="pi pi-plus" @click="addNodeSet" />
  </div>
  <K3Panel :header="`${NodeTypes[type]}Set`" v-for="(item, index) in modelValue" :key="index">
    <template #icons v-if="type === NodeTypes.Worker && provisioned">
      <K3Button class="p-panel-header-icon p-link text-danger" @click="removeNodeset(index, item)">
        <span class="pi pi-trash"></span>
      </K3Button>
    </template>
    <K3FormContainer class="no-style">
      <K3FormRow>
        <K3FormColumn label="Name" label-align="right">{{ item.name }}</K3FormColumn>
      </K3FormRow>
      <K3FormRow direction="horizontal" :overflow-wrap="true">
        <K3FormColumn label="Flavor" label-align="right" :size="6">{{ item.flavor }}</K3FormColumn>
        <K3FormColumn label="Node Count" label-align="right" :size="6">
          <template v-if="provisioned">
            <template v-if="!showEditNodeCnt[index]">
              <span class="w-4rem">{{ item.node_count }}</span>
              <K3Button label="변경" @click="changeNodeCount(index, item)" />
            </template>
            <template v-if="showEditNodeCnt[index]">
              <K3InputNumber v-model="item.node_count" :min="1" :max="100" show-buttons mode="decimal" field-name="Node Count" input-id="node_count" :allowEmpty="false" input-class="w-6rem" />
              <K3Button label="수정" icon="pi pi-check" @click="saveNodeCount(index)" />
              <K3Button label="취소" icon="pi pi-times" class="p-button-secondary" @click="cancelNodeCount(index, item)" />
            </template>
          </template>
          <template v-else>
            <span class="w-4rem">{{ item.node_count }}</span>
          </template>
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Labels" label-align="right">
          <template v-for="(label, i) in item.labels" :key="i">
            <K3Chip :label="Util.getLabel(label)" />
          </template>
        </K3FormColumn>
      </K3FormRow>
    </K3FormContainer>
    <K3Divider align="left">{{ NodeTypes[type] }} Nodes</K3Divider>
    <K3DataTable :value="item.nodes">
      <template #empty>
        <div class="w-full text-center">
          <p class="text-orange-500">No nodes found.</p>
        </div>
      </template>
      <K3Column field="name" header="Node Name"></K3Column>
      <K3Column field="status" header="Status"></K3Column>
      <K3Column field="role" header="Role"></K3Column>
      <K3Column field="age" header="Age"></K3Column>
      <K3Column field="version" header="Version"></K3Column>
      <K3Column field="os_image" header="OS Image"></K3Column>
      <K3Column field="container_image" header="Container-runtime"></K3Column>
    </K3DataTable>
  </K3Panel>
</template>

<script setup lang="ts">
import { MessageTypes, NodeTypes } from "~/models";

const props = defineProps({
  modelValue: { type: Object, required: true },
  type: { type: Number, default: NodeTypes.Master },
  provisioned: { type: Boolean, default: false },
});

const emits = defineEmits(["add-nodeset"]);

const { UI, Util } = useAppHelper();

const showEditNodeCnt = ref([] as any);
const originNodeCnt = ref([] as any);

const removeNodeset = (index, item) => {
  UI.showConfirm(
    MessageTypes.ERROR,
    "NodeSet 삭제",
    `<${item.name}> WorkerSet을 삭제하시겠습니까? 하위 Worker Node가 모두 삭제됩니다.`,
    (index) => {
      // TODO: call api
      // props.modelValue.splice(index, 1);
    },
    () => {}
  );
};

const addNodeSet = () => {
  emits("add-nodeset", { display: true });
};

const changeNodeCount = (index, item) => {
  showEditNodeCnt.value[index] = true;
  originNodeCnt.value[index] = item.node_count;
};
const saveNodeCount = (index) => {
  showEditNodeCnt.value[index] = false;

  // TODO: api call
};
const cancelNodeCount = (index, item) => {
  showEditNodeCnt.value[index] = false;
  item.node_count = originNodeCnt.value[index];
};

onMounted(() => {
  props.modelValue.forEach((ele, index) => {
    showEditNodeCnt.value[index] = false;
  });
});
</script>
<style scoped lang="scss">
.form-container.no-style {
  .p-button {
    margin-left: 0.5rem;
  }
}
.p-panel {
  margin-top: 1rem;
}

.button-wrapper {
  margin: 1.5rem 0 0 0;
}

.p-chip {
  margin-right: 0.5rem;
}
</style>
