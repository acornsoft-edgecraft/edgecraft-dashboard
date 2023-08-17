<template>
  <K3FormContainer class="no-style">
    <K3FormRow>
      <K3FormColumn label="Name" label-align="right">{{ item.name }}</K3FormColumn>
    </K3FormRow>
    <K3FormRow direction="horizontal" :overflow-wrap="true">
      <K3FormColumn label="Flavor" label-align="right" :size="6">{{ item.flavor }}</K3FormColumn>
      <K3FormColumn label="Node Count" label-align="right" :size="6" v-if="isEditable">
        <template v-if="!editable">
          <span class="w-4rem">{{ item.node_count }}</span>
          <K3Button label="변경" @click="edit" v-if="succeed" />
        </template>
        <template v-else>
          <div class="flex flex-column">
            <div class="flex">
              <K3InputNumber v-model="item.node_count" :min="1" :max="100" show-buttons mode="decimal" field-name="Node Count" input-id="node_count" :allowEmpty="false" input-class="w-6rem" @input="input" />
              <K3Button label="수정" icon="pi pi-check" :disabled="disabled" @click="save" />
              <K3Button label="취소" icon="pi pi-times" class="p-button-secondary" @click="cancel" />
            </div>
            <div class="flex">
              <div class="error-field basic label pointing error" v-if="invalid">{{ oddErrMsg }}</div>
            </div>
          </div>
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
    <K3Column field="name" header="Node Name" />
    <K3Column field="status" header="Status" />
    <K3Column field="role" header="Role" />
    <K3Column field="age" header="Age" />
    <K3Column field="version" header="Version" />
    <K3Column field="os_image" header="OS Image" />
    <K3Column field="container_image" header="Container-runtime" />
  </K3DataTable>
</template>

<script setup lang="ts">
import { MessageTypes, NodeTypes, oddErrMsg } from "~/models";

const props = defineProps({
  item: { type: Object, required: true },
  succeed: { type: Boolean, default: false },
  type: { type: Number, default: NodeTypes.Master },
  params: { type: Object, required: true },
});

const emits = defineEmits(["save-node-count"]);

const { UI, Util } = useAppHelper();

const editable = ref(false);
const originCnt = ref();

const disabled = computed(() => originCnt.value === props.item.node_count || invalid.value);
const isEditable = computed(() => props.type === NodeTypes.Worker || (props.params.bootstrapProvider === 1 && props.type === NodeTypes.Master));

const edit = () => {
  originCnt.value = props.item.node_count;
  editable.value = true;
};

const invalid = ref(false);
const save = async () => {
  if (originCnt.value === props.item.node_count) return;
  if (invalid.value || props.item.node_count === 0) {
    UI.showToastMessage(MessageTypes.ERROR, "node count error", "설정한 노드수를 확인해주세요.");
    return;
  }

  emits("save-node-count", { nodeset_uid: props.item.nodeset_uid, node_count: props.item.node_count });
  editable.value = false;
};

const cancel = () => {
  editable.value = false;
  props.item.node_count = originCnt.value;
};

const input = (event) => {
  invalid.value = props.type === NodeTypes.Master && event.value > 0 && event.value % 2 === 0;
};
</script>
<style scoped lang="scss">
.p-button {
  margin-left: 0.5rem;
}

.btn-wrapper {
  :deep(.p-button) {
    align-content: start;
  }
}
</style>
