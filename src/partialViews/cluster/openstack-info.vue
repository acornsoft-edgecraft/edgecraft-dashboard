<template>
  <K3FormContainer class="no-bg">
    <template #header>Openstack 정보</template>
    <K3FormRow>
      <K3FormColumn label="Node CIDR" label-align="right">
        <K3FormInputField v-model="v$.node_cidr" field-name="Node CIDR" class="w-full" placeholder="예) 10.6.0.0/24" />
      </K3FormColumn>
    </K3FormRow>
    <K3FormRow>
      <K3FormColumn label="Openstack Cloud" label-align="right">
        <K3FormInputField v-model="v$.openstack_cloud" field-name="Openstack Cloud" class="w-full" />
      </K3FormColumn>
    </K3FormRow>
    <K3FormRow>
      <K3FormColumn label="Openstack Cloud Provider Conf B64" label-align="right">
        <K3FormInputField v-model="v$.openstack_cloud_provider_conf_b64" field-name="Openstack Cloud Provider Conf B64" class="w-full" />
      </K3FormColumn>
    </K3FormRow>
    <K3FormRow>
      <K3FormColumn label="Openstack Cloud Yaml B64" label-align="right">
        <K3FormInputField v-model="v$.openstack_cloud_yaml_b64" field-name="Openstack Cloud Yaml B64" class="w-full" />
      </K3FormColumn>
    </K3FormRow>
    <K3FormRow>
      <K3FormColumn label="Openstack Cloud CaCert B64" label-align="right">
        <K3FormInputField v-model="v$.openstack_cloud_cacert_b64" field-name="Openstack Cloud CaCert B64" class="w-full" />
      </K3FormColumn>
    </K3FormRow>
    <K3FormRow>
      <K3FormColumn label="DNS Nameservers" label-align="right">
        <K3FormInputField v-model="v$.dns_nameservers" field-name="DNS Nameservers" class="w-full" />
      </K3FormColumn>
    </K3FormRow>
    <K3FormRow>
      <K3FormColumn label="Failure Domain" label-align="right">
        <K3FormInputField v-model="v$.failure_domain" field-name="Failure Domain" class="w-full" />
      </K3FormColumn>
    </K3FormRow>
    <K3FormRow>
      <K3FormColumn label="Image Name" label-align="right">
        <K3FormInputField v-model="v$.image_name" field-name="Image Name" class="w-full" />
      </K3FormColumn>
    </K3FormRow>
    <K3FormRow>
      <K3FormColumn label="SSH Key Name" label-align="right">
        <K3FormInputField v-model="v$.ssh_key_name" field-name="SSH Key Name" class="w-full" />
      </K3FormColumn>
    </K3FormRow>
    <K3FormRow>
      <K3FormColumn label="External Network ID" label-align="right">
        <K3FormInputField v-model="v$.external_network_id" field-name="External Network ID" class="w-full" />
      </K3FormColumn>
    </K3FormRow>
    <K3FormRow>
      <K3FormColumn label="API Server Floating IP" label-align="right">
        <K3FormInputField v-model="v$.api_server_floating_ip" field-name="Api Server Floating IP" class="w-full" />
      </K3FormColumn>
    </K3FormRow>
    <K3FormRow class="h-3rem">
      <K3FormColumn>
        <K3FormCheckField v-model="v$.use_bastion_host" id="use_bastion_host" label="Bastion Host" @input="changeValue" />
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
      <K3FormRow>
        <K3FormColumn label="Floating IP" label-align="right">
          <K3FormInputField v-model="v$.bastion_floating_ip" field-name="Bastion Host Floating IP" class="w-full" />
        </K3FormColumn>
      </K3FormRow>
    </template>
  </K3FormContainer>
</template>

<script setup lang="ts">
import { BootstrapProviders, defaultOpenstackConfValidation, KubeadmK8sVersions } from "~/models";

const { UI } = useAppHelper();

const props = defineProps({
  modelValue: { type: Object, required: true },
  bootstrapProvider: { type: Number },
  version: { type: Number }
});

const v$ = UI.getValidate(defaultOpenstackConfValidation, props.modelValue);

const changeValue = (val) => {
  if (!val) {
    props.modelValue.bastion_flavor = "";
    props.modelValue.bastion_image_name = "";
    props.modelValue.bastion_ssh_key_name = "";
    props.modelValue.bastion_floating_ip = "";
  }
};

const getDefaultImageName = () => {
  const imgPrefix = "edgecraft-kube-v";
  
  switch (props.bootstrapProvider) {
    case BootstrapProviders.Kubeadm:
      return imgPrefix + KubeadmK8sVersions[props.version];
    case BootstrapProviders.MicroK8s:
      return "edgecraft-microk8s"
    case BootstrapProviders.K3s:
      return "ubuntu-20.04"
  }
}

onMounted(() => {
  props.modelValue.image_name = getDefaultImageName();
})
</script>

<style scoped lang="scss"></style>
