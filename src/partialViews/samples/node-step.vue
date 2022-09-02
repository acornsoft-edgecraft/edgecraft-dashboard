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

    <MasterNodesInfo class="mt-5" v-model="modelValue.nodes.master_nodes" validate="v$.master_nodes" />
    <WorkerNodesInfo class="mt-5" v-model="modelValue.nodes.worker_nodes" validate="v$.worker_nodes" />
  </div>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import MasterNodesInfo from "./master-nodes-info.vue";
import WorkerNodesInfo from "./worker-nodes-info.vue";
import { nodesInfo, defaultNodesInfoValidation } from "~/models/samples";

const props = defineProps({
  modelValue: { type: Object, required: true },
});
const emits = defineEmits(["can-continue"]);

const nodes = ref(props.modelValue.nodes);

const v$ = useVuelidate(defaultNodesInfoValidation, nodes as nodesInfo);

watch(
  () => v$.value,
  (val) => {
    v$.value.$touch(); // 자식의 오류 여부 검증

    if (!val.$invalid) {
      emits("can-continue", { value: true });
    } else {
      emits("can-continue", { value: false });
    }
  }
);

const beforeNextStep = (): boolean => {
  v$.value.$touch();

  if (v$.value.$invalid) {
    return false;
  }
  return true;
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
