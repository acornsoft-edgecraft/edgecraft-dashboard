<template>
  <div class="item-container">
    <div class="form-field">
      <K3Password v-model="modelValue.$model" :inputIid="inputId" :class="itemClass" :toggleMask="toggleMask" :inputClass="inputClass" />
    </div>
    <div class="error-field basic label pointing error" v-if="modelValue.$invalid">{{ errorMessages }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Object, default: () => {} },
  inputId: { type: String },
  inputClass: { type: String, default: null },
  fieldName: { type: String, default: "Field" },
  toggleMask: { type: Boolean, default: false },
});

const itemClass = computed(() => [useAttrs().class /*{ 'p-invalid': props.modelValue.$invalid } */]);
const errorMessages = computed(() => {
  props.modelValue.$touch();
  return props.modelValue.$errors.map((err) => err.$message.replace("Value", props.fieldName)).join(",");
});
</script>

<style scoped lang="scss"></style>
