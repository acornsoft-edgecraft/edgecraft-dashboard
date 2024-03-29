<template>
  <div class="p-card w-full">
    <K3Panel :header="`${NodeTypes[type]} Nodes`">
      <template #icons>
        <K3Button icon="pi pi-plus" class="mr-2" @click="addNode" />
      </template>
      <K3ValidateEach v-for="(item, index) in data" :key="index" :state="item" :rules="vRules">
        <template #default="{ v }">
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
                <K3FormCheckField v-model="v.BaremetalHost.online_power" :id="`${type}_online_power_${index}`" label="사용" />
              </K3FormColumn>
              <K3FormColumn label="Externally Provisioning" label-align="right" :size="6">
                <K3FormCheckField v-model="v.BaremetalHost.external_provisioning" :id="`${type}_external_provisioning_${index}`" label="사용" />
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
            <K3FormRow v-if="index > 0" class="no-bg-row">
              <K3FormColumn item-align="right">
                <K3Button icon="pi pi-minus" @click="removeNode(index)" />
              </K3FormColumn>
            </K3FormRow>
          </K3FormContainer>
        </template>
      </K3ValidateEach>
    </K3Panel>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";

import { NodeTypes, BootModesMap, defaultBaremetalHostInfo, defaultBaremetalHostInfoValidation, defaultNodeInfo, defaultNodeInfoValidation } from "~/models";

const { Util } = useAppHelper();

const v = useVuelidate();

const props = defineProps({
  modelValue: { type: Array<any>, default: [] },
  type: { type: Number, default: NodeTypes.Master },
});

const data = reactive(props.modelValue);

const vRules = {
  BaremetalHost: { ...defaultBaremetalHostInfoValidation },
  Node: { ...defaultNodeInfoValidation },
};

const addNode = () => {
  data.push({ BaremetalHost: Util.clone(defaultBaremetalHostInfo), Node: Util.clone(defaultNodeInfo) });
};

const removeNode = (index) => {
  data.splice(index, 1);
};

onMounted(() => {});
</script>

<style scoped lang="scss">
.form-container.no-style {
  box-shadow: none;
  border: 1px solid #c0c2c5;
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
