<template>
  <K3Calendar v-model="modelValue.startDate" placeholder="yyyy.mm.dd" :dateFormat="dateFormat" :selectOtherMonths="selectOtherMonths" :showButtonBar="showButtonBar" :showIcon="showIcon" :inputClass="inputClass" :maxDate="maxDate" @date-select="selectedStartDate" @clear-click="onStartDtClear" />
  <span> ~ </span>
  <K3Calendar v-model="modelValue.endDate" placeholder="yyyy.mm.dd" :dateFormat="dateFormat" :selectOtherMonths="selectOtherMonths" :showButtonBar="showButtonBar" :showIcon="showIcon" :inputClass="inputClass" :minDate="minDate" @date-select="selectedEndDate" @clear-click="onEndDtClear" />
</template>

<script setup lang="ts">
// imports
// Page meta

// Props
const props = defineProps({
  modelValue: { type: Object, default: () => {} },
  dateFormat: { type: String, default: "yy.mm.dd" },
  showIcon: { type: Boolean, default: true },
  selectOtherMonths: { type: Boolean, default: true },
  showButtonBar: { type: Boolean, default: true },
  inputClass: { type: String },
});
// Emits
const emits = defineEmits(["start-dt", "end-dt"]);
// Properties
const minDate = ref();
const maxDate = ref();
// Compputed
// Watcher
// Methods
const selectedStartDate = (event) => {
  const val = event ? new Date(event) : event;
  minDate.value = val;
  emits("start-dt", val);
};
const selectedEndDate = (event) => {
  const val = event ? new Date(event) : event;
  maxDate.value = val;
  emits("end-dt", val);
};

const onStartDtClear = (event) => {
  selectedStartDate(null);
};
const onEndDtClear = (event) => {
  selectedEndDate(null);
};
// Events
// Logics (like api call, etc)
</script>

<style scoped lang="scss"></style>
