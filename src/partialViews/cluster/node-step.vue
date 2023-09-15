<template>
  <div class="partial-container m-0 p-0">
    <K3FormContainer class="no-bg">
      <template #header>Node 정보</template>
      <K3FormRow class="h-3rem">
        <K3FormColumn>
          <K3FormCheckField v-model="v$.use_loadbalancer" id="use_loadbalancer" label="Use Load Balancer" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <NodesetInfo v-model="modelValue.nodes.master_sets" :type="NodeTypes.Master" :bootstrapProvider="modelValue.k8s.bootstrap_provider" />
      </K3FormRow>
      <K3FormRow>
        <NodesetInfo v-model="modelValue.nodes.worker_sets" :type="NodeTypes.Worker" :bootstrapProvider="modelValue.k8s.bootstrap_provider" />
      </K3FormRow>
    </K3FormContainer>
  </div>
</template>

<script setup lang="ts">
import NodesetInfo from "./nodeset-info.vue";
import { NodeTypes, defaultClusterNodesInfoValidation } from "~/models";

const { UI } = useAppHelper();

const props = defineProps({
  modelValue: { type: Object, required: true },
});

const emits = defineEmits(["can-continue"]);

const nodes = ref(props.modelValue.nodes);
const v$ = UI.getValidate(defaultClusterNodesInfoValidation, nodes);

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

defineExpose({ beforeNextStep });
</script>

<style scoped lang="scss"></style>
