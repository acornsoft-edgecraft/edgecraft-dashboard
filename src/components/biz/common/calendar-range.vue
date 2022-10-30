<template>
  <K3Calendar v-model="modelValue.startDate" placeholder="yyyy.mm.dd" :manualInput="false" :dateFormat="dateFormat" :selectOtherMonths="selectOtherMonths" :showButtonBar="showButtonBar" :showIcon="showIcon" :inputClass="inputClass" :maxDate="maxDate" @date-select="selectedStartDate" @clear-click="clearStartDt" />
  <span> ~ </span>
  <K3Calendar v-model="modelValue.endDate" placeholder="yyyy.mm.dd" :manualInput="false" :dateFormat="dateFormat" :selectOtherMonths="selectOtherMonths" :showButtonBar="showButtonBar" :showIcon="showIcon" :inputClass="inputClass" :minDate="minDate" @date-select="selectedEndDate" @clear-click="clearEndDt" />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Object, default: () => {} },
  dateFormat: { type: String, default: "yy.mm.dd" },
  showIcon: { type: Boolean, default: true },
  selectOtherMonths: { type: Boolean, default: true },
  showButtonBar: { type: Boolean, default: true },
  inputClass: { type: String },
});

const emits = defineEmits(["start-dt", "end-dt"]);

const minDate = ref();
const maxDate = ref();

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

const clearStartDt = (event) => {
  selectedStartDate(null);
};
const clearEndDt = (event) => {
  selectedEndDate(null);
};
</script>

<style scoped lang="scss"></style>
