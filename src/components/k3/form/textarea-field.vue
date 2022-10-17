<template>
  <div class="item-container">
    <div class="form-field">
      <K3Textarea :value="modelValue.$model" :type="type" :rows="rows" :cols="cols" :class="itemClass" :autoResize="autoResize" @input="changeValue" />
    </div>
    <div class="error-field basic label pointing error" v-if="modelValue.$invalid">{{ errorMessages }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Object, default: () => {} },
  type: { type: String, default: "text" },
  rows: { type: String, default: "4" },
  cols: { type: String, default: "20" },
  fieldName: { type: String, default: "Field" },
  autoResize: { type: Boolean, default: false },
});

const itemClass = computed(() => [useAttrs().class /*{ 'p-invalid': props.modelValue.$invalid } */]);
const errorMessages = computed(() => {
  props.modelValue.$touch();
  return props.modelValue.$errors.map((err) => err.$message.replace(/Value|The value|This field/g, props.fieldName)).join(",");
});

const changeValue = (e) => {
  props.modelValue.$model = e.target.value;
};
</script>

<style scoped lang="scss"></style>
