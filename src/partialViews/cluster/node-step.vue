<template>
  <div class="partial-container m-0 p-0">
    <K3FormContainer>
      <template #header>Node 정보</template>
      <K3FormRow class="h-3rem">
        <K3FormColumn>
          <K3FormCheckField v-model="v$.use_loadbalancer" id="use_loadbalancer" label="Loadbalancer" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <NodesetInfo v-model="modelValue.nodes.master_sets" :type="NodeTypes.MASTER" />
      </K3FormRow>
      <K3FormRow>
        <NodesetInfo v-model="modelValue.nodes.worker_sets" :type="NodeTypes.WORKER" />
      </K3FormRow>
    </K3FormContainer>
  </div>
</template>

<script setup lang="ts">
import NodesetInfo from "./nodeset-info.vue";
import { NodeTypes, defaultClusterNodesInfoValidation } from "~/models";

// imports
const { UI } = useAppHelper();
// Page meta
// Props
const props = defineProps({
  modelValue: { type: Object, required: true },
});
// Emits
const emits = defineEmits(["can-continue"]);
// Properties
const nodes = ref(props.modelValue.nodes);
const v$ = UI.getValidate(defaultClusterNodesInfoValidation, nodes);
// Compputed
// Watcher
watch(
  () => v$.value,
  (val) => {
    v$.value.$touch(); // 자식의 오류 여부 검증

    console.log(v$.value.$errors);
    console.log(`watch >>> ${val.$invalid}`);
    if (!val.$invalid) {
      emits("can-continue", { value: true });
    } else {
      emits("can-continue", { value: false });
    }
  }
);

// Methods
const beforeNextStep = (): boolean => {
  v$.value.$touch();

  console.log(`validation >>> ${JSON.stringify(props.modelValue)}`);
  if (v$.value.$invalid) {
    return false;
  }
  return true;
};

// Events
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
// Logics (like api call, etc)
</script>

<style scoped lang="scss"></style>
