<template>
  <div class="header flex justify-content-between">
    <div class="search-left">
      <slot />
      <template v-for="(item, index) in items">
        <template v-if="item.type == 'text'">
          <span>{{ item.label }}: </span>
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <K3InputText class="flex" v-model="item.value" placeholder="Search" @input="changeValue(item, $event)" />
          </span>
        </template>
        <template v-if="item.type == 'dropdown'">
          <span>{{ item.label }}: </span>
          <K3Dropdown v-model="item.value" :options="item.options" :optionLabel="'name'" :optionValue="'value'" @change="changeValue(item, $event)" placeholder="선택" :showClear="true" :class="item.class" />
        </template>
        <template v-if="item.type == 'calendar-range'">
          <span>{{ item.label }}: </span>
          <BizCommonCalendarRange v-model="item.value" @start-dt="setStartDt" @end-dt="setEndDt" />
        </template>
      </template>
      <K3Button label="초기화" class="p-button-outlined p-button-plain" @click="onReset" v-if="reset" />
    </div>
    <div class="search-right toggle flex align-content-center">
      <K3MultiSelect :modelValue="multiSelect.selectedColumns" :class="multiSelectClass" :options="multiSelect.columns" optionLabel="header" @update:modelValue="toggle" placeholder="Select Columns" v-if="multiSelect" />
      <slot name="search-right" />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  items: { type: Array<any>, default: () => [] },
  reset: { type: Boolean, default: true },
  multiSelect: { type: Object, default: null },
});

const emits = defineEmits(["reset", "multiselect-update", "change-value", "start-dt", "end-dt"]);

const multiSelectClass = computed(() => ["flex", props.multiSelect.class, useAttrs().class]);

const changeValue = (item, event) => {
  let val = event.value;
  if (item.type == "text") val = event.target.value;
  emits("change-value", { name: item.name, value: val });
};

const toggle = (val) => {
  props.multiSelect.selectedColumns = props.multiSelect.columns.filter((col) => val.includes(col));
  emits("multiselect-update", val);
};

const onReset = () => {
  emits("reset");
};

const setStartDt = (val) => {
  emits("start-dt", val);
};
const setEndDt = (val) => {
  emits("end-dt", val);
};
</script>
<style scoped lang="scss">
.search-left {
  :deep(span:not(:first-child)) {
    margin-left: 0.5rem;
  }
  .p-button {
    margin-left: 1rem;
  }
}
.search-right {
  :deep(.p-button) {
    margin-left: 0.5rem;
  }
}
</style>
