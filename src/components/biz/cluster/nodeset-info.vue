<template>
  <div class="flex justify-content-end button-wrapper" v-if="type === NodeTypes.Worker">
    <K3Button label="Add WorkerSet" @click="addNodeSet" />
  </div>
  <K3Panel :header="`${type}Set`" v-for="(item, index) in modelValue" :key="index" :toggleable="true">
    <template #icons v-if="type === NodeTypes.Worker">
      <K3Button class="p-panel-header-icon p-link text-danger" @click="removeNodeset(index, item)">
        <span class="pi pi-trash"></span>
      </K3Button>
    </template>
    <K3FormContainer class="no-style">
      <K3FormRow direction="horizontal" :overflow-wrap="true">
        <K3FormColumn label="Namespace" label-align="right" :size="6">{{ item.namespace }}</K3FormColumn>
        <K3FormColumn label="Name" label-align="right" :size="6">{{ item.name }}</K3FormColumn>
      </K3FormRow>
      <K3FormRow direction="horizontal" :overflow-wrap="true">
        <K3FormColumn label="Flavor" label-align="right" :size="6">{{ item.flavor }}</K3FormColumn>
        <K3FormColumn label="Node Count" label-align="right" :size="6">
          <template v-if="!showEditNodeCnt[index]">
            <span class="w-4rem">{{ item.node_count }}</span>
            <K3Button label="변경" @click="changeNodeCount(index, item)" />
          </template>
          <template v-if="showEditNodeCnt[index]">
            <K3InputNumber v-model="item.node_count" @input="changeValue" :min="1" :max="100" show-buttons mode="decimal" field-name="Node Count" input-id="node_count" :allowEmpty="false" />
            <K3Button label="수정" icon="pi pi-check" @click="saveNodeCount(index)" />
            <K3Button label="취소" icon="pi pi-times" class="p-button-secondary" @click="cancelNodeCount(index, item)" />
          </template>
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Labels" label-align="right">
          <template v-for="(label, i) in item.labels" :key="i">
            <K3Chip :label="`${label.key}=${label.value}`" />
          </template>
        </K3FormColumn>
      </K3FormRow>
    </K3FormContainer>
    <K3Divider align="left">{{ type }} Nodes</K3Divider>
    <K3DataTable :value="item.nodes">
      <K3Column field="name" header="Node Name"></K3Column>
      <K3Column field="status" header="Status"></K3Column>
      <K3Column field="version" header="Version"></K3Column>
      <K3Column field="os_image" header="OS Image"></K3Column>
      <K3Column field="container_runtime" header="Container-runtime"></K3Column>
    </K3DataTable>
  </K3Panel>
</template>

<script setup lang="ts">
// imports
import { MessageTypes, NodeTypes } from "~/models";

// Page meta
// Props
const props = defineProps({
  modelValue: { type: Object, required: true },
  type: { type: Number, default: NodeTypes.Master },
});
// Emits
const emits = defineEmits(["add-nodeset"]);
// Properties
const { UI } = useAppHelper();

const showEditNodeCnt = ref([] as any);
const originNodeCnt = ref([] as any);
// Compputed
// Watcher
// Methods
const removeNodeset = (index, item) => {
  UI.showConfirm(
    MessageTypes.ERROR,
    "NodeSet 삭제",
    `<${item.name}> WorkerSet을 삭제하시겠습니까? 하위 Worker Node가 모두 삭제됩니다.`,
    (index) => {
      props.modelValue.splice(index, 1);
    },
    () => {}
  );
};

const changeValue = (event) => {
  console.log("changeValue", event);
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

// Events
onMounted(() => {
  props.modelValue.forEach((ele, index) => {
    showEditNodeCnt.value[index] = false;
  });
});

// Logics (like api call, etc)
</script>
<style scoped lang="scss">
.form-container.no-style {
  .p-button {
    margin-left: 0.5rem;
  }
}
.p-panel:not(:first-child) {
  margin-top: 1rem;
}
.p-panel-header-icon.p-panel-toggler.p-link {
  span.pi.pi-minus:before {
    content: "\e90f" !important;
  }
}
.button-wrapper {
  margin: 1.5rem 0 0 0;
}

.p-chip {
  margin-right: 0.5rem;
}
</style>
