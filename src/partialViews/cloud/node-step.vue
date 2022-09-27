<template>
  <div class="partial-container m-0 p-0">
    <K3FormContainer class="no-bg">
      <template #header>Node 정보</template>
      <K3FormRow class="h-3rem">
        <K3FormColumn>
          <K3FormCheckField v-model="v$.use_loadbalancer" id="use_loadbalancer" label="Loadbalancer" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow direction="horizontal" v-if="nodes.use_loadbalancer">
        <K3FormColumn label="IP Address" label-align="right" :size="6">
          <K3FormInputField v-model="v$.loadbalancer_address" field-name="IP Address" class="w-full" />
        </K3FormColumn>
        <K3FormColumn label="Port" label-align="right" :size="6">
          <K3FormInputField v-model="v$.loadbalancer_port" field-name="Port" class="w-full" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <NodesInfo class="mt-5" :type="NodeTypes.Master" v-model="modelValue.nodes.master_nodes" validate="v$.master_nodes" />
      </K3FormRow>
      <K3FormRow>
        <NodesInfo class="mt-5" :type="NodeTypes.Worker" v-model="modelValue.nodes.worker_nodes" validate="v$.worker_nodes" />
      </K3FormRow>
    </K3FormContainer>
  </div>
</template>

<script setup lang="ts">
import NodesInfo from "./nodes-info.vue";
import { NodeTypes, defaultNodesInfoValidation } from "~/models";

const props = defineProps({
  modelValue: { type: Object, required: true },
});
const emits = defineEmits(["can-continue"]);

const nodes = ref(props.modelValue.nodes);

console.log(`node step >>> model value: ${JSON.stringify(nodes.value)}`);

const v$ = useAppHelper().UI.getValidate(defaultNodesInfoValidation, nodes);

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
