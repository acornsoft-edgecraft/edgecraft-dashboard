<template>
  <K3Dialog header="보안검증 주기 설정" v-model:visible="modelValue.display" :modal="true" :style="{ width: '30vw' }" @hide="onHide">
    <div class="flex">
      <div>Schedule:</div>

      <K3InputText />
    </div>

    <template #footer>
      <K3Button label="취소" icon="pi pi-times" @click="close" class="p-button-text" />
      <K3Button label="저장" icon="pi pi-check" @click="ok" autofocus />
    </template>
  </K3Dialog>
</template>

<script setup lang="ts">
const { UI } = useAppHelper();
const { required } = UI.getValidators();

const props = defineProps({
  modelValue: { type: Object, default: {} },
});
const emits = defineEmits(["close", "ok"]);

const v = UI.getValidate({ version: { required } }, ref({ version: "" }));

const close = () => {
  emits("close");
};
const ok = () => {
  v.value.$touch();

  emits("ok", "ok");
};
const onHide = () => {
  emits("close");
};

onMounted(() => {});
</script>

<style scoped lang="scss">
.p-inputtext {
  margin-left: 0.5rem;
}
.form-container.no-style {
  margin-top: 1rem;
  box-shadow: none;

  .form-column {
    padding: 0.5rem;
  }

  :deep(.p-dropdown) {
    margin-left: 1rem;
    width: 10rem;
  }
}
</style>
