<template>
  <K3Dialog :header="`${modelValue.type} 저장`" v-model:visible="modelValue.display" :style="{ width: '500px' }" :modal="true" @hide="onHide">
    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <p class="font-semibold text-lg">
        입력한 내용을 저장하시겠습니까? <br />
        저장 후 동작을 선택해주세요.
      </p>
    </div>
    <template #footer>
      <div class="flex justify-content-between">
        <div class="flex justify-content-start align-item-start">
          <K3Button label="취소" icon="pi pi-times" @click="close" class="p-button-outlined" />
        </div>
        <div class="flex justify-content-end align-item-end">
          <K3Button label="저장 후 목록으로" icon="pi pi-list" @click="ok(true)" class="p-button-secondary" />
          <K3Button :label="`저장 후 ${modelValue.type} 생성`" icon="pi pi-save" @click="ok(false)" />
        </div>
      </div>
    </template>
  </K3Dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: { type: Object, default: {} },
});
const emits = defineEmits(["close", "ok"]);

const close = () => {
  emits("close");
};
const ok = (val: boolean) => {
  emits("ok", val);
};
const onHide = () => {
  emits("close");
};
</script>

<style scoped lang="scss">
.confirmation-content {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
