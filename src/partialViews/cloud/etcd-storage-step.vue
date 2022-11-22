<template>
  <div class="partial-container m-0 p-0">
    <EtcdInfo v-model="modelValue.etcd_storage.etcd" />
    <StorageInfo v-model="modelValue.etcd_storage.storage_class" />
  </div>
</template>

<script setup lang="ts">
import EtcdInfo from "./etcd-info.vue";
import StorageInfo from "./storage-info.vue";

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
