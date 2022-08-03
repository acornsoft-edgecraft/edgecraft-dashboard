<template>
  <div class="partial-container m-0 p-0">
    <K8SInfo class="mb-3" v-model="modelValue.cluster.k8s" />
    <BaremetalInfo class="mb-3" v-model="modelValue.cluster.baremetal" />
  </div>
</template>

<script setup lang="ts">
// imports
import useVuelidate from "@vuelidate/core";
import K8SInfo from "./kubernetes-info.vue";
import BaremetalInfo from "./baremetal-info.vue";

// Page meta

// Props
const props = defineProps({
  modelValue: { type: Object, required: true },
});
// Emits
const emits = defineEmits(["can-continue"]);
// Properties
const v$ = useVuelidate();
// Compputed
// Watcher
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

  if (!v$.value.$invalid) {
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
