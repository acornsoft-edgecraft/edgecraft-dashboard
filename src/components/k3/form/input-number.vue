<template>
  <div class="item-container">
    <div class="form-field">
      <K3InputNumber v-model="modelValue.$model" :inputId="inputId" :mode="mode" :showButtons="showButtons" :min="min" :max="max" :class="itemClass" :incrementButtonClass="incrementButtonClass" :decrementButtonClass="decrementButtonClass" :field-name="fieldName" />
    </div>
    <div class="error-field basic label pointing error" v-if="modelValue.$invalid">{{ errorMessages }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Object, default: () => {} },
  inputId: { type: String },
  fieldName: { type: String, default: "Field" },
  mode: { type: String, default: "decimal" },
  showButtons: { type: Boolean, default: true },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  incrementButtonClass: { type: String, default: "" },
  decrementButtonClass: { type: String, default: "" },
  autofocus: { type: Boolean, default: false },
});
const itemClass = computed(() => [useAttrs().class /*{ 'p-invalid': props.modelValue.$invalid } */]);
const errorMessages = computed(() => {
  props.modelValue.$touch();
  return props.modelValue.$errors.map((err) => err.$message.replace("Value", props.fieldName)).join(",");
});
</script>

<style scoped lang="scss"></style>
