<template>
  <div class="partial-container m-0 p-0">
    <CloudInfo v-model="modelValue.cloud" @visible-change="onVisibleChange" />
  </div>
</template>

<script setup lang="ts">
// imports
import CloudInfo from "./cloud-info.vue";

const { UI } = useAppHelper();

// Page meta
// Props
const props = defineProps({
  modelValue: { type: Object, required: true },
});

// Emits
const emits = defineEmits(["can-continue", "visible-change"]);

// Properties
const v$ = UI.getValidate();

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

const onVisibleChange = (val) => {
  emits("visible-change", val);
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

<style scoped lang="scss">
.field > label {
  justify-content: end;
}
</style>
