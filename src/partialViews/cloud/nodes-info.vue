<template>
  <div class="p-card w-full">
    <K3Panel :header="`${type} Nodes`" :toggleable="true">
      <template #icons>
        <K3Button icon="pi pi-plus" class="mr-2" @click="addNode" />
      </template>
      <K3ValidateEach v-for="(item, index) in data" :key="index" :state="item" :rules="vRules">
        <template #default="{ v }">
          <K3FormContainer class="no-style iter">
            <K3FormRow>
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
                <K3FormCheckField v-model="v.baremetal.online_power" :id="`${type}_online_power_${index}`" label="사용" />
                <!-- <K3Checkbox class="mx-2" inputId="online_power" v-model="v.baremetal.online_power" :binary="true" />
                <label for="online_power">사용</label> -->
              </K3FormColumn>
              <K3FormColumn label="Externally Provisioning" label-align="right" :size="6">
                <K3FormCheckField v-model="v.baremetal.external_provisioning" :id="`${type}_external_provisioning_${index}`" label="사용" />
                <!-- <K3Checkbox class="mx-2" inputId="external_provisioning" v-model="v.baremetal.external_provisioning" :binary="true" />
                <label for="external_provisioning">사용</label> -->
              </K3FormColumn>
            </K3FormRow>
            <K3FormRow>
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
            <K3FormRow v-if="index > 0">
              <K3FormColumn item-align="right">
                <K3Button icon="pi pi-minus" class="mr-2" @click="removeNode(index)" />
              </K3FormColumn>
            </K3FormRow>
          </K3FormContainer>
        </template>
      </K3ValidateEach>
    </K3Panel>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';

import { BootModesMap, defaultBaremetalHostInfo, defaultBaremetalHostInfoValidation, defaultNodeInfo, defaultNodeInfoValidation } from '~/models';

const { Util } = useAppHelper()

const v = useVuelidate()

const props = defineProps({
  modelValue: { type: Array<any>, default: [] },
  type: { type: String, default: 'Master' },
})

const data = reactive(props.modelValue)

const vRules = {
    baremetal: { ...defaultBaremetalHostInfoValidation },
    node: { ...defaultNodeInfoValidation }
}

const addNode = () => {
    data.push({ baremetal: Util.clone(defaultBaremetalHostInfo), node: Util.clone(defaultNodeInfo) })
}

const removeNode = (index) => {
    data.splice(index, 1)
}

onMounted(() => {
});
</script>

<style scoped lang="scss">
.iter {
  padding-bottom: 1.5rem;
  border-bottom: 0.2rem dotted lightskyblue;
  margin-top: 1.5rem;
}
</style>
