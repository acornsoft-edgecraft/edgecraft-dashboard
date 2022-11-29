<template>
  <div class="flex justify-content-end mt-4" v-if="type === NodeTypes.Worker && succeed">
    <K3Button label="Add WorkerSet" icon="pi pi-plus" @click="addNodeSet" />
  </div>
  <K3Panel :header="`${NodeTypes[type]}Set`" v-for="(item, index) in modelValue" :key="index" :class="panelClass">
    <template #icons v-if="succeed">
      <K3Button icon="pi pi-refresh" class="p-panel-header-icon mr-2" @click="refresh(index, item.nodeset_uid)" />
      <K3Button class="p-panel-header-icon p-link text-danger" @click="remove(index, item)" v-if="type === NodeTypes.Worker">
        <span class="pi pi-trash"></span>
      </K3Button>
    </template>
    <BizClusterNodesetInfo :item="modelValue[index]" :type="type" :succeed="succeed" :params="params" @save-node-count="saveNodeCount" />
  </K3Panel>

  <K3Overlay :active="active" loader="bars" background-color="#830205" />
</template>

<script setup lang="ts">
import { MessageTypes, NodeTypes } from "~/models";

const props = defineProps({
  modelValue: { type: Object, required: true },
  type: { type: Number, default: NodeTypes.Master },
  succeed: { type: Boolean, default: false },
  params: { type: Object, required: true },
});

const emits = defineEmits(["add-nodeset"]);

const { UI } = useAppHelper();

const { isGetFetch, getFetch } = useClusterService().getNodeSet();
const { isRemFetch, removeFetch } = useClusterService().removeNodeSet();
const { isUpCntFetch, upCntFetch } = useClusterService().updateNodeCount();

const panelClass = props.type === NodeTypes.Master ? "" : "worker-wrapper";

const active = computed(() => unref(isGetFetch || isRemFetch || isUpCntFetch));

const refresh = async (index, nodesetId) => {
  let result;
  try {
    result = await getFetch(props.params.cloudId, props.params.clusterId, nodesetId);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, `노드셋 정보`, err);
  }
  if (result.isError) return;

  props.modelValue[index] = { ...result.data };
};

const saveNodeCount = async (val) => {
  let result;
  try {
    result = await upCntFetch(props.params.cloudId, props.params.clusterId, val.nodeset_uid, val.node_count);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, `노드 개수 변경`, err);
  }
  if (result.isError) return;

  UI.showToastMessage(MessageTypes.INFO, "노드 개수 변경", result.message);

  const nodeIndex = (uid) => props.modelValue.findIndex((d) => d.nodeset_uid === uid);
  refresh(nodeIndex(val.nodeset_uid), val.nodeset_uid);
};

const remove = (index, item) => {
  console.log("removenodeset", item);
  UI.showConfirm(
    MessageTypes.ERROR,
    "NodeSet 삭제",
    `<${item.name}> WorkerSet을 삭제하시겠습니까? 하위 Worker Node가 모두 삭제됩니다.`,
    () => removeNodeset(index, item.nodeset_uid),
    () => {}
  );
};

const removeNodeset = async (index, nodesetId) => {
  let result;
  try {
    result = await removeFetch(props.params.cloudId, props.params.clusterId, nodesetId);
  } catch (err) {
    UI.showToastMessage(MessageTypes.ERROR, `노드셋 삭제`, err);
  }
  if (result.isError) return;

  UI.showToastMessage(MessageTypes.INFO, "노드셋 삭제", result.message);
  props.modelValue.splice(index, 1);
};

const addNodeSet = () => {
  emits("add-nodeset", { display: true });
};
</script>
<style scoped lang="scss">
.p-panel {
  margin-top: 1rem;
}

.p-panel.worker-wrapper {
  :deep(.p-panel-header) {
    padding: 0.75rem 1.25rem;
  }
}
</style>
