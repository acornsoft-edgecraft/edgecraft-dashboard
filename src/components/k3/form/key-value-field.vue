<template>
  <div class="key-value-field flex flex-row justify-content-start align-items-center">
    <div class="chips flex-grow-1 flex-wrap">
      <template v-for="(item, index) in modelValue.$model">
        <K3Chip :label="Util.getLabel(item)" class="chip" v-if="item.key" />
      </template>
    </div>
    <div class="flex-none">
      <K3Button :label="caption" @click="display = true" />
    </div>

    <DLabels v-model="dialogItems" :display="display" @close="close" @ok="ok" />
  </div>
</template>

<script setup lang="ts">
import DLabels from "~/partialViews/dialogs/labels.vue";

const { Util } = useAppHelper();

const props = defineProps({
  modelValue: { type: Object, default: () => [] },
  separator: { type: String, default: "=" },
  caption: { type: String, default: "Labels 설정" },
});

const display = ref(false);
const dialogItems = ref(Util.clone(props.modelValue.$model));

const close = () => {
  display.value = false;
};
const ok = (vals) => {
  display.value = false;
  props.modelValue.$model = vals;
};

watch(
  () => props.modelValue.$model,
  (newVal) => {
    dialogItems.value.splice(0, dialogItems.value.length);
    dialogItems.value = Util.clone(newVal);
  }
);
</script>

<style scoped lang="scss">
.key-value-field {
  overflow: none;
}

.chips {
  .chip {
    margin: 0.25rem 0.5rem 0.25rem 0;
  }
}
</style>
