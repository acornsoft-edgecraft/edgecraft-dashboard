<template>
  <div class="item-container">
    <div class="form-field">
      <K3InputText :value="modelValue.$model" :type="type" :class="itemClass" :disabled="disabled" @input="changeValue" :autofocus="autofocus" :id="id" :placeholder="placeholder" />
    </div>
    <div class="error-field basic label pointing error" v-if="modelValue.$invalid">{{ errorMessages }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Object, default: () => {} },
  type: { type: String, default: "text" },
  fieldName: { type: String, default: "Field" },
  autofocus: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  id: { type: String },
  placeholder: { type: String },
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
<!-- replace(/name | age | city/g , '') -->
