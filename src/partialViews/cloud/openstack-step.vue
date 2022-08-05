<template>
  <div class="partial-container m-0 p-0">
    <div calss="p-card">
      <h5 class="form-title">OpenStack 정보</h5>
      <div class="field grid">OpenStack Info</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Object, required: true },
  v: { type: Object, required: true },
});
const emits = defineEmits(["can-continue"]);

const beforeNextStep = (): boolean => {
  return true;
};

onActivated(() => {
  if (!props.v?.value.$invalid) {
    emits("can-continue", { value: true });
  }
});

onMounted(() => {});

defineExpose({ beforeNextStep });
</script>

<style scoped lang="scss"></style>
