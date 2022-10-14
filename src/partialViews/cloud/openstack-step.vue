<template>
  <div class="partial-container m-0 p-0">
    <K3FormContainer class="no-bg">
      <template #header>OpenStack 정보</template>
      <K3FormRow>
        <K3FormColumn>OpenStack Info</K3FormColumn>
      </K3FormRow>
    </K3FormContainer>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Object, required: true },
  // v: { type: Object, required: true },
});
const emits = defineEmits(["can-continue"]);

const beforeNextStep = (): boolean => {
  return true;
};

onActivated(() => {
  // if (!props.v?.value.$invalid) {
  emits("can-continue", { value: true });
  // }
});

onMounted(() => {});

defineExpose({ beforeNextStep });
</script>

<style scoped lang="scss"></style>
