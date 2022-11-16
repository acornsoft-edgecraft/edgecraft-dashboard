<template>
  <div class="partial-container m-0 p-0">
    <ClusterInfo v-model="modelValue.cluster" />
    <KubernetesInfo v-model="modelValue.k8s" />
  </div>
</template>

<script setup lang="ts">
import ClusterInfo from "./cluster-info.vue";
import KubernetesInfo from "~/partialViews/cloud/kubernetes-info.vue";

const { UI } = useAppHelper();

const props = defineProps({
  modelValue: { type: Object, required: true },
});

const emits = defineEmits(["can-continue"]);

const v$ = UI.getValidate();

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

const beforeNextStep = (): boolean => {
  v$.value.$touch();

  if (v$.value.$invalid) {
    return false;
  }
  return true;
};

onActivated(() => {
  v$.value.$touch();

  if (!v$.value.$invalid) {
    emits("can-continue", { value: true });
  } else {
    emits("can-continue", { value: false });
  }
});

defineExpose({ beforeNextStep });
</script>

<style scoped lang="scss"></style>
