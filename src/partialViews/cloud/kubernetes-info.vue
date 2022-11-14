<template>
  <div class="partial-container m-0 p-0">
    <K3FormContainer class="no-bg">
      <template #header>Kubernetes 설치 정보</template>
      <K3FormRow>
        <K3FormColumn label="Kubernetes Version" label-align="right">
          <K3FormDropdownField v-model="v$.version" :options="K8sVersionMap()" :optionLabel="'name'" :optionValue="'value'" field-name="Kubernetes Version" class="w-6" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="POD CIDR" label-align="right">
          <K3FormInputField v-model="v$.pod_cidr" field-name="POD CIDR" class="w-6" placeholder="예) 192.168.0.0/16" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Service CIDR" label-align="right">
          <K3FormInputField v-model="v$.svc_cidr" field-name="Service CIDR" class="w-6" placeholder="예) 10.96.0.0/12" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Service Dns Domain" label-align="right">
          <K3FormInputField v-model="v$.svc_domain" field-name="Service Dns Domain" class="w-6" placeholder="예) cluster.local" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Control Plane Kubeadm Extra Config" label-align="right">
          <K3FormContainer class="no-style w-full">
            <K3FormRow direction="vertical">
              <K3Accordion :multiple="true" :activeIndex="activeIndex(modelValue.cp_kubeadm_extra_config)">
                <K3AccordionTab v-for="(config, index) in kubeadmConfigs" :key="index" :header="config.header">
                  <K3Textarea :id="setConfigId('cp', config.id)" v-model="modelValue.cp_kubeadm_extra_config[config.id]" type="text" rows="4" class="w-full" :autoResize="true" />
                </K3AccordionTab>
              </K3Accordion>
            </K3FormRow>
          </K3FormContainer>
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Workers Kubeadm Extra Config" label-align="right">
          <K3FormContainer class="no-style w-full">
            <K3FormRow direction="vertical">
              <K3Accordion :multiple="true" :activeIndex="activeIndex(modelValue.worker_kubeadm_extra_config)">
                <K3AccordionTab v-for="(config, index) in kubeadmConfigs" :key="index" :header="config.header">
                  <K3Textarea :id="setConfigId('worker', config.id)" v-model="modelValue.worker_kubeadm_extra_config[config.id]" rows="4" class="w-full" :autoResize="true" />
                </K3AccordionTab>
              </K3Accordion>
            </K3FormRow>
          </K3FormContainer>
        </K3FormColumn>
      </K3FormRow>
    </K3FormContainer>
  </div>
</template>

<script setup lang="ts">
import { K8sVersionMap, defaultKubernetesInfoValidation, kubernetesInfo, kubeadmConfigs } from "~/models";

const props = defineProps({
  modelValue: { type: Object, required: true },
});

const v$ = useAppHelper().UI.getValidate(defaultKubernetesInfoValidation, ref(props.modelValue as kubernetesInfo));

const setConfigId = (prefix, id) => {
  return `${prefix}_${id}`;
};

const activeIndex = (configs) => {
  const idx = [];
  Object.keys(configs).map((c, i) => {
    if (configs[c] !== "") idx.push(i);
  });
  return idx.length > 0 ? idx : [0];
};
</script>

<style scoped lang="scss"></style>
