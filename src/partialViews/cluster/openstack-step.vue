<template>
  <div class="partial-container m-0 p-0">
    <OpenstackInfo v-model="modelValue.openstack" :bootstrapProvider="modelValue.k8s.bootstrap_provider" :version="modelValue.k8s.version" />
  </div>
</template>

<script setup lang="ts">
import OpenstackInfo from "./openstack-info.vue";

const { UI } = useAppHelper();

const props = defineProps({
  modelValue: { type: Object, required: true },
});

const emits = defineEmits(["can-continue"]);

const v$ = UI.getValidate();

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

  if (!v$.value.$invalid) {
    emits("can-continue", { value: true });
  } else {
    emits("can-continue", { value: false });
  }
});

defineExpose({ beforeNextStep });
</script>

<style scoped lang="scss"></style>
