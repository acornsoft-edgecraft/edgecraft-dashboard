<template>
  <K3FormContainer>
    <template #header>OPENSTACK 정보</template>
    <K3FormRow>
      <K3FormColumn label="Openstack Cloud" label-align="right">
        <K3FormInputField v-model="v$.openstack_cloud" field-name="Openstack Cloud" class="w-full" />
      </K3FormColumn>
      <K3FormColumn label="Openstack Cloud Provider Conf B64" label-align="right">
        <K3FormInputField v-model="v$.openstack_cloud_provider_conf_b64" field-name="Openstack Cloud Provider Conf B64" class="w-full" />
      </K3FormColumn>
      <K3FormColumn label="Openstack Cloud Yaml B64" label-align="right">
        <K3FormInputField v-model="v$.openstack_cloud_yaml_b64" field-name="Openstack Cloud Yaml B64" class="w-full" />
      </K3FormColumn>
      <K3FormColumn label="Openstack Cloud CaCert B64" label-align="right">
        <K3FormInputField v-model="v$.openstack_cloud_cacert_b64" field-name="Openstack Cloud CaCert B64" class="w-full" />
      </K3FormColumn>
      <K3FormColumn label="DNS Nameservers" label-align="right">
        <K3FormInputField v-model="v$.dns_nameservers" field-name="DNS Nameservers" class="w-full" />
      </K3FormColumn>
      <K3FormColumn label="Failure Domain" label-align="right">
        <K3FormInputField v-model="v$.failure_domain" field-name="Failure Domain" class="w-full" />
      </K3FormColumn>
      <K3FormColumn label="Image Name" label-align="right">
        <K3FormInputField v-model="v$.image_name" field-name="Image Name" class="w-full" />
      </K3FormColumn>
      <K3FormColumn label="SSH Key Name" label-align="right">
        <K3FormInputField v-model="v$.ssh_key_name" field-name="SSH Key Name" class="w-full" />
      </K3FormColumn>
      <K3FormColumn label="External Network ID" label-align="right">
        <K3FormInputField v-model="v$.external_network_id" field-name="External Network ID" class="w-full" />
      </K3FormColumn>
      <K3FormColumn label="API Server Floating IP" label-align="right">
        <K3FormInputField v-model="v$.api_server_floating_ip" field-name="Api Server Floating IP" class="w-full" />
      </K3FormColumn>
    </K3FormRow>
    <K3FormRow class="h-3rem">
      <K3FormColumn>
        <K3FormCheckField v-model="v$.use_bastion_host" id="use_bastion_host" label="Bastion Host" />
      </K3FormColumn>
    </K3FormRow>
    <template v-if="modelValue.use_bastion_host">
      <K3FormRow>
        <K3FormColumn label="Flavor" label-align="right">
          <K3FormInputField v-model="v$.bastion_flavor" field-name="Bastion Host Flavor" class="w-full" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Image Name" label-align="right">
          <K3FormInputField v-model="v$.bastion_image_name" field-name="Bastion Host Image Name" class="w-full" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="SSH Key Name" label-align="right">
          <K3FormInputField v-model="v$.bastion_ssh_key_name" field-name="Bastion Host SSH Key Name" class="w-full" />
        </K3FormColumn>
      </K3FormRow>
    </template>
  </K3FormContainer>
</template>

<script setup lang="ts">
import { defaultOpenstackConfValidation } from "~/models";

const { UI } = useAppHelper();

const props = defineProps({
  modelValue: { type: Object, required: true },
});

const v$ = UI.getValidate(defaultOpenstackConfValidation, props.modelValue);
</script>

<style scoped lang="scss"></style>
