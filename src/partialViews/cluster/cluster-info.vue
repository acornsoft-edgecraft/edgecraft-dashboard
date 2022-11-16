<template>
  <K3FormContainer class="no-bg">
    <template #header>Cluster 정보</template>
    <K3FormRow>
      <K3FormColumn label="Cluster 명" label-align="right">
        <K3FormInputField v-model="v$.name" field-name="name" class="w-full" />
      </K3FormColumn>
    </K3FormRow>
    <K3FormRow>
      <K3FormColumn label="Namespace" label-align="right">
        <K3FormInputField v-model="v$.namespace" field-name="namespace" class="w-full" />
      </K3FormColumn>
    </K3FormRow>
    <K3FormRow>
      <K3FormColumn label="Cluster 설명" label-align="right">
        <K3FormTextareaField v-model="v$.desc" rows="4" :auto-resize="true" class="w-full" />
      </K3FormColumn>
    </K3FormRow>
  </K3FormContainer>
</template>

<script setup lang="ts">
import { defaultClusterInfoValidation } from "~/models/cluster";

const { UI } = useAppHelper();
const props = defineProps({
  modelValue: { type: Object, required: true },
});

const v$ = UI.getValidate(defaultClusterInfoValidation, props.modelValue);
</script>

<style scoped lang="scss"></style>
