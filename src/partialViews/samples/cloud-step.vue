<template>
  <div class="partial-container m-0 p-0">
    <div calss="p-card">
      <CloudInfo v-model="modelValue.cloud"
                 @visible-change="onVisibleChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import CloudInfo from './cloud-info.vue';

const { UI } = useAppHelper()

const props = defineProps({
  modelValue: { type: Object, required: true },
});

const emits = defineEmits(["can-continue", 'visible-change']);

const v$ = UI.getValidate()

watch(
  () => v$.value,
  (val) => {
    v$.value.$touch()

    if (!val.$invalid) {
      emits("can-continue", { value: true });
    } else {
      emits("can-continue", { value: false });
    }
  }
);

const beforeNextStep = (): boolean => {
  v$.value.$touch()

  if (v$.value.$invalid) {
    return false;
  }
  return true;
};

const onVisibleChange = (val) => {
  emits('visible-change', val)
}

onActivated(() => {
  v$.value.$touch()

  if (!v$.value.$invalid) {
    emits("can-continue", { value: true });
  } else {
    emits("can-continue", { value: false });
  }
});

onMounted(() => { });

defineExpose({ beforeNextStep });
</script>

<style scoped lang="scss">
.field>label {
  justify-content: end;
}
</style>
