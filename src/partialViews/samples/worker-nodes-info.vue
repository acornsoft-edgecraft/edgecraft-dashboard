<template>
  <div calss="p-card">
    <K3Panel header="Worker Nodes" :toggleable="true">
      <template #icons>
        <K3Button icon="pi pi-plus" class="mr-2" @click="addNode" />
      </template>
      <K3ValidateEach v-for="(item, index) in data" :key="index" :state="item" :rules="vRules">
        <template #default="{ v }">
          <K3FormContainer>
            <K3FormRow>
              <K3Divider align="left" type="solid">Baremetal Host</K3Divider>
            </K3FormRow>
            <K3FormRow direction="horizontal" :overflow-wrap="true">
              <K3FormColumn label="Host Name" label-align="right" :size="6">
                <K3FormInputField v-model="v.baremetal.host_name" field-name="Host Name" class="w-full" />
              </K3FormColumn>
              <K3FormColumn label="BMC Address" label-align="right" :size="6">
                <K3FormInputField v-model="v.baremetal.bmc_address" field-name="BMC Address" class="w-full" />
              </K3FormColumn>
            </K3FormRow>
          </K3FormContainer>
          <div class="field grid iter">
            <div class="field col-6">
              <label for="boot_mac_address">Boot MAC Address</label>
              <K3InputText id="boot_mac_address" v-model="v.baremetal.boot_mac_address.$model" type="text" autofocus class="text-base text-color w-full" :class="{ 'p-invalid': v.baremetal.boot_mac_address.$invalid }" />
              <small v-if="v.baremetal.boot_mac_address.$invalid" class="p-error">{{ v.baremetal.boot_mac_address.required.$message?.replace("Value", "Boot MAC Address") }}</small>
            </div>
            <div class="field col-6">
              <label for="boot_mode">Boot Mode</label>
              <K3Dropdown id="boot_mode" v-model="v.baremetal.boot_mode.$model" :options="BootModesMap()" :optionLabel="'name'" :optionValue="'value'" class="mr-2 w-full" />
              <small v-if="v.baremetal.boot_mode.$invalid" class="p-error">{{ v.baremetal.boot_mode.required.$message?.replace("Value", "Boot Mode") }}</small>
            </div>
            <div class="field col-6">
              <div class="field-checkbox h-full">
                <label for="online_power">Online (power)</label>
                <K3Checkbox class="ml-3" id="online_power" v-model="item.baremetal.online_power" :binary="true" />
              </div>
            </div>
            <div class="field col-6">
              <div class="field-checkbox mt-2 mb-2">
                <label for="external_provisioning">Externally Provisioning</label>
                <K3Checkbox class="ml-3" id="external_provisioning" v-model="item.baremetal.external_provisioning" :binary="true" />
              </div>
            </div>
            <div class="field col-12">
              <K3Divider align="left" type="solid">Node</K3Divider>
            </div>
            <div class="field col-6">
              <label for="node_name">Node Name</label>
              <K3InputText id="node_name" v-model="v.node.node_name.$model" type="text" class="text-base text-color w-full" :class="{ 'p-invalid': v.node.node_name.$invalid }" />
              <small v-if="v.node.node_name.$invalid" class="p-error">{{ v.node.node_name.required.$message?.replace("Value", "Node Name") }}</small>
            </div>
            <div class="field col-6">
              <label for="node_address">IP Address</label>
              <K3InputText id="node_address" v-model="v.node.ip_address.$model" type="text" class="text-base text-color w-full" :class="{ 'p-invalid': v.node.ip_address.$invalid }" />
              <small v-if="v.node.ip_address.$invalid" class="p-error">{{ v.node.ip_address.required.$message?.replace("Value", "IP Address") }}</small>
            </div>
            <div class="field col-12">
              <label for="labels">Labels</label>
              <K3InputText id="labels" v-model="v.node.label.$model" type="text" class="text-base text-color w-full" :class="{ 'p-invalid': v.node.label.$invalid }" />
              <small v-if="v.node.label.$invalid" class="p-error">{{ v.node.label.required.$message?.replace("Value", "Type") }}</small>
            </div>
            <div class="field col-12 text-right mt-5" v-if="index > 0">
              <K3Button icon="pi pi-minus" @click="removeNode(index)" />
            </div>
          </div>
        </template>
      </K3ValidateEach>
    </K3Panel>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";

import { BootModesMap, defaultBaremetalHostInfo, defaultBaremetalHostInfoValidation, defaultNodeInfo, defaultNodeInfoValidation } from "~/models/samples";

const { Util } = useAppHelper();

const v = useVuelidate();

const props = defineProps({
  modelValue: { type: Array<any>, default: [] },
});

const data = reactive(props.modelValue);

const vRules = {
  baremetal: { ...defaultBaremetalHostInfoValidation },
  node: { ...defaultNodeInfoValidation },
};

const addNode = () => {
  data.push({ baremetal: Util.clone(defaultBaremetalHostInfo), node: Util.clone(defaultNodeInfo) });
};

const removeNode = (index) => {
  data.splice(index, 1);
};
onMounted(() => {});
</script>

<style scoped lang="scss">
.iter {
  padding-bottom: 1.5rem;
  border-bottom: 0.2rem dotted lightskyblue;
}
</style>
