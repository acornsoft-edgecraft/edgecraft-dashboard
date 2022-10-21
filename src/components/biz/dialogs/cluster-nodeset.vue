<template>
  <K3Dialog header="Cluster WorkerSet 추가" v-model:visible="modelValue.display" :modal="true" :style="{ width: '50vw' }" @hide="onHide">
    <K3FormContainer>
      <K3FormRow>
        <K3FormColumn label="Node Name" label-align="right">
          <K3FormInputField v-model="v.name" field-name="Node Name" class="w-full" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Node Count" label-align="right">
          <K3FormInputNumber v-model="v.node_count" :min="1" field-name="Node Count" input-id="node_count" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Flavor" label-align="right">
          <K3FormInputField v-model="v.flavor" field-name="Flavor" class="w-full" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Labels" label-align="right">
          <K3FormKeyValueField v-model="v.labels" caption="Label 설정" />
        </K3FormColumn>
      </K3FormRow>
    </K3FormContainer>
    <template #footer>
      <K3Button label="취소" icon="pi pi-times" @click="close" class="p-button-text" />
      <K3Button label="등록" icon="pi pi-check" @click="ok" autofocus />
    </template>
  </K3Dialog>
</template>

<script setup lang="ts">
import { defaultNodesetInfoValidation, defaultNodesetInfo } from "~/models";

const { UI, Util } = useAppHelper();

const props = defineProps({
  modelValue: { type: Object, required: true },
});
const emits = defineEmits(["close", "ok"]);

const vRule = defaultNodesetInfoValidation;

const data = ref();
const v = UI.getValidate(vRule, data);

const close = () => {
  emits("close");
};
const ok = () => {
  v.value.$touch();

  if (!v.value.$invalid) {
    emits("ok", { item: Util.clone(data.value) });
  }
};
const onHide = () => {
  emits("close");
  init();
};
const init = () => {
  data.value = Util.clone(defaultNodesetInfo);
};

onMounted(() => {
  init();
});
</script>

<style scoped lang="scss"></style>
