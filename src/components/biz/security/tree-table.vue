<template>
  <K3TreeTable :value="items" :selectionMode="selectionMode" v-model:selectionKeys="selectedKeys" :expandedKeys="expandedKeys" :scrollable="scrollable" :scrollHeight="scrollHeight" :class="itemClass" :loading="loading">
    <template #header v-if="expandBtns">
      <K3Button icon="pi pi-plus" label="Expand All" @click="expandAll" class="mr-2" />
      <K3Button icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
    </template>
    <template #empty>
      <div class="w-full text-center">
        <p class="text-orange-500">No records found.</p>
      </div>
    </template>

    <K3Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header" :expander="col.expander" :style="col.headerStyle">
      <template #body="slotProps" v-if="col.hasSlot">
        <slot :name="col.field" :item="slotProps.node.data[col.field]" />
      </template>
    </K3Column>
  </K3TreeTable>
</template>
<script setup lang="ts">
const props = defineProps({
  items: { type: Array<any>, default: () => {} },
  columns: { type: Array<any>, default: null },
  selectionMode: { type: String, default: null },
  selectedKeys: { type: Object, default: null },
  scrollable: { type: Boolean, default: false },
  scrollHeight: { type: String },
  expandBtns: { type: Boolean, default: false },
  showExpandAll: { type: Boolean, default: false },
  itemClass: { type: String },
  loading: { type: Boolean, default: false },
});
const emits = defineEmits(["selected-keys"]);

const expandedKeys = ref({});

const expandAll = () => {
  props.items.forEach((item) => {
    expandItem(item);
  });

  expandedKeys.value = { ...expandedKeys.value };
};
const collapseAll = () => {
  expandedKeys.value = {};
};
const expandItem = (item) => {
  if (item.children && item.children.length) {
    expandedKeys.value[item.key] = true;

    for (let child of item.children) {
      expandItem(child);
    }
  }
};

watch(
  () => props.items,
  (val) => {
    if (props.showExpandAll) {
      expandAll();
    }
  }
);

watch(
  () => props.selectedKeys,
  (val) => {
    emits("selected-keys", props.selectedKeys);
  }
);
</script>
<style scoped lang="scss"></style>
