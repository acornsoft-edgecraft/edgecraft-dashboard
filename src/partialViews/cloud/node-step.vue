<template>
  <div calss="p-card">
    <h5 class="form-title">Node 정보</h5>
    <div class="field grid">
      <div class="field col-12 field-checkbox">
        <K3Checkbox id="use_loadbalancer" v-model="nodes.use_loadbalancer" :binary="true" class="mr-2" />
        <label for="use_loadbalancer" class="pt-1">Loadbalancer</label>
      </div>
      <div class="field col-6" v-if="nodes.use_loadbalancer">
        <label for="lb_address">IP Address</label>
        <K3InputText id="lb_address" v-model="v$.loadbalancer_address.$model" type="text" placeholder="IP Address" class="text-base text-color w-full" :class="{ 'p-invalid': v$.loadbalancer_address.$invalid }" />
        <small v-if="v$.loadbalancer_address.$invalid" class="p-error">{{ v$?.loadbalancer_address?.required?.$message.replace("value", "IP Address") }}</small>
      </div>
      <div class="field col-6" v-if="nodes.use_loadbalancer">
        <label for="lb_port">Port</label>
        <K3InputText id="lb_port" v-model="v$.loadbalancer_port.$model" type="text" placeholder="Port" class="text-base text-color w-full" :class="{ 'p-invalid': v$.loadbalancer_port.$invalid }" />
        <small v-if="v$.loadbalancer_port.$invalid" class="p-error">{{ v$.loadbalancer_port.required.$message.replace("value", "Port") }}</small>
      </div>
    </div>

    <NodesInfo class="mt-5" :type="NodeType.MASTER" v-model="modelValue.nodes.master_nodes" @dialog:label="dialogLabel" validate="v$.master_nodes" />
    <NodesInfo class="mt-5" :type="NodeType.WORKER" v-model="modelValue.nodes.worker_nodes" @dialog:label="dialogLabel" validate="v$.worker_nodes" />

    <K3Dialog header="Labels 추가" v-model:visible="nodeLabel.display" :modal="true" :style="{ width: '50vw' }">
      <div class="field col-12">
        <label for="label_key" class="w-1">Key</label>
        <K3InputText class="w-5" v-model="label.key" />
        <label for="label_value" class="w-1">Value</label>
        <K3InputText class="w-5" v-model="label.value" />
      </div>
      <template #footer>
        <K3Button label="취소" icon="pi pi-times" @click="closeModal" class="p-button-text" />
        <K3Button label="저장" icon="pi pi-check" @click="addLabel" autofocus />
      </template>
    </K3Dialog>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import NodesInfo from "./nodes-info.vue";
import { NodeType, nodesInfo, defaultNodesInfoValidation, defaultLabelInfo } from "~/models";

const { Util } = useAppHelper();
const props = defineProps({
  modelValue: { type: Object, required: true },
});
const emits = defineEmits(["can-continue"]);

const nodes = ref(props.modelValue.nodes);

const nodeLabel = ref({ display: false, type: "", index: 0 });
const label = defaultLabelInfo;

console.log(`node step >>> model value: ${JSON.stringify(nodes.value)}`);

const v$ = useVuelidate(defaultNodesInfoValidation, nodes as nodesInfo);

watch(
  () => v$.value,
  (val) => {
    v$.value.$touch(); // 자식의 오류 여부 검증

    console.log(`watch >>> ${val.$invalid}`);
    if (!val.$invalid) {
      emits("can-continue", { value: true });
    } else {
      emits("can-continue", { value: false });
    }
  }
);

const beforeNextStep = (): boolean => {
  v$.value.$touch();

  console.log(`validation >>> ${JSON.stringify(props.modelValue)}`);
  if (v$.value.$invalid) {
    return false;
  }
  return true;
};

const dialogLabel = (payload) => {
  nodeLabel.value = payload;
};

const closeModal = () => {
  nodeLabel.value.display = false;
};

const addLabel = () => {
  let target;
  if (nodeLabel.value.type == NodeType.MASTER) {
    target = nodes.value.master_nodes;
  } else {
    target = nodes.value.worker_nodes;
  }

  target[nodeLabel.value.index].node.labels.push(Util.clone(label));

  closeModal();
};

onActivated(() => {
  v$.value.$touch();

  if (!v$?.value.$invalid) {
    emits("can-continue", { value: true });
  } else {
    emits("can-continue", { value: false });
  }
});

onMounted(() => {});

defineExpose({ beforeNextStep });
</script>

<style scoped lang="scss"></style>
