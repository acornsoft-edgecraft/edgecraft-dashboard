<template>
  <div class="page-wrapper">
    <section class="page-header">
      <K3PageTitle />
    </section>
    <section class="page-content mt-2">
      <div class="field col-12">node.labels== {{ node.labels }}</div>
      <div class="field col-12">
        <label for="labels">Labels:: Chip</label>
        <div class="col-12">
          <K3Button icon="pi pi-plus" class="p-button-rounded p-button-outlined p-button-secondary mr-3" @click="showLabelForm" />
          <template v-for="(label, idx) in node.labels" :key="idx">
            <K3Chip :label="`${label.key}=${label.value}=${idx}`" removable class="mr-1 mt-1" @remove="removeLabel(idx)" />
          </template>
        </div>
      </div>

      <div class="field col-12">
        <label for="labels">Labels:: Chips</label>
        <div class="col-12">
          <K3Chips v-model="node.labels" @remove="removeChip" @add="addChip">
            <template #chip="slotProps">
              <div>
                <span>{{ slotProps.value.key }}={{ slotProps.value.value }}</span>
              </div>
            </template>
          </K3Chips>
        </div>
      </div>

      <K3Dialog header="Labels 추가" v-model:visible="display" :modal="true" :style="{ width: '50vw' }">
        <div class="field col-12">
          <label for="label_key" class="w-1">Key</label>
          <K3InputText class="w-5" v-model="label.key" />
          <label for="label_value" class="w-1">Value</label>
          <K3InputText class="w-5" v-model="label.value" />
        </div>
        <template #footer>
          <K3Button label="취소" icon="pi pi-times" @click="closeModal" class="p-button-text" />
          <K3Button label="저장" icon="pi pi-check" @click="addLabel" autofocus />
        </template>
      </K3Dialog>
    </section>
  </div>
</template>

<script setup lang="ts">
import { defaultNodeInfo, defaultLabelInfo } from "~/models";

definePageMeta({ layout: "default", title: "Node Label", public: true });

const { Util } = useAppHelper();

const node = reactive(defaultNodeInfo);
const label = Util.clone(defaultLabelInfo);
const display = ref(false);

const showLabelForm = () => {
  display.value = true;
};

const removeLabel = (index) => {
  // node.labels.splice(index, 1);
  console.log(node.labels);
  console.log(index);
};
const closeModal = () => {
  display.value = false;
};
const addLabel = () => {
  node.labels.push(label);
  closeModal();
};

const addChip = (event) => {
  console.log(event);
  console.log(event.value);
};
const removeChip = (event) => {
  console.log(event.value);
};
</script>
