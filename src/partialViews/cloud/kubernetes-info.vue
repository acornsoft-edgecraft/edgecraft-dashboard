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
          <K3FormInputField v-model="v$.pod_cidr" field-name="POD CIDR" class="w-6" />
        </K3FormColumn>
      </K3FormRow>
      <K3FormRow>
        <K3FormColumn label="Service CIDR" label-align="right">
          <K3FormInputField v-model="v$.svc_cidr" field-name="Service CIDR" class="w-6" />
        </K3FormColumn>
      </K3FormRow>
    </K3FormContainer>
  </div>
</template>

<script setup lang="ts">
import { K8sVersionMap, defaultKubernetesInfoValidation, kubernetesInfo } from "~/models";

const props = defineProps({
  modelValue: { type: Object, required: true },
});

const v$ = useAppHelper().UI.getValidate(defaultKubernetesInfoValidation, ref(props.modelValue as kubernetesInfo));

onMounted(() => {});
</script>

<style scoped lang="scss"></style>
