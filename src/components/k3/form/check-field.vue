<template>
  <div class="form-field align-items-center">
    <label v-if="labelAlign === 'left' && label" class="mr-2" :for="id">{{ label }}</label>
    <K3Checkbox class="mr-2" :inputId="id" v-model="modelValue.$model" @input="changeValue" :disabled="disabled" :binary="true" />
    <label v-if="labelAlign === 'right' && label" :for="id">{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Object, default: () => {} },
  id: { type: String, default: "binary" },
  disabled: { type: Boolean, default: false },
  label: { type: String, default: "" },
  labelAlign: { type: String, default: "right" },
});
const emits = defineEmits(["input"]);

const changeValue = (value) => {
  emits("input", value);
};
</script>

<style scoped lang="scss">
.form-field {
  label {
    position: relative;
    top: -2px;
  }
}
</style>
