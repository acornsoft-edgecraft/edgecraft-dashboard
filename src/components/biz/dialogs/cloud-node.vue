<template>
  <K3Dialog :header="`Cloud ${modelValue.type} Node 등록`" v-model:visible="modelValue.display" :modal="true" :style="{ width: '50vw' }" @hide="onHide">
    <K3FormContainer class="no-style">
      <K3FormRow class="no-bg-row">
        <K3Divider align="left">Baremetal Host</K3Divider>
      </K3FormRow>
      <K3FormRow direction="horizontal" :overflow-wrap="true">
        <K3FormColumn label="Host Name" label-align="right" :size="6">
          <K3FormInputField v-model="v.baremetal.host_name" field-name="Host Name" class="w-full" />
        </K3FormColumn>
        <K3FormColumn label="BMC Address" label-align="right" :size="6">
          <K3FormInputField v-model="v.baremetal.bmc_address" field-name="BMC Address" class="w-full" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow direction="horizontal" :overflow-wrap="true">
        <K3FormColumn label="Boot MAC Address" label-align="right" :size="6">
          <K3FormInputField v-model="v.baremetal.boot_mac_address" field-name="Boot MAC Address" class="w-full" />
        </K3FormColumn>
        <K3FormColumn label="Boot Mode" label-align="right" :size="6">
          <K3FormDropdownField v-model="v.baremetal.boot_mode" field-name="Boot Mode" :options="BootModesMap()" :optionLabel="'name'" :optionValue="'value'" class="w-8" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow direction="horizontal" :overflow-wrap="true">
        <K3FormColumn label="Online (Power)" label-align="right" :size="6">
          <K3FormCheckField v-model="v.baremetal.online_power" :id="`${modelValue.type}_online_power`" label="사용" />
        </K3FormColumn>
        <K3FormColumn label="Externally Provisioning" label-align="right" :size="6">
          <K3FormCheckField v-model="v.baremetal.external_provisioning" :id="`${modelValue.type}_external_provisioning`" label="사용" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow class="no-bg-row">
        <K3Divider align="left" type="solid">Node</K3Divider>
      </K3FormRow>
      <K3FormRow direction="horizontal" :overflow-wrap="true">
        <K3FormColumn label="Node Name" label-align="right" :size="6">
          <K3FormInputField v-model="v.node.node_name" field-name="Node Name" class="w-full" />
        </K3FormColumn>
        <K3FormColumn label="IP Address" label-align="right" :size="6">
          <K3FormInputField v-model="v.node.ip_address" field-name="IP Address" class="w-full" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Labels" label-align="right">
          <K3FormKeyValueField v-model="v.node.labels" caption="Labels 설정" />
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
import { MessageTypes, BootModesMap, defaultBaremetalHostInfoValidation, defaultNodeInfoValidation, defaultBaremetalHostInfo, defaultNodeInfo } from "~/models";

const { UI, Util } = useAppHelper();

const props = defineProps({
  modelValue: { type: Object, required: true },
});
const emits = defineEmits(["close", "ok"]);

const vRules = {
  baremetal: { ...defaultBaremetalHostInfoValidation },
  node: { ...defaultNodeInfoValidation },
};

const data = ref();
const v = UI.getValidate(vRules, data);

const close = () => {
  emits("close");
};
const ok = () => {
  v.value.$touch();

  if (v.value.$invalid) {
    UI.showMessage(MessageTypes.WARN, "필수항목 검증", "필수 항목을 모두 입력하셔야 합니다.");
  } else {
    emits("ok", { item: Util.clone(data.value), type: props.modelValue.type });
  }
};
const onHide = () => {
  console.log("onHide");
  emits("close");
  clearItem();
};
const clearItem = () => {};

onMounted(() => {
  console.log("onMounted");
  data.value = { baremetal: Util.clone(defaultBaremetalHostInfo), node: Util.clone(defaultNodeInfo) };
});
</script>

<style scoped lang="scss">
.form-container.no-style {
  box-shadow: none;
  border: 1px solid #dee2e6;
  background: #ffffff;
  border-radius: 6px;
  padding: 0.5rem;
  margin-bottom: 1rem;

  .no-bg-row {
    background-color: var(--surface-0);

    .form-column {
      border: 0;
      padding-top: 0.5rem;
    }
  }
}
</style>
