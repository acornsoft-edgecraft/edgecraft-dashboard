<template>
  <div class="partial-container m-0 p-0">
    <OpenstackInfo v-model="modelValue.openstack" />
  </div>
</template>

<script setup lang="ts">
import OpenstackInfo from "./openstack-info.vue";
// imports
const { UI } = useAppHelper();
// Page meta
// Props
const props = defineProps({
  modelValue: { type: Object, required: true },
});
// Emits
const emits = defineEmits(["can-continue"]);
// const emits = defineEmits(['eventname']),
// Properties
const v$ = UI.getValidate();
// Compputed
// Watcher
watch(
  () => v$.value,
  (val) => {
    v$.value.$touch(); // 자식의 오류 여부 검증

    console.log(`watch >>> ${val.$invalid}`);
    console.log(`errors >>> ${JSON.stringify(val.$errors)}`);
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

defineExpose({ beforeNextStep });
// Logics (like api call, etc)
</script>

<style scoped lang="scss"></style>
