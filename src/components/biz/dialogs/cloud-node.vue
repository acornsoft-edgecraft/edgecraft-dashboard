<template>
  <K3Dialog :header="`Cloud ${NodeTypes[modelValue.type]} Node 등록`" v-model:visible="modelValue.display" :modal="true" :style="{ width: '50vw' }" @hide="onHide">
    <K3FormContainer class="no-style">
      <K3FormRow class="no-bg-row">
        <K3Divider align="left">Baremetal Host</K3Divider>
      </K3FormRow>
      <K3FormRow direction="horizontal" :overflow-wrap="true">
        <K3FormColumn label="Host Name" label-align="right" :size="6">
          <K3FormInputField v-model="v.BaremetalHost.host_name" field-name="Host Name" class="w-full" />
        </K3FormColumn>
        <K3FormColumn label="BMC Address" label-align="right" :size="6">
          <K3FormInputField v-model="v.BaremetalHost.bmc_address" field-name="BMC Address" class="w-full" placeholder="예) 98:03:9b:61:80:48" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow direction="horizontal" :overflow-wrap="true">
        <K3FormColumn label="Boot MAC Address" label-align="right" :size="6">
          <K3FormInputField v-model="v.BaremetalHost.boot_mac_address" field-name="Boot MAC Address" class="w-full" placeholder="예) 00:b2:8c:ee:22:98" />
        </K3FormColumn>
        <K3FormColumn label="Boot Mode" label-align="right" :size="6">
          <K3FormDropdownField v-model="v.BaremetalHost.boot_mode" field-name="Boot Mode" :options="BootModesMap()" :optionLabel="'name'" :optionValue="'value'" class="w-8" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow direction="horizontal" :overflow-wrap="true">
        <K3FormColumn label="Online (Power)" label-align="right" :size="6">
          <K3FormCheckField v-model="v.BaremetalHost.online_power" :id="`${modelValue.type}_online_power`" label="사용" />
        </K3FormColumn>
        <K3FormColumn label="Externally Provisioning" label-align="right" :size="6">
          <K3FormCheckField v-model="v.BaremetalHost.external_provisioning" :id="`${modelValue.type}_external_provisioning`" label="사용" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow class="no-bg-row">
        <K3Divider align="left" type="solid">Node</K3Divider>
      </K3FormRow>
      <K3FormRow direction="horizontal" :overflow-wrap="true">
        <K3FormColumn label="Node Name" label-align="right" :size="6">
          <K3FormInputField v-model="v.Node.node_name" field-name="Node Name" class="w-full" />
        </K3FormColumn>
        <K3FormColumn label="IP Address" label-align="right" :size="6">
          <K3FormInputField v-model="v.Node.ip_address" field-name="IP Address" class="w-full" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Labels" label-align="right">
          <K3FormKeyValueField v-model="v.Node.labels" caption="Labels 설정" />
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
import { NodeTypes, BootModesMap, defaultBaremetalHostInfoValidation, defaultNodeInfoValidation, defaultBaremetalHostInfo, defaultNodeInfo } from "~/models";

const { UI, Util } = useAppHelper();

const props = defineProps({
  modelValue: { type: Object, required: true },
});
const emits = defineEmits(["close", "ok"]);

const vRules = {
  BaremetalHost: { ...defaultBaremetalHostInfoValidation },
  Node: { ...defaultNodeInfoValidation },
};

const data = ref();
const v = UI.getValidate(vRules, data);

const close = () => {
  emits("close");
};
const ok = () => {
  v.value.$touch();

  if (!v.value.$invalid) {
    emits("ok", { item: Util.clone(data.value), type: props.modelValue.type });
  }
};
const onHide = () => {
  emits("close");
  init();
};
const init = () => {
  data.value = { BaremetalHost: Util.clone(defaultBaremetalHostInfo), Node: Util.clone(defaultNodeInfo) };
};

onMounted(() => {
  init();
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
