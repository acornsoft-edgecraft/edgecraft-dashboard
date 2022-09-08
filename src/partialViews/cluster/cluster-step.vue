<template>
  <div class="partial-container m-0 p-0">
    <ClusterInfo v-model="modelValue.cluster" />
    <KubernetesInfo v-model="modelValue.k8s" />
  </div>
</template>

<script setup lang="ts">
// imports
import ClusterInfo from "./cluster-info.vue";
import KubernetesInfo from "~/partialViews/cloud/kubernetes-info.vue";

const { UI } = useAppHelper();
// Page meta
// Props
const props = defineProps({
  modelValue: { type: Object, required: true },
});
// Emits
const emits = defineEmits(["can-continue"]);
// Properties

const v$ = UI.getValidate();
// const v$ = UI.getValidate();
// Compputed
// Watcher
watch(
  () => v$.value,
  (val) => {
    v$.value.$touch();

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

  if (v$.value.$invalid) {
    return false;
  }
  return true;
};
// Events
onActivated(() => {
  v$.value.$touch();

  if (!v$.value.$invalid) {
    emits("can-continue", { value: true });
  } else {
    emits("can-continue", { value: false });
  }
});

defineExpose({ beforeNextStep });
// Logics (like api call, etc)
</script>

<style scoped lang="scss"></style>
